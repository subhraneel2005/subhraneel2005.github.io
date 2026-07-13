import{u as i,j as e}from"./index-D5uLirfU.js";function s(t){const n={a:"a",h1:"h1",h2:"h2",li:"li",p:"p",ul:"ul",...i(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.h1,{children:"What i learned about ai memory after reading about llm wiki, hermes, and mem0"}),`
`,e.jsx(n.p,{children:"today i spent some time reading about ai memory systems."}),`
`,e.jsx(n.p,{children:"i started with karpathy's llm wiki idea, then looked into hermes agent, and later read a couple of posts from mem0 about how different agent frameworks handle memory."}),`
`,e.jsx(n.p,{children:"i wasn't researching this for work or building a memory product."}),`
`,e.jsx(n.p,{children:"i was mostly curious about a simple question:"}),`
`,e.jsx(n.p,{children:"what happens when ai systems stop forgetting everything between sessions?"}),`
`,e.jsx(n.p,{children:"a lot of early llm applications were essentially stateless."}),`
`,e.jsx(n.p,{children:"you ask a question, get a response, and move on."}),`
`,e.jsx(n.p,{children:"unless you manually stuffed previous context back into the prompt, the model would start fresh every time."}),`
`,e.jsx(n.p,{children:"but the more i read, the more it felt like people are moving toward a different idea:"}),`
`,e.jsx(n.p,{children:"instead of treating ai as a tool you use once, treat it as something that accumulates knowledge over time."}),`
`,e.jsx(n.h2,{children:"the llm wiki idea"}),`
`,e.jsx(n.p,{children:"the most interesting idea i found was the llm wiki pattern."}),`
`,e.jsx(n.p,{children:"instead of storing information as chunks in a vector database and retrieving them when needed, the model maintains an actual wiki."}),`
`,e.jsx(n.p,{children:"the setup is surprisingly simple:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"raw documents stay untouched"}),`
`,e.jsx(n.li,{children:"the ai maintains markdown pages"}),`
`,e.jsx(n.li,{children:"a schema file defines how everything should be organized"}),`
`]}),`
`,e.jsx(n.p,{children:"what i like about this approach is that it feels closer to software engineering than traditional rag."}),`
`,e.jsx(n.p,{children:"the model isn't just retrieving information."}),`
`,e.jsx(n.p,{children:"it's organizing it, connecting it, and maintaining it."}),`
`,e.jsx(n.p,{children:"the more documents you add, the more valuable the wiki becomes."}),`
`,e.jsx(n.h2,{children:"hermes and procedural memory"}),`
`,e.jsx(n.p,{children:"while llm wiki focuses on knowledge, hermes focuses more on learning from experience."}),`
`,e.jsx(n.p,{children:"the thing that stood out to me was its layered memory system."}),`
`,e.jsx(n.p,{children:"it has short-term memory for the current session."}),`
`,e.jsx(n.p,{children:"it stores procedural knowledge as reusable skills."}),`
`,e.jsx(n.p,{children:"and it can search through previous conversations when it needs historical context."}),`
`,e.jsx(n.p,{children:"the skill generation part was especially interesting."}),`
`,e.jsx(n.p,{children:"instead of only storing facts, the agent can store processes."}),`
`,e.jsx(n.p,{children:"that feels closer to how humans learn."}),`
`,e.jsx(n.p,{children:"when we gain experience, we don't just remember information."}),`
`,e.jsx(n.p,{children:"we remember how to do things."}),`
`,e.jsx(n.h2,{children:"github copilot's approach"}),`
`,e.jsx(n.p,{children:"i also came across some information about github copilot's memory system."}),`
`,e.jsx(n.p,{children:"what stood out was that memories aren't stored as random notes."}),`
`,e.jsx(n.p,{children:"they're tied to actual code."}),`
`,e.jsx(n.p,{children:"a memory contains:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"what the fact is"}),`
`,e.jsx(n.li,{children:"where it came from"}),`
`,e.jsx(n.li,{children:"why it matters"}),`
`]}),`
`,e.jsx(n.p,{children:"before using a memory, copilot can re-check the referenced code and verify whether the memory is still valid."}),`
`,e.jsx(n.p,{children:"i thought this was clever because memory is only useful if it stays accurate."}),`
`,e.jsx(n.p,{children:"otherwise it becomes a source of bugs."}),`
`,e.jsx(n.h2,{children:"the memory problem nobody talks about"}),`
`,e.jsx(n.p,{children:"one thing i kept noticing is that every system seems to have its own memory."}),`
`,e.jsx(n.p,{children:"claude has its own approach."}),`
`,e.jsx(n.p,{children:"codex has its own."}),`
`,e.jsx(n.p,{children:"hermes has its own."}),`
`,e.jsx(n.p,{children:"openclaw has its own."}),`
`,e.jsx(n.p,{children:"the problem is that these memories often stay trapped inside the tool where they were created."}),`
`,e.jsx(n.p,{children:"if an agent learns something useful in one environment, that knowledge doesn't automatically follow you somewhere else."}),`
`,e.jsx(n.p,{children:"that's why projects like mem0 caught my attention."}),`
`,e.jsx(n.p,{children:"they're trying to make memory more portable instead of tying it to a single application."}),`
`,e.jsx(n.h2,{children:"my takeaway"}),`
`,e.jsx(n.p,{children:"after reading all of this, i don't think the interesting question is whether ai models will become smarter."}),`
`,e.jsx(n.p,{children:"the interesting question is how they will remember."}),`
`,e.jsx(n.p,{children:"a lot of the progress now seems less about bigger models and more about better systems around those models."}),`
`,e.jsx(n.p,{children:"memory."}),`
`,e.jsx(n.p,{children:"retrieval."}),`
`,e.jsx(n.p,{children:"knowledge organization."}),`
`,e.jsx(n.p,{children:"learning from previous interactions."}),`
`,e.jsx(n.p,{children:"all of these things seem increasingly important."}),`
`,e.jsx(n.p,{children:"i'm still exploring this area, but one thing became clear to me:"}),`
`,e.jsx(n.p,{children:"the future probably isn't just better models."}),`
`,e.jsx(n.p,{children:"it's models that can build on what they learned yesterday."}),`
`,e.jsx(n.h2,{children:"references"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f",children:"llm wiki pattern (andrej karpathy)"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://github.com/NousResearch/hermes-agent",children:"hermes agent"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://x.com/mem0ai/status/2064383137338233179",children:"memory architecture of github copilot (mem0 analysis)"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://x.com/mem0ai/status/2061822612398014782",children:"state of memory harnesses (mem0 analysis)"})}),`
`]}),`
`,e.jsx(n.p,{children:"these were the main resources i read while trying to understand how different ai systems approach long-term memory, knowledge organization, and learning from previous interactions."})]})}function o(t={}){const{wrapper:n}={...i(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(s,{...t})}):s(t)}export{o as default};
