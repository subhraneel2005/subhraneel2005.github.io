# Claims RAG

Claims Intelligence service for HealthOS. Two tracks live in one service:

- **Track A — Validator**: deterministic rule engine + claim requirements knowledge base
  that produces a readiness score / violations / missing-documents report before claim
  submission.
- **Track B — RAG Interpreter**: document ingestion + hybrid retrieval feeding Naman's AI
  gateway for denial interpretation and evidence-cited reasoning.

## Development

```bash
uv sync
uv run uvicorn app.main:app --reload
```

## Cross-service integration (plan P0–P4, complete)

`docs/integration-plan.md` connects HealthOS' four services through this one
as the integration facade. `scripts/run-all.sh` (repo root) starts all four;
`scripts/demo_integrated_flow.py` runs the full end-to-end demo.

| Service | Port | Role |
| --- | --- | --- |
| ai-gateway | 8000 | shared AI hub — embeddings + process (mock/litellm/openrouter) |
| claims-rag | 8100 | this service - validator + RAG interpreter + adapters |
| document-intelligence | 8200 | upload → OCR → structured extraction + evidence |
| claim-risk | 8300 | pre-submission risk scoring |

Integration surface added here:

- **DI ingestion (P2)** — `app/ingest/di_source.py` fetches a processed
  document from document-intelligence by id and adapts it to a
  `SourceDocument`; `app/ingest/load.py` gained a callable pipeline plus the
  `--from-di --di-document-id <id>` CLI flag.
- **claim-risk client (P3)** — `app/services/risk_client.py` forwards the
  32-field feature snapshot to claim-risk; `app/services/risk_mapping.py`
  builds the snapshot from a Track A `Claim` (explicit approximation, see its
  docstring); exposed as `POST /rag/risk-assessment` →
  `{claim_id, readiness, risk}`.
- **Demo (P4)** — `scripts/demo_integrated_flow.py` exercises process →
  ingest → interpret → validate → claim-risk in one pass.

### Quick start

```bash
scripts/run-all.sh start                       # 4 services on 8000/8100/8200/8300
services/claims-rag/.venv/bin/python scripts/demo_integrated_flow.py
scripts/run-all.sh stop
```

Ingest a document-intelligence document ad hoc:

```bash
cd services/claims-rag
.venv/bin/python -m app.ingest.load --from-di --di-document-id <id> --verify
```

### Live smoke (recorded 2026-09-19, stack up)

| Step | Input | Output |
| --- | --- | --- |
| DI `POST /documents/process` | `scripts/samples/insurance_policy_bcbs.txt`, tenant_demo | `document_id 5652dd69…`, `insurance_policy`, conf 0.9091 |
| ingest `--from-di` | document 5652dd69… | `kb di-5652dd69…`, 12 chunks / 293 tokens, payer `blue_cross_blue_shield` |
| `POST /rag/interpret` | prior-auth question, payer bcbs | finding `01M2WCKD42X8FB2JZYKCHJP6TJ`, status `human_review`, 5 citations |
| `POST /validate` | claim clm-demo-integrated-001 (bcbs/professional) | readiness 90.5 (19/21); violations: prior authorization, bundling |
| claim-risk `POST /v1/claim-risk/assess` | snapshot built by `risk_mapping` | score 0, band LOW, model `deterministic-v1` |
| `POST /rag/risk-assessment` | claim …002 (missing docs) | readiness 71.43 (15/21) + risk 0 LOW |

OpenAPI paths touched: DI `GET /documents/{document_id}`;
claims-rag `POST /rag/interpret`, `GET /rag/search`, `POST /rag/risk-assessment`,
`POST /validate`, ingest CLI; gateway `POST /ai/process`, `POST /ai/embed`;
claim-risk `POST /v1/claim-risk/assess`.

### Known integration caveats

- **Mock gateway degrades findings**: with the gateway's MockProvider, every
  rag-interpretation fails claims-rag's response schema → status
  `human_review`, `model`/`prompt_version` NULL. Auto-approval needs a
  task-aware mock response or real API keys (tracker item 47).
- **claim-risk scores 0/LOW today**: its concrete rules contribute
  `score_contribution = 0` (no approved weights) and its triggable signals
  need policy/process data our approximation intentionally leaves None/equal —
  wiring verified; scoring awaits claim-risk's own weight approval.
- **claim-rag ↔ gateway embedding spaces differ in mock mode** (blake2b vs
  sha256 keyword hashing) — retrieval still works on keyword fusion; real
  models converge the vector spaces automatically.
