# Doto - Discord Todo Bot

A Discord bot built with Cloudflare Workers that helps you manage your todos directly from Discord. Create, edit, delete, and track your tasks with ease using slash commands.

## 🚀 Features

- **Todo Management**: Create, edit, delete, and view todos
- **Priority Levels**: Set HIGH, MEDIUM, or LOW priority for tasks
- **Status Tracking**: Track tasks as NOT_STARTED, IN_PROGRESS, or DONE
- **Progress Tracking**: Set progress percentage (0-100%) for tasks
- **Filtering & Sorting**: Filter todos by priority, status, progress and sort by last update time
- **Pagination**: Navigate through large lists of todos
- **Discord Integration**: Full Discord slash command support

## 🛠️ Tech Stack

- **Runtime**: Cloudflare Workers
- **Database**: PostgreSQL with Drizzle ORM
- **Router**: itty-router
- **Language**: TypeScript
- **Testing**: Vitest
- **Deployment**: Wrangler CLI

## 📋 Available Commands

| Command | Description | Usage |
|---------|-------------|-------|
| `/hello` | Get a welcome message | `/hello` |
| `/signup` | Create an account | `/signup` |
| `/add-todo` | Create a new todo | `/add-todo title:"Task name" priority:High description:"Task details"` |
| `/edit-todo` | Edit an existing todo | `/edit-todo id:1 title:"Updated title" status:In Progress` |
| `/delete-todo` | Delete a todo | `/delete-todo id:1` |
| `/todos` | List all todos with filters | `/todos priority:High status:Not Started sort:Desc page:1` |
| `/todo-detail` | View a specific todo | `/todo-detail id:1` |

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm
- PostgreSQL database
- Discord Bot Token
- Discord Application ID

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd doto
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up the database**
   ```bash
   # Start PostgreSQL using Docker
   docker-compose up -d
   
   # Push the database schema
   pnpm db:push
   ```

4. **Configure environment variables**
   
   Create a `.dev.vars` file in the root directory:
   ```env
   DISCORD_PUBLIC_KEY=your_discord_public_key
   DISCORD_APPLICATION_ID=your_discord_application_id
   DATABASE_URL=postgresql://dev_user:dev_pass@localhost:5432/postgres
   ```

5. **Register Discord commands**
   ```bash
   pnpm register
   ```

6. **Start development server**
   ```bash
   pnpm dev
   ```

### Development

- **Run tests**: `pnpm test`
- **Deploy to Cloudflare**: `pnpm deploy`
- **Generate types**: `pnpm cf-typegen`

## 🏗️ Project Structure

```
src/
├── config/           # Configuration files
├── dao/             # Data Access Objects
│   ├── todos.ts     # Todo database operations
│   └── users.ts     # User database operations
├── db/
│   └── schema.ts    # Database schema definitions
├── dtos/            # Data Transfer Objects
│   ├── commands.ts  # Discord command definitions
│   ├── response.ts  # Response types
│   └── todos.ts     # Todo-related DTOs
├── handler/         # Request handlers
│   ├── index.ts     # Main handler router
│   ├── add-todo.ts  # Add todo handler
│   ├── edit-todo.ts # Edit todo handler
│   ├── delete-todo.ts # Delete todo handler
│   ├── get-todos.ts # Get todos handler
│   ├── todo-details.ts # Todo details handler
│   ├── hello.ts     # Hello command handler
│   └── signup.ts    # Signup handler
├── middleware/
│   └── verifybot.ts # Discord request verification
├── utils/
│   ├── helper.ts    # Utility functions
│   └── response-handler.ts # Response formatting
└── index.ts         # Main entry point
```

## 🗄️ Database Schema

### Users Table
- `discord_id` (Primary Key): Discord user ID
- `created_at`: Account creation timestamp
- `updated_at`: Last update timestamp

### Todos Table
- `id` (Primary Key): Auto-incrementing todo ID
- `title`: Todo title (max 50 characters)
- `description`: Todo description (max 100 characters)
- `priority`: Priority level (HIGH, MEDIUM, LOW)
- `status`: Task status (DONE, IN_PROGRESS, NOT_STARTED)
- `progress`: Progress percentage (0-100)
- `owner`: Foreign key to users.discord_id
- `created_at`: Creation timestamp
- `updated_at`: Last update timestamp

## 🔧 Configuration

### Wrangler Configuration
The project uses `wrangler.jsonc` for Cloudflare Workers configuration. Key settings:
- **Compatibility Date**: 2025-07-01
- **Node.js Compatibility**: Enabled
- **Observability**: Enabled

### Environment Variables
- `DISCORD_PUBLIC_KEY`: Your Discord bot's public key
- `DISCORD_APPLICATION_ID`: Your Discord application ID
- `DATABASE_URL`: PostgreSQL connection string

## 🧪 Testing

The project includes comprehensive tests using Vitest:

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test --watch
```

## 🚀 Deployment

1. **Build and deploy to Cloudflare Workers**
   ```bash
   pnpm deploy
   ```

2. **Set up production environment variables**
   ```bash
   wrangler secret put DISCORD_PUBLIC_KEY
   wrangler secret put DISCORD_APPLICATION_ID
   wrangler secret put DATABASE_URL
   ```