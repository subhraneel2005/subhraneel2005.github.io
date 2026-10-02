import{u as a,j as e}from"./index-DHBkuSGH.js";function o(t){const n={blockquote:"blockquote",em:"em",h1:"h1",h2:"h2",h3:"h3",hr:"hr",li:"li",p:"p",strong:"strong",ul:"ul",...a(),...t.components},{Image:s,Link:i}=n;return s||r("Image"),i||r("Link"),e.jsxs(e.Fragment,{children:[e.jsx(n.h1,{children:`I broke down OpenAI's new "Dots"`}),`
`,e.jsxs(n.p,{children:["OpenAI just dropped ",e.jsx(n.strong,{children:"Dots"}),", and honestly, I think the interesting part isn't any one feature."]}),`
`,e.jsx(n.p,{children:"It's the way they stitched a bunch of things we've already seen in AI agents into one persistent system."}),`
`,e.jsx(n.p,{children:"I went through the official Dots announcement and the launch video, and tried to break down what actually sits underneath it."}),`
`,e.jsx(n.p,{children:"Here's how I see it."}),`
`,e.jsx(n.h2,{children:"1. the main thing: it's always there"}),`
`,e.jsx(n.p,{children:"A normal AI is basically:"}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"you ask → AI responds → done"})}),`
`,e.jsx(n.p,{children:"Dots is trying to change that into:"}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"you give it a goal → it works → keeps working → comes back when there's something useful"})}),`
`,e.jsx(n.p,{children:"OpenAI describes Dots as always-on agents that can work toward your goals 24/7 and handle multiple projects at the same time."}),`
`,e.jsx(n.p,{children:"That's a pretty big shift."}),`
`,e.jsx(n.p,{children:"You're not just chatting with an AI anymore."}),`
`,e.jsx(n.p,{children:"You're basically giving it a job."}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h2,{children:"2. it gets its own computer"}),`
`,e.jsx(n.p,{children:"This is probably one of the coolest parts."}),`
`,e.jsxs(n.p,{children:["Every Dot gets its ",e.jsx(n.strong,{children:"own cloud computer and browser"}),"."]}),`
`,e.jsxs(n.p,{children:["So instead of the model just telling you ",e.jsx(n.em,{children:"what"})," to do, the agent actually has an environment where it can do the work."]}),`
`,e.jsx(n.p,{children:"It can use its browser, connected apps, files, etc."}),`
`,e.jsx(n.p,{children:"And you can apparently open up its computer and actually see what it's doing."}),`
`,e.jsx(n.p,{children:"So the architecture starts looking more like:"}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"AI model + computer + tools"})}),`
`,e.jsx(n.p,{children:"instead of just:"}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"AI model + chat box"})}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h2,{children:"3. it remembers how you work"}),`
`,e.jsx(n.p,{children:"This is another huge part."}),`
`,e.jsx(n.p,{children:"Dots aren't supposed to forget everything after every task."}),`
`,e.jsx(n.p,{children:'OpenAI says they learn your goals, preferences, standards and what "good" looks like to you through your interactions and feedback.'}),`
`,e.jsx(n.p,{children:"So over time, ideally:"}),`
`,e.jsxs(n.p,{children:[`you give it feedback
↓
it learns your preferences
↓
next task needs less explanation
↓
eventually it starts doing things more like `,e.jsx(n.em,{children:"you"})]}),`
`,e.jsx(n.p,{children:"That's where this starts becoming genuinely interesting for things like coding, research, writing, content creation, etc."}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h2,{children:"4. you can literally talk to it"}),`
`,e.jsx(n.p,{children:"Dots aren't limited to a chat window."}),`
`,e.jsxs(n.p,{children:["You can interact with them through ChatGPT, Slack and Teams, and OpenAI also lets you ",e.jsx(n.strong,{children:"voice call your Dot"}),"."]}),`
`,e.jsx(n.p,{children:"So voice becomes another interface into the same agent."}),`
`,e.jsx(n.p,{children:"Something like:"}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"voice → STT → agent → tools → work → response → TTS"})}),`
`,e.jsx(n.p,{children:"Which makes the whole thing feel much more like having an assistant you can just talk to."}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h2,{children:"5. then you give it access to your apps"}),`
`,e.jsx(n.p,{children:"This is where the agent becomes actually useful."}),`
`,e.jsxs(n.p,{children:["OpenAI says Dots can connect to ",e.jsx(n.strong,{children:"4,000+ apps"})," through its plugin ecosystem."]}),`
`,e.jsx(n.p,{children:"So instead of the model existing in isolation, it gets access to the software you already use."}),`
`,e.jsx(n.p,{children:"Think:"}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"reasoning → tools → apps → actions"})}),`
`,e.jsxs(n.p,{children:["That's basically the difference between an AI that can ",e.jsx(n.em,{children:"talk about doing something"})," and an AI that can potentially ",e.jsx(n.em,{children:"actually do it"}),"."]}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h2,{children:"6. the browser is basically another tool"}),`
`,e.jsx(n.p,{children:"Because the Dot has its own cloud computer and browser, browser automation becomes part of the system too."}),`
`,e.jsx(n.p,{children:"And this is one of the things I find really interesting."}),`
`,e.jsx(n.p,{children:"Imagine telling your agent:"}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsx(n.p,{children:'"go through these websites, collect the information, compare everything, and prepare the result."'}),`
`]}),`
`,e.jsx(n.p,{children:"Instead of giving you instructions, the goal is for the agent to actually go and do it."}),`
`,e.jsx(n.p,{children:"That's the direction a lot of agent systems are heading toward."}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h2,{children:"7. and it doesn't really care where you talk to it"}),`
`,e.jsx(n.p,{children:"This part is easy to miss."}),`
`,e.jsx(n.p,{children:"You can start something in ChatGPT, continue through Slack, talk to it through voice, etc."}),`
`,e.jsx(n.p,{children:"The Dot is supposed to carry the context across those interfaces."}),`
`,e.jsxs(n.p,{children:["So the ",e.jsx(n.strong,{children:"Dot is the actual persistent entity"}),"."]}),`
`,e.jsx(n.p,{children:"ChatGPT / Slack / Teams / voice are basically interfaces into it."}),`
`,e.jsx(n.p,{children:"And that's a pretty interesting mental model."}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h1,{children:"so what is a Dot actually made of?"}),`
`,e.jsx(n.p,{children:"My simplified breakdown would be:"}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"persistent agent"})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.strong,{children:"memory"})}),`
`,e.jsx(n.li,{children:e.jsx(n.strong,{children:"cloud computer"})}),`
`,e.jsx(n.li,{children:e.jsx(n.strong,{children:"browser"})}),`
`,e.jsx(n.li,{children:e.jsx(n.strong,{children:"connected apps"})}),`
`,e.jsx(n.li,{children:e.jsx(n.strong,{children:"voice"})}),`
`,e.jsx(n.li,{children:e.jsx(n.strong,{children:"background execution"})}),`
`,e.jsx(n.li,{children:e.jsx(n.strong,{children:"permissions / approvals"})}),`
`]}),`
`,e.jsxs(n.p,{children:["Put all of those together and you get something that's much closer to a ",e.jsx(n.strong,{children:"persistent digital worker"})," than a chatbot."]}),`
`,e.jsx(n.p,{children:"And OpenAI is already talking about going further with specialist Dots for organizations, where different agents can have their own identity, credentials, tools and responsibilities."}),`
`,e.jsx(n.p,{children:"So the progression could basically be:"}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"one AI assistant"})}),`
`,e.jsxs(n.p,{children:["→ ",e.jsx(n.strong,{children:"one persistent agent"})]}),`
`,e.jsxs(n.p,{children:["→ ",e.jsx(n.strong,{children:"multiple specialized agents"})]}),`
`,e.jsxs(n.p,{children:["→ ",e.jsx(n.strong,{children:"a whole team of agents"})]}),`
`,e.jsx(n.p,{children:"That's the part of Dots I find the most interesting."}),`
`,e.jsxs(n.p,{children:["Not because any individual component is completely new, but because ",e.jsx(n.strong,{children:"the pieces are finally being packaged into one persistent system."})]}),`
`,e.jsx(n.hr,{}),`
`,e.jsx(n.h3,{children:"architecture"}),`
`,e.jsx(s,{src:"/dots-arch.png",alt:"Simplified architecture breakdown of an OpenAI Dot"}),`
`,e.jsx(n.p,{children:e.jsx(n.em,{children:"Architecture above is my simplified breakdown based on OpenAI's public Dots announcement, not an official OpenAI architecture diagram."})}),`
`,e.jsxs(n.p,{children:["Source: ",e.jsx(i,{href:"https://openai.com/index/introducing-dots/?utm_source=chatgpt.com",children:"OpenAI — Introducing dots"})]})]})}function c(t={}){const{wrapper:n}={...a(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(o,{...t})}):o(t)}function r(t,n){throw new Error("Expected component `"+t+"` to be defined: you likely forgot to import, pass, or provide it.")}export{c as default};
