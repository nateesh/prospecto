## Creating a project
Create a new Svelte Project

```bash
pnpm create svelte@latest prospecto
cd prospecto
```

## Install Tailwind CSS

```bash
pnpm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```
Follow the other instructions on https://tailwindcss.com/docs/guides/sveltekit.

## GIT
1. Initialise Repo
2. Push Repo to GitHub
3. Setup branchs

Setup GIT in VS Code:
```bash
git init
git add .
git commit -m "Initial Commit"
```

Connect with GitHub Repo:
```bash
git remote add origin https://github.com/nateesh/prospecto.git
git branch -M main
git push -u origin main
```

Branches:
```bash
git branch dev
git checkout dev
git push -u origin dev

git branch test
git checkout test
git push -u origin test
```
### VERCEL
* create project
* link GitHub repo to project
```bash
vercel link
## add env variables
vercel env add 
vercel env pull .env
```

### SUPABASE
install cli 
```bash
via scoop https://github.com/supabase/cli
scoop bucket add supabase https://github.com/supabase/scoop-bucket.git
scoop install supabase

supabase login
supabase link --project-ref <project-id>
supabase start
supabase status ## to check everything running okay

pnpm install @supabase/auth-helpers-sveltekit @supabase/supabase-js
```
### DRIZZLE
Add Drizzle ORM
```bash
pnpm add -D drizzle-kit
pnpm add drizzle-orm postgres
pnpm add -D drizzle-kit
```