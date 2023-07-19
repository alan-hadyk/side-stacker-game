# Side-Stacker Game

Side-Stacker Game - Monadical Application - Take-home project

## Architecture Implementation Plan

### Project Overview

> Brief description of the project and its objectives.

**Side-Stacker Game**

This is essentially connect-four, but the pieces stack on either side of the board instead of bottom-up.
Two players see a board, which is a grid of 7 rows and 7 columns. They take turn adding pieces to a row, on one of the sides. The pieces stack on top of each other, and the game ends when there are no spaces left available, or when a player has four consecutive pieces on a diagonal, column, or row.
For example, the board might look like this:

```
0 [ _ _ _ _ _ _ _ ]
1 [ o x _ _ _ _ o ]
2 [ x _ _ _ _ _ x ]
3 [ x _ _ _ _ _ o ]
4 [ o _ _ _ _ _ _ ]
5 [ _ _ _ _ _ _ _ ]
6 [ _ _ _ _ _ _ _ ]
```

in this case, it is x’s turn. If x plays (2, R), the board will look like this:

```
0 [ _ _ _ _ _ _ _ ]
1 [ o x _ _ _ _ o ]
2 [ x _ _ _ _ x x ]
3 [ x _ _ _ _ _ o ]
4 [ o _ _ _ _ _ _ ]
5 [ _ _ _ _ _ _ _ ]
6 [ _ _ _ _ _ _ _ ]
```

The take-home task is to implement the 2-player version of this game, where each player sees the board in their frontend and can place moves that the other player sees, and the game should display “player 1 won” “player 2 lost” when the game is complete.

### Technical Requirements

> Hard Technical Requirements of the project

#### The Frontend

1. Frontend must be written in ES7 Javascript. It can use either React or no framework at all. Angular, Vue and other large JS frameworks are not allowed, but Lodash, jQuery and similar are fine.
2. Prettier might be used to format the code, but there are no strict requirements regarding a specific code style. Code should be consistent.
3. Standard ES6 with `import` syntax or a boilerplate system similar to `create-react-app` is recommended.
4. Older browsers don't have to be supported

#### The Backend

1. Game should be stored in the backend using a relational database.
2. Backend can be written in JavaScript, Rust or Python >= 3.7.
3. Any Python backend framework or ORM might be used as needed.
4. The frontend and backend may interact via REST API, or websocket.
5. Real-time streaming can be tricky, so sending drawing strokes or board moves may be done when user clicks a button instead of sending continuous events.

### System Architecture

> High-level diagram showing how the different components of the system will interact with each other

![System Architecture - High-level diagram](docs/system-architecture.drawio.svg?raw=true "System Architecture - High-level diagram")

### Technology Stack

> List of technologies used in the project

#### The Frontend

1. **React** - React is a popular and powerful library for building user interfaces, and it's particularly well-suited to applications like this that require a responsive and interactive UI. React's component-based architecture will allow developers to build reusable game components (like a game board or a game piece) that can manage their own state and props.
2. **TypeScript** - TypeScript is a strongly typed version of JavaScript, which allows developers to write safer, more scalable code and catch errors early. TypeScript's static typing can help prevent bugs that might be caused by unexpected data types, which can be particularly useful in a game where the state can change rapidly and unpredictably.
3. **Vite** - Vite is a build tool that makes it easy to set up a new React project with minimal configuration. Thanks to fast compilation it will be very suitable for the scope of this project. Vite's hot module replacement feature will allow developers to see changes in real time as the game is developed, speeding up the development process.
4. **TanStack Query** - TanStack Query (FKA React Query) is often described as the missing data-fetching library for web applications, but in more technical terms, it makes fetching, caching, synchronizing and updating server state in web applications a breeze. It's also [possible to use WebSockets with TanStack Query](https://tkdodo.eu/blog/using-web-sockets-with-react-query). This library will provide a robust state management solution, which is definitely needed for this project. TanStack Query's caching and synchronization features will be useful for keeping the game state consistent across multiple clients.
5. **Tailwind CSS** - Tailwind CSS is a utility-first CSS framework, which gets most common CSS problems out of the way. Developers will be able to focus on building the UI, instead of fighting with CSS. Tailwind CSS's utility-first design will allow developers to quickly style game components without having to write a lot of custom CSS.
6. **React Router** - React Router enables "client side routing". Since this will be a "SPA" (Single-Page Application), some form of routing will be needed. React Router will allow developers to create different routes for different views in the application (like a home page, a game page, and a leaderboard page).
7. **ESLint and Prettier** - ESLint and Prettier are tools that enforce code quality and consistent formatting. ESLint catches potential bugs and enforces best practices, while Prettier ensures that code follows a consistent style. This will help maintain code quality and readability, which is especially important in a collaborative project.

#### The Backend

1. **Node.js** - Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine. It's perfect for developing server-side and networking applications, especially real-time ones like this game. Its non-blocking, event-driven architecture makes it lightweight and efficient, perfect for data-intensive real-time applications that run across distributed devices.
2. **TypeScript** - TypeScript, as in the frontend, will provide the benefits of static typing and enhanced code quality and maintainability. This is especially important in the backend where data integrity and application stability are crucial.
3. **PostgreSQL** - PostgreSQL is a powerful, open-source object-relational database system. It is robust and has many advanced features like complex queries, foreign keys, views, transactional integrity, and multiversion concurrency control. It will be used to store game states and player information.
4. **slonik** - Slonik is a battle-tested PostgreSQL client for Node.js, providing a set of features suitable for professional backend development. It will help manage database connections, transactions, and queries in a secure and efficient manner.
5. **Express** - Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications. It will be used to create the server-side logic, define routes, and handle HTTP requests and responses.
6. **Docker** - Docker is a platform that enables developers to build, package, and distribute applications in standardized units called containers. Docker will be used to containerize the PostgreSQL database, ensuring that it runs consistently in any environment.
7. **ESLint and Prettier** - As in the frontend, ESLint and Prettier will be used to enforce code quality and consistent formatting in the backend codebase.

#### Additional tools

Real and production-level application could also have additional tools, such as a tool for managing the environment variables (like Dotenv), testing frameworks (like Jest or Cypress), API documentation (like Swagger) and logging. However, given the scope and time constraints of this project, they probably won't be implemented.

### Data Model

> Description of database schema

Data model consists of three main entities: `Player`, `Game`, and `Move`.

1. `Players` table: This table stores information about each player.
Fields:
    - `player_id` (UUID, required): A unique identifier for each player. This is the primary key.
    - `session_id` (UUID, required): The session ID associated with the player. This is used to maintain the player's connection and game state.
    - `username` (text, required): The player's chosen username.
    - `created_at` (timestamp, required): The time when given player joined.
    - `last_active_at` (timestamp, required): The time when player made a last move.

2. `Games` table: This table stores information about each game.
Fields:
    - `game_id` (UUID, required): A unique identifier for each game. This is the primary key.
    - `player1_id` (UUID, required): The ID of the first player (owner of the game). This is a foreign key referencing `Players.player_id`.
    - `player2_id` (UUID, optional): The ID of the second player. This is a foreign key referencing `Players.player_id`. This field is optional because a game might be created before the second player has joined.
    - `current_player_id` (UUID, required): The ID of the player whose turn it is. This is a foreign key referencing `Players.player_id`.
    - `current_game_state` (enum, required): The current state of the game. This is an enumeration with values like "waiting for players", "in progress", "finished", etc.
    - `winner_id` (UUID, optional): The ID of the winning player, if the game has finished. This is a foreign key referencing `Players.player_id`.
    - `created_at` (timestamp, required): The time when the game was created.
    - `finished_at` (timestamp, optional): The time when the game was finished. This field is optional because it will be empty for games that are still in progress.

3. `Moves` table: This table stores information about each move made in a game.
Fields:
    - `move_id` (UUID, required): A unique identifier for each move. This is the primary key. 
    - `game_id` (UUID, required): The ID of the game in which the move was made. This is a foreign key referencing `Games.game_id`.
    - `player_id` (UUID, required): The ID of the player who made the move. This is a foreign key referencing `Players.player_id`.
    - `move_number` (integer, required): The order in which the move was made in the game. This can be used to reconstruct the game state.
    - `position_x` (integer, required): The X position on the game board where the move was made.
    - `position_y` (integer, required): The Y position on the game board where the move was made.
    - `created_at` (timestamp, required): The time when the move was made.

### User Flow

> Step-by-step walkthrough of a typical user interaction with the application

### Implementation Plan

> List of the major tasks that have to be completed

### Testing Strategy

> Plan to test the application, to ensure it works as expected

### Potential Challenges

> Any difficulties that might arise during the development. How they can be addressed?
