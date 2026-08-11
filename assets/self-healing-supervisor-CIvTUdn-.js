import{u as l,j as e}from"./index-CbEGGcyz.js";function i(n){const s={blockquote:"blockquote",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",img:"img",li:"li",p:"p",pre:"pre",span:"span",strong:"strong",ul:"ul",...l(),...n.components},{Image:t,Link:r}=s;return t||a("Image"),r||a("Link"),e.jsxs(e.Fragment,{children:[e.jsx(s.h1,{children:"Building a Self-Healing Supervisor in Node.js"}),`
`,e.jsxs(s.p,{children:["Recently, while reading the Reliability chapter from ",e.jsx(s.em,{children:"Designing Data-Intensive Applications"})," (DDIA) by Martin Kleppmann, I built a small experiment to better understand one of the core ideas of reliable systems:"]}),`
`,e.jsxs(s.blockquote,{children:[`
`,e.jsx(s.p,{children:"Failures are inevitable. Systems should be designed to detect them and recover automatically."}),`
`]}),`
`,e.jsxs(s.p,{children:["This experiment is a simple ",e.jsx(s.strong,{children:"self-healing supervisor"}),"."]}),`
`,e.jsx(s.p,{children:e.jsx(s.img,{src:"https://dev-to-uploads.s3.us-east-2.amazonaws.com/uploads/articles/s5uhk9ydy46d7inq0z12.png",alt:"Image description"})}),`
`,e.jsx(s.p,{children:"The idea is straightforward: a supervisor process monitors worker processes and automatically restarts them whenever they become unhealthy."}),`
`,e.jsx(s.p,{children:"In production systems, these workers could be microservices, containers, or background jobs. For this experiment, they're implemented as basic Node.js child processes."}),`
`,e.jsx(s.h2,{children:"How It Works"}),`
`,e.jsx(s.p,{children:"The supervisor is intentionally kept simple."}),`
`,e.jsx(s.p,{children:"It spawns a worker process and continuously monitors it. If the worker crashes or becomes unresponsive, the supervisor kills it and starts a new one."}),`
`,e.jsx(s.p,{children:"Rather than trying to prevent failures entirely, the system assumes they will happen and focuses on recovery."}),`
`,e.jsx(s.h2,{children:"Worker Types"}),`
`,e.jsx(s.p,{children:"To simulate different real-world failure scenarios, the worker randomly starts in one of three modes:"}),`
`,e.jsx(s.h3,{children:"Normal Worker"}),`
`,e.jsx(s.p,{children:"A healthy worker that:"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsx(s.li,{children:"Sends heartbeat messages every 3 seconds."}),`
`,e.jsx(s.li,{children:"Performs its task."}),`
`,e.jsx(s.li,{children:"Exits successfully after completion."}),`
`]}),`
`,e.jsx(s.h3,{children:"Hung Worker"}),`
`,e.jsx(s.p,{children:"A worker that appears healthy initially but later becomes unresponsive."}),`
`,e.jsx(s.p,{children:"It sends a few heartbeat messages and then stops sending them entirely by entering an infinite loop. Since no further heartbeats are received, the supervisor detects the worker as unhealthy, terminates it, and starts a replacement."}),`
`,e.jsx(s.h3,{children:"Crashed Worker"}),`
`,e.jsx(s.p,{children:"A worker that intentionally crashes itself."}),`
`,e.jsx(s.p,{children:"After sending a few heartbeats, it throws an error and exits with a non-zero exit code. The supervisor detects the failure and automatically restarts it."}),`
`,e.jsx(s.h2,{children:"Heartbeat-Based Liveness Detection"}),`
`,e.jsx(s.p,{children:"Workers periodically send JSON heartbeat messages:"}),`
`,e.jsx(s.pre,{className:"language-json",children:e.jsxs(s.code,{className:"language-json code-highlight",children:[e.jsxs(s.span,{className:"code-line",children:[e.jsx(s.span,{className:"token punctuation",children:"{"}),`
`]}),e.jsxs(s.span,{className:"code-line",children:["  ",e.jsx(s.span,{className:"token property",children:'"type"'}),e.jsx(s.span,{className:"token operator",children:":"})," ",e.jsx(s.span,{className:"token string",children:'"heartbeat"'}),e.jsx(s.span,{className:"token punctuation",children:","}),`
`]}),e.jsxs(s.span,{className:"code-line",children:["  ",e.jsx(s.span,{className:"token property",children:'"timestamp"'}),e.jsx(s.span,{className:"token operator",children:":"})," ",e.jsx(s.span,{className:"token number",children:"123456789"}),`
`]}),e.jsxs(s.span,{className:"code-line",children:[e.jsx(s.span,{className:"token punctuation",children:"}"}),`
`]})]})}),`
`,e.jsx(s.p,{children:"The supervisor tracks these heartbeats to determine whether a worker is alive."}),`
`,e.jsx(s.p,{children:"If no heartbeat is received for 10 seconds, the worker is considered unhealthy and is terminated. This mechanism allows the supervisor to detect not only crashes but also hung processes that are still running but no longer making progress."}),`
`,e.jsx(s.p,{children:e.jsx(s.img,{src:"https://dev-to-uploads.s3.us-east-2.amazonaws.com/uploads/articles/x0y0ou6l9pqc5ez5cz0g.png",alt:"Image description"})}),`
`,e.jsx(s.h2,{children:"Retry and Recovery"}),`
`,e.jsx(s.p,{children:"The supervisor includes a simple retry mechanism:"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsx(s.li,{children:"Waits 1 second before restarting a failed worker."}),`
`,e.jsx(s.li,{children:"Limits recovery attempts to 10 consecutive failures."}),`
`,e.jsx(s.li,{children:"Resets the retry counter whenever a worker exits successfully."}),`
`]}),`
`,e.jsx(s.p,{children:"This prevents endless restart loops while still allowing recovery from transient failures."}),`
`,e.jsx(s.p,{children:e.jsx(s.img,{src:"https://dev-to-uploads.s3.us-east-2.amazonaws.com/uploads/articles/kyei21d48zaiious1l97.png",alt:"Image description"})}),`
`,e.jsx(s.h2,{children:"What I Learned"}),`
`,e.jsx(s.p,{children:"This experiment reinforced a key reliability principle from DDIA:"}),`
`,e.jsx(s.p,{children:"A system does not need to eliminate every failure. Instead, it should be able to detect failures quickly and recover automatically."}),`
`,e.jsx(s.p,{children:"It also provided a practical understanding of:"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsx(s.li,{children:"OS processes and parent-child relationships"}),`
`,e.jsx(s.li,{children:"Process supervision"}),`
`,e.jsx(s.li,{children:"Heartbeat-based liveness detection"}),`
`,e.jsx(s.li,{children:"Failure recovery strategies"}),`
`,e.jsx(s.li,{children:"Restart limits and backoff mechanisms"}),`
`]}),`
`,e.jsx(s.p,{children:'The supervisor itself is intentionally "dumb". It only monitors health and restarts workers when necessary. Interestingly, that simplicity is often a strength. A small, predictable supervisor can be more reliable than a complex one.'}),`
`,e.jsx(s.p,{children:"Thanks for reading :)"}),`
`,e.jsxs(s.p,{children:["Github Repo: ",e.jsx(r,{href:"https://github.com/subhraneel2005/ddia-lab",target:"_blank",alt:"ddia-lab repository",children:"subhraneel2005/ddia-lab"})]}),`
`,e.jsx(r,{href:"https://github.com/subhraneel2005/ddia-lab",target:"_blank",alt:"ddia-lab repository",children:e.jsx(t,{src:"https://socialify.git.ci/subhraneel2005/ddia-lab/image",alt:"ddia-lab repo social preview"})})]})}function c(n={}){const{wrapper:s}={...l(),...n.components};return s?e.jsx(s,{...n,children:e.jsx(i,{...n})}):i(n)}function a(n,s){throw new Error("Expected component `"+n+"` to be defined: you likely forgot to import, pass, or provide it.")}export{c as default};
