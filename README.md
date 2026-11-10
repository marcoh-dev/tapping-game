# Tapping Game

### Local Development

Requirements: Node 24 (`nvm use`) and Docker.

1. Install the dependencies with `pnpm install`.
2. Copy `.env.example` to `.env.local` and fill in the GitHub OAuth app credentials and a `NEXTAUTH_SECRET`.
3. Start the local MongoDB with `docker compose up -d`.
4. Run `pnpm dev` and open the displayed URL in a browser.

### Scripts

- `pnpm dev` to start a development server
- `pnpm build` to build the project
- `pnpm start` to start a production server
- `pnpm test` to run the tests (`pnpm test:watch` in watch mode)
- `pnpm lint` / `pnpm lint:fix` to run ESLint
- `pnpm format` / `pnpm format:check` to run Prettier
- `pnpm typecheck` to check the types
- `pnpm check` to run lint, format check and typecheck
- `pnpm sync` to switch to `main`, pull, install dependencies and start the database
- `pnpm sync:branch` to merge `main` into the current branch (without committing), install dependencies and start the database

`sync:branch` prepares the merge but doesn't commit it, so you can check it first (`git merge --abort` undoes it). After a reinstall in VS Code, run **Developer: Reload Window** so the TypeScript and ESLint servers pick up the new `node_modules`.
