# Technical Round

## Getting Started

### Clone the Repository

To clone the project, run the following command:

```bash
git clone https://gitbase.darthcentral.in/central/technical-round-reactjs.git
```

### Install Dependencies

Use your preferred package manager to install the dependencies:

```bash
pnpm install
```

### Setup Environment Variables

Copy the example environment file and rename it:

```bash
cp .env.example .env
```
### Initialize Database

To set up the SQLite database and insert a default user, run the initialization script:
```bash
pnpm tsx src/app/script/init-db.ts
# or
npx tsx src/app/script/init-db.ts
```
### Run the Development Server

Start the development server using one of the following commands:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Once the server is running, open your browser and navigate to:

[http://localhost:3000](http://localhost:3000)

### Start Editing

You can begin editing the homepage by modifying the following file:

```
app/page.tsx
```

Changes will be reflected automatically in the browser.