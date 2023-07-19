# Side-Stacker Game

Side-Stacker Game - Monadical Application - Take-home project

## Architecture Implementation Plan

### Project Overview

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

### Technology Stack

#### The Frontend

1. **React** - React is a popular and powerful library for building user interfaces, and it's particularly well-suited to applications like this that require a responsive and interactive UI. React's component-based architecture will allow developers to build reusable game components (like a game board or a game piece) that can manage their own state and props.
2. **TypeScript** - TypeScript is a strongly typed version of JavaScript, which allows developers to write safer, more scalable code and catch errors early. TypeScript's static typing can help prevent bugs that might be caused by unexpected data types, which can be particularly useful in a game where the state can change rapidly and unpredictably.
3. **Vite** - Vite is a build tool that makes it easy to set up a new React project with minimal configuration. Thanks to fast compilation it will be very suitable for the scope of this project. Vite's hot module replacement feature will allow developers to see changes in real time as the game is developed, speeding up the development process.
4. **TanStack Query** - TanStack Query (FKA React Query) is often described as the missing data-fetching library for web applications, but in more technical terms, it makes fetching, caching, synchronizing and updating server state in web applications a breeze. It's also [possible to use WebSockets with TanStack Query](https://tkdodo.eu/blog/using-web-sockets-with-react-query). This library will provide a robust state management solution, which is definitely needed for this project. TanStack Query's caching and synchronization features will be useful for keeping the game state consistent across multiple clients.
5. **Tailwind CSS** - Tailwind CSS is a utility-first CSS framework, which gets most common CSS problems out of the way. Developers will be able to focus on building the UI, instead of fighting with CSS. Tailwind CSS's utility-first design will allow developers to quickly style game components without having to write a lot of custom CSS.
6. **React Router** - React Router enables "client side routing". Since this will be a "SPA" (Single-Page Application), some form of routing will be needed. React Router will allow developers to create different routes for different views in the application (like a home page, a game page, and a leaderboard page).

#### The Backend

TODO

### System Architecture

TODO

### Data Model

TODO

### User Flow

TODO

### Implementation Plan

TODO

### Testing Strategy

TODO

### Potential Challenges

TODO
