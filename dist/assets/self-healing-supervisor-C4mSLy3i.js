import{u as l,j as e}from"./index-BSHDWfp_.js";function t(n){const s={blockquote:"blockquote",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",img:"img",li:"li",p:"p",pre:"pre",span:"span",strong:"strong",ul:"ul",...l(),...n.components},{Image:i,Link:r}=s;return i||a("Image"),r||a("Link"),e.jsxs(e.Fragment,{children:[e.jsx(s.h1,{children:"building a self-healing supervisor in node.js"}),`
`,e.jsxs(s.p,{children:["recently, while reading the reliability chapter from ",e.jsx(s.em,{children:"designing data-intensive applications"})," (ddia) by martin kleppmann, i built a small experiment to better understand one of the core ideas of reliable systems:"]}),`
`,e.jsxs(s.blockquote,{children:[`
`,e.jsx(s.p,{children:"failures are inevitable. systems should be designed to detect them and recover automatically."}),`
`]}),`
`,e.jsxs(s.p,{children:["this experiment is a simple ",e.jsx(s.strong,{children:"self-healing supervisor"}),"."]}),`
`,e.jsx(s.p,{children:e.jsx(s.img,{src:"https://dev-to-uploads.s3.us-east-2.amazonaws.com/uploads/articles/s5uhk9ydy46d7inq0z12.png",alt:"image description"})}),`
`,e.jsx(s.p,{children:"the idea is straightforward: a supervisor process monitors worker processes and automatically restarts them whenever they become unhealthy."}),`
`,e.jsx(s.p,{children:"in production systems, these workers could be microservices, containers, or background jobs. for this experiment, they're implemented as basic node.js child processes."}),`
`,e.jsx(s.h2,{children:"how it works"}),`
`,e.jsx(s.p,{children:"the supervisor is intentionally kept simple."}),`
`,e.jsx(s.p,{children:"it spawns a worker process and continuously monitors it. if the worker crashes or becomes unresponsive, the supervisor kills it and starts a new one."}),`
`,e.jsx(s.p,{children:"rather than trying to prevent failures entirely, the system assumes they will happen and focuses on recovery."}),`
`,e.jsx(s.h2,{children:"worker types"}),`
`,e.jsx(s.p,{children:"to simulate different real-world failure scenarios, the worker randomly starts in one of three modes:"}),`
`,e.jsx(s.h3,{children:"normal worker"}),`
`,e.jsx(s.p,{children:"a healthy worker that:"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsx(s.li,{children:"sends heartbeat messages every 3 seconds."}),`
`,e.jsx(s.li,{children:"performs its task."}),`
`,e.jsx(s.li,{children:"exits successfully after completion."}),`
`]}),`
`,e.jsx(s.h3,{children:"hung worker"}),`
`,e.jsx(s.p,{children:"a worker that appears healthy initially but later becomes unresponsive."}),`
`,e.jsx(s.p,{children:"it sends a few heartbeat messages and then stops sending them entirely by entering an infinite loop. since no further heartbeats are received, the supervisor detects the worker as unhealthy, terminates it, and starts a replacement."}),`
`,e.jsx(s.h3,{children:"crashed worker"}),`
`,e.jsx(s.p,{children:"a worker that intentionally crashes itself."}),`
`,e.jsx(s.p,{children:"after sending a few heartbeats, it throws an error and exits with a non-zero exit code. the supervisor detects the failure and automatically restarts it."}),`
`,e.jsx(s.h2,{children:"heartbeat-based liveness detection"}),`
`,e.jsx(s.p,{children:"workers periodically send json heartbeat messages:"}),`
`,e.jsx(s.pre,{className:"language-json",children:e.jsxs(s.code,{className:"language-json code-highlight",children:[e.jsxs(s.span,{className:"code-line",children:[e.jsx(s.span,{className:"token punctuation",children:"{"}),`
`]}),e.jsxs(s.span,{className:"code-line",children:["  ",e.jsx(s.span,{className:"token property",children:'"type"'}),e.jsx(s.span,{className:"token operator",children:":"})," ",e.jsx(s.span,{className:"token string",children:'"heartbeat"'}),e.jsx(s.span,{className:"token punctuation",children:","}),`
`]}),e.jsxs(s.span,{className:"code-line",children:["  ",e.jsx(s.span,{className:"token property",children:'"timestamp"'}),e.jsx(s.span,{className:"token operator",children:":"})," ",e.jsx(s.span,{className:"token number",children:"123456789"}),`
`]}),e.jsxs(s.span,{className:"code-line",children:[e.jsx(s.span,{className:"token punctuation",children:"}"}),`
`]})]})}),`
`,e.jsx(s.p,{children:"the supervisor tracks these heartbeats to determine whether a worker is alive."}),`
`,e.jsx(s.p,{children:"if no heartbeat is received for 10 seconds, the worker is considered unhealthy and is terminated. this mechanism allows the supervisor to detect not only crashes but also hung processes that are still running but no longer making progress."}),`
`,e.jsx(s.p,{children:e.jsx(s.img,{src:"https://dev-to-uploads.s3.us-east-2.amazonaws.com/uploads/articles/x0y0ou6l9pqc5ez5cz0g.png",alt:"image description"})}),`
`,e.jsx(s.h2,{children:"retry and recovery"}),`
`,e.jsx(s.p,{children:"the supervisor includes a simple retry mechanism:"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsx(s.li,{children:"waits 1 second before restarting a failed worker."}),`
`,e.jsx(s.li,{children:"limits recovery attempts to 10 consecutive failures."}),`
`,e.jsx(s.li,{children:"resets the retry counter whenever a worker exits successfully."}),`
`]}),`
`,e.jsx(s.p,{children:"this prevents endless restart loops while still allowing recovery from transient failures."}),`
`,e.jsx(s.p,{children:e.jsx(s.img,{src:"https://dev-to-uploads.s3.us-east-2.amazonaws.com/uploads/articles/kyei21d48zaiious1l97.png",alt:"image description"})}),`
`,e.jsx(s.h2,{children:"what i learned"}),`
`,e.jsx(s.p,{children:"this experiment reinforced a key reliability principle from ddia:"}),`
`,e.jsx(s.p,{children:"a system does not need to eliminate every failure. instead, it should be able to detect failures quickly and recover automatically."}),`
`,e.jsx(s.p,{children:"it also provided a practical understanding of:"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsx(s.li,{children:"os processes and parent-child relationships"}),`
`,e.jsx(s.li,{children:"process supervision"}),`
`,e.jsx(s.li,{children:"heartbeat-based liveness detection"}),`
`,e.jsx(s.li,{children:"failure recovery strategies"}),`
`,e.jsx(s.li,{children:"restart limits and backoff mechanisms"}),`
`]}),`
`,e.jsx(s.p,{children:'the supervisor itself is intentionally "dumb". it only monitors health and restarts workers when necessary. interestingly, that simplicity is often a strength. a small, predictable supervisor can be more reliable than a complex one.'}),`
`,e.jsx(s.p,{children:"thanks for reading :)"}),`
`,e.jsxs(s.p,{children:["github repo: ",e.jsx(r,{href:"https://github.com/subhraneel2005/ddia-lab",target:"_blank",alt:"ddia-lab repository",children:"subhraneel2005/ddia-lab"})]}),`
`,e.jsx(r,{href:"https://github.com/subhraneel2005/ddia-lab",target:"_blank",alt:"ddia-lab repository",children:e.jsx(i,{src:"https://socialify.git.ci/subhraneel2005/ddia-lab/image",alt:"ddia-lab repo social preview"})})]})}function c(n={}){const{wrapper:s}={...l(),...n.components};return s?e.jsx(s,{...n,children:e.jsx(t,{...n})}):t(n)}function a(n,s){throw new Error("Expected component `"+n+"` to be defined: you likely forgot to import, pass, or provide it.")}export{c as default};
