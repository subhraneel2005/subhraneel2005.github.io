import{u as o,j as e}from"./index-Cqsefc6m.js";function s(n){const t={a:"a",code:"code",h2:"h2",hr:"hr",img:"img",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...o(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(t.p,{children:"A few months ago I went down a rabbit hole: reading OpenCode's GitHub repo, studying screenshots of Claude Code's behavior, reverse engineering the flows. I wanted to understand how these terminal coding agents actually work under the hood, not just use them, but build one. This post is about what I built, the real technical challenges I hit, and what I'm planning next."}),`
`,e.jsx(t.hr,{}),`
`,e.jsx(t.h2,{children:"What I Built"}),`
`,e.jsx(t.p,{children:"A CLI-based AI coding agent. You open your terminal, run it inside a project, describe a task, and the agent autonomously reads files, edits them, runs commands, searches the web, and commits to Git. This happens all while asking for your approval before changing any of your code."}),`
`,e.jsx(t.p,{children:"I started it as a simple sidequest, to read and implement things side by side. It's built in TypeScript, runs on Bun, uses Vercel's AI SDK (Agents, Tools and Loop Control), and uses Google Gemini 2.5 Flash as the model (because it has a free tier, lol), and the terminal UI is built with Ink, I used it because it is very similar to writing frontends in React."}),`
`,e.jsx(t.p,{children:"Here's a rough breakdown of what the coding agent can do:"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"filesystem tools"}),": read, write, search, and edit files"]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"bash tools"}),": ",e.jsx(t.code,{children:"ls"}),", ",e.jsx(t.code,{children:"pwd"}),", ",e.jsx(t.code,{children:"grep"})]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"git tools"}),": commit, push, pull, create/manage PRs and issues via github cli"]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"command execution"}),": run ",e.jsx(t.code,{children:"npm"}),", ",e.jsx(t.code,{children:"pnpm"}),", ",e.jsx(t.code,{children:"python"}),", ",e.jsx(t.code,{children:"pip"}),", ",e.jsx(t.code,{children:"cargo"}),", etc."]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"web tools"}),": search the web with any query, fetch URLs"]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"a planner sub-agent"}),": breaks big tasks into smaller todos"]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"a memory system"}),": persists context across sessions in ",e.jsx(t.code,{children:".agent/"})," markdown files"]}),`
`]}),`
`,e.jsx(t.p,{children:"Everything is strictly typed end-to-end with Zod schemas, tools have typed inputs and outputs, which I'll get into below."}),`
`,e.jsx(t.hr,{}),`
`,e.jsx(t.h2,{children:"The Architecture"}),`
`,e.jsxs(t.p,{children:["The core is a ",e.jsx(t.strong,{children:"tool-calling agent loop"}),". The model receives your prompt, a list of available tools, and the conversation history. It decides which tool to call, the agent executes it, the result is fed back, and the loop continues until the task is done or the model stops requesting tools."]}),`
`,e.jsxs(t.p,{children:["I used Vercel's AI SDK to handle the streaming and loop control, and registered all my tools in a central ",e.jsx(t.code,{children:"tools-registry.ts"}),":"]}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-ts",children:`export const tools = {
  write_file: writeFileTool,
  read_file: readFileTool,
  search_files: searchFilesTool,
  edit_file: editFileTool,
  ls: lsTool,
  pwd: pwdTool,
  grep: grepTool,
  git_tool: gitTool,
  // planner sub-agent tools
  createTodoTool,
  createAllTodosTool,
  updateTodoStatusTool,
  getNextPendingTodoTool,
  checkIfAllTodosAreCompletedTool,
  // memory + web
  write_memory: writeMemoryTool,
  run_command: runCommandTool,
  web_search: webSearchTool,
  web_fetch: webfetchTool,
} satisfies ToolSet;
`})}),`
`,e.jsx(t.p,{children:"Every tool is defined with a Zod schema for its input and output. This gives the model a clear, typed contract for what each tool expects and returns, and it gives me safe failure handling throughout , if a tool call has malformed input, Zod can catch it before it touches the filesystem."}),`
`,e.jsx(t.hr,{}),`
`,e.jsx(t.h2,{children:"Challenge 1: The Edit File Tool and Human-in-the-Loop"}),`
`,e.jsx(t.p,{children:"This was the an interesting problem to solve."}),`
`,e.jsx(t.p,{children:"All other tools: reading files, running commands, searching can execute automatically without any user intervention. But file editing is destructive. If the agent makes a wrong edit, you want a chance to catch it before it's directly written to disk."}),`
`,e.jsx(t.p,{children:"The pattern I took inspiration (from studying Claude Code and OpenCode) is:"}),`
`,e.jsxs(t.ol,{children:[`
`,e.jsxs(t.li,{children:["agent calls ",e.jsx(t.code,{children:"read_file"})," first to read the current file content"]}),`
`,e.jsxs(t.li,{children:["agent calls ",e.jsx(t.code,{children:"edit_file"})," with the old string and the new string it wants to substitute (diff)"]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"before writing"}),", show the user a colored diff (red for removed lines, green for added lines)"]}),`
`,e.jsx(t.li,{children:"wait for the user to approve or reject"}),`
`]}),`
`,e.jsxs(t.p,{children:["The tricky part is step 4. The agent loop is running. I can't just ",e.jsx(t.code,{children:"await"})," a user keypress inside a tool execution without some way to pause the loop itself."]}),`
`,e.jsxs(t.p,{children:["The way I solved this: Vercel's AI SDK's ",e.jsx(t.code,{children:"streamText"})," (and ",e.jsx(t.code,{children:"generateText"}),") exposes a ",e.jsx(t.code,{children:"stopWhen"})," parameter on the loop control. I use this to pause the agent loop when the edit tool is waiting for approval. The TUI sets an ",e.jsx(t.code,{children:"isApproved"})," flag asynchronously, the user sees the diff rendered in the terminal via Ink components, presses a key to approve or reject, the flag flips, and the loop resumes or the edit is discarded."]}),`
`,e.jsxs(t.p,{children:["The ",e.jsx(t.code,{children:"isApproved"})," field is actually part of the edit tool's input schema:"]}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-ts",children:`export const EditFileInputSchema = z.object({
  filename: z.string(),
  folder: z.string().optional(),
  oldStr: z.string(),
  newStr: z.string(),
  isApproved: z.boolean().optional().describe("Needs approval before writing new changes"),
});
`})}),`
`,e.jsxs(t.p,{children:["And the output schema carries a ",e.jsx(t.code,{children:"needsApproval"})," flag back:"]}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-ts",children:`needsApproval: z.boolean().optional().describe(
  "Needs human approval to be true for the agent to write the changes in the file"
)
`})}),`
`,e.jsx(t.p,{children:e.jsx(t.img,{src:"https://dev-to-uploads.s3.amazonaws.com/uploads/articles/bs5xtvu7124y3h6ssrlx.png",alt:"Image description"})}),`
`,e.jsx(t.p,{children:"This creates a clear handshake: the tool signals it needs approval, the loop pauses, the human decides, the loop resumes. Everything else runs autonomously."}),`
`,e.jsxs(t.p,{children:["I also added ",e.jsx(t.strong,{children:"path traversal protection"}),", the agent cannot operate outside the project root directory. Every file path is validated against the root before any read or write happens."]}),`
`,e.jsx(t.hr,{}),`
`,e.jsx(t.h2,{children:"Challenge 2: The Planner Sub-Agent"}),`
`,e.jsx(t.p,{children:'For small, focused tasks, the main agent handles everything directly. But when a user gives a bigger, more open-ended task like "refactor this module", "add authentication to my nodejs backend", a single flat loop gets difficult to handle.'}),`
`,e.jsxs(t.p,{children:["My solution was a ",e.jsx(t.strong,{children:"planner sub-agent"}),". The main agent calls it as a tool when it detects a bigger task. The planner sub-agent has its own system prompt focused entirely on task decomposition. It breaks the task down into a list of structured todos, each with:"]}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsx(t.li,{children:"A unique ID"}),`
`,e.jsx(t.li,{children:"The task description"}),`
`,e.jsxs(t.li,{children:["A status (",e.jsx(t.code,{children:"not completed"}),", ",e.jsx(t.code,{children:"ongoing"}),", ",e.jsx(t.code,{children:"completed"}),")"]}),`
`,e.jsx(t.li,{children:"A priority (1–5)"}),`
`]}),`
`,e.jsx(t.p,{children:"These are typed with Zod too:"}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-ts",children:`export const SingleTodoSchema = z.object({
  id: z.string(),
  todo: z.string(),
  status: z.enum(["completed", "not completed", "ongoing"]).default("not completed"),
  priority: z.number().min(1).max(5).default(3),
});
`})}),`
`,e.jsxs(t.p,{children:["Once the planner creates the todos, the main agent picks them up one by one using ",e.jsx(t.code,{children:"getNextPendingTodoTool"}),", executes them using the available filesystem/git/web tools, and marks each one complete before moving to the next. The TUI renders a live todo list so you can watch the agent work through the task."]}),`
`,e.jsxs(t.p,{children:["Right now this is ",e.jsx(t.strong,{children:"synchronous"}),", so one task at a time. That's the current limitation that I'm planning to address next."]}),`
`,e.jsx(t.hr,{}),`
`,e.jsx(t.h2,{children:"What's Next: Parallel Sub-Agents"}),`
`,e.jsx(t.p,{children:"The natural evolution of the planner is running multiple smaller agents in parallel, each picking up one todo from the breakdown independently. But this introduces an obvious conflict problem: what if two agents try to edit the same file at the same time?"}),`
`,e.jsxs(t.p,{children:["My planned approach is to solve this at the ",e.jsx(t.strong,{children:"task metadata level"}),", not at the execution level. When the planner sub-agent breaks down a task, each todo will also carry metadata about which files it needs to touch:"]}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-ts",children:`// rough idea, not yet implemented
{
  id: "task-3",
  todo: "Add input validation to auth.ts",
  files: ["src/auth.ts", "src/validators.ts"], (not guessed, these will be grepped/searched using the tools)
  status: "not completed",
  priority: 2
}
`})}),`
`,e.jsx(t.p,{children:'When a smaller agent picks up a task, it only has access to the files assigned to it. The planner ensures no two tasks share the same file. This way, parallel agents work completely independently with well-defined boundaries, no conflict resolution at runtime, because the conflict is prevented structurally at planning time. And to maintain the bigger context the smaller agents will update the main agent about their current status (when it gets updated), e.g: "task1 failed", "task2 succeded", "task 3 in-progress".'}),`
`,e.jsx(t.hr,{}),`
`,e.jsx(t.h2,{children:"Why Gemini 2.5 Flash?"}),`
`,e.jsx(t.p,{children:"Cause it has a generous free tier. When you're building something from scratch and running dozens of test runs a day, it matters."}),`
`,e.jsxs(t.p,{children:["The plan is to make the ",e.jsx(t.strong,{children:"model configurable"}),", so the user will be able to select their ",e.jsx(t.strong,{children:"provider"})," and ",e.jsx(t.strong,{children:"model"})," and bring their own API key. The agent's tool-calling logic doesn't care which model is underneath as long as it supports function/tool calling."]}),`
`,e.jsx(t.hr,{}),`
`,e.jsx(t.h2,{children:"The TUI: Ink (React for Terminals)"}),`
`,e.jsx(t.p,{children:"The terminal UI is built with [Ink], which lets you write React components that render in the terminal. If you know React, there's almost no learning curve."}),`
`,e.jsx(t.p,{children:"I used it for:"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsx(t.li,{children:'rendering the diff display during file edits (the red/green approval screen) + used the "diff" npm package as well.'}),`
`,e.jsx(t.li,{children:"showing the live todo list as the planner sub-agent creates and the main agent completes tasks"}),`
`,e.jsx(t.li,{children:"the thinking/loading indicators while the model is streaming"}),`
`,e.jsx(t.li,{children:"the GitHub activity log component"}),`
`,e.jsx(t.li,{children:"the text input field for user prompts"}),`
`]}),`
`,e.jsx(t.p,{children:"Basically it gets the job done with a simple, clean UI."}),`
`,e.jsx(t.hr,{}),`
`,e.jsx(t.h2,{children:"Memory System"}),`
`,e.jsxs(t.p,{children:["One thing I wanted from the start was for the agent to remember things across sessions. And get more personalised based on the user. The memory system stores three types of information in a ",e.jsx(t.code,{children:".agent/"})," folder in your project root:"]}),`
`,e.jsxs(t.p,{children:[`| File | What it stores |
|------|---------------|
| `,e.jsx(t.code,{children:"USER.md"}),` | Your preferences and habits (e.g. "prefers pnpm") |
| `,e.jsx(t.code,{children:"PROJECT.md"}),` | Facts about the repo (e.g. "uses Next.js, tests in /tests") |
| `,e.jsx(t.code,{children:"AGENT.md"}),' | Lessons the agent learned (e.g. "avoid editing generated files") |']}),`
`,e.jsxs(t.p,{children:["The agent can call ",e.jsx(t.code,{children:"write_memory"})," tool at any point of time to store something. On the next session, these files are loaded into the system prompt so the agent already knows the context without you having to re-explain it."]}),`
`,e.jsx(t.hr,{}),`
`,e.jsx(t.h2,{children:"What I'd Do Differently"}),`
`,e.jsx(t.p,{children:"A few things I'd approach differently if I started over:"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"start with the edit tool's approval flow first."})," It touches the most parts of the system (tool schema, loop control, TUI state, async coordination) and sets the pattern for everything else."]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"design the todo schema with file metadata from the beginning."})," Adding it later to support parallel agents means touching the planner sub-agent's prompt, the schema, and the main agent's task-picking logic all at once."]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"Add a proper token tracking display earlier."})," right now it's in the upcoming features list."]}),`
`]}),`
`,e.jsx(t.hr,{}),`
`,e.jsx(t.h2,{children:"Where to Find It"}),`
`,e.jsx(t.p,{children:`Here's the github repo: https://github.com/subhraneel2005/sidequests
I have started to polish this project again and will work on some improvements. You can check them in the issues section of the repo, everything I do will be completely transparent.`}),`
`,e.jsx(t.p,{children:"If you're thinking about building something similar, the best way to start is reading how tool-calling, loops, sub-agents and orchestration actually work in whatever AI SDK you're using. The rest is just building on top of that foundation."}),`
`,e.jsx(t.hr,{}),`
`,e.jsx(t.h2,{children:"Thanks for Reading"}),`
`,e.jsxs(t.p,{children:[`If you made it this far, I genuinely appreciate. This was a fun project to build and an even more fun one to write about.
I keep posting about my projects, experiments, and side quests on X. If you want to follow along, here's my X(twitter) account: `,e.jsx(t.a,{href:"https://x.com/subhraneeltwt",children:"@subhraneeltwt"})]}),`
`,e.jsx(t.p,{children:"And if you have thoughts, feedback, criticism, questions, or just want to tell me something is wrong or could be done better, DM me, drop a comment, quote the post, whatever you want. I'm always looking to learn. Nothing is too small to share. See ya' :)"}),`
`,e.jsx(t.p,{children:e.jsx(t.img,{src:"https://dev-to-uploads.s3.amazonaws.com/uploads/articles/zijf3vodp12kjpowlv3e.png",alt:"Image description"})})]})}function r(n={}){const{wrapper:t}={...o(),...n.components};return t?e.jsx(t,{...n,children:e.jsx(s,{...n})}):s(n)}export{r as default};
