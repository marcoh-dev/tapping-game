# Tapping Game

### Local Development

Requirements: Node 24 (`nvm use`) and Docker.

1. Install the dependencies with `npm install`.
2. Copy `.env.example` to `.env.local` and fill in the GitHub OAuth app credentials and a `NEXTAUTH_SECRET`.
3. Start the local MongoDB with `docker compose up -d`.
4. Run `npm run dev` and open the displayed URL in a browser.

### Scripts

- `npm run dev` to start a development server
- `npm run build` to build the project
- `npm run start` to start a production server
- `npm test` to run the tests (`npm run test:watch` in watch mode)
- `npm run lint` / `npm run lint:fix` to run ESLint
- `npm run format` / `npm run format:check` to run Prettier
- `npm run typecheck` to check the types
- `npm run check` to run lint, format check and typecheck
- `npm run sync` to switch to `main`, pull, install dependencies if `package-lock.json` changed and start the database
- `npm run sync:branch` to merge `main` into the current branch (without committing), install if needed and start the database

`sync:branch` prepares the merge but doesn't commit it, so you can check it first (`git merge --abort` undoes it). After a reinstall in VS Code, run **Developer: Reload Window** so the TypeScript and ESLint servers pick up the new `node_modules`.
