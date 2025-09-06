import concurrently from "concurrently";

concurrently([
    { command: "bun run dev", name: "server", prefixColor: "blue" , cwd: 'packages/server'},
    { command: "bun run dev", name: "client", prefixColor: "green", cwd: 'packages/client' }
])