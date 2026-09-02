# Conway's Game of Life (Completed)

A TypeScript implementation of Conway's Game of Life, built with an emphasis on thorough, hand-verified unit and integration testing for the terminal-based MVP. The project evolved from a terminal-based MVP into a Node/Express backend with a React frontend.

## Project Summary

This project began as a terminal exercise focused on testing discipline: I designed utility functions and built a test suite around them before building the UI. It grew into a full-stack application with a Node/Express backend and a React frontend.

The core focus throughout the project was the object model (`Grid`, `Board`, `Pattern`, and `GameRules`). The frontend was added during the final phase.

The frontend controls the simulation loop. For each generation, it sends the current board state to the backend through `POST /api/board/next` and receives the next generation. Play, pause, step, and reset are controlled by the frontend.

## Features

- Create and interact with a Game of Life board
- Start, pause, step through, and reset the simulation
- Configure the board dimensions
- Toggle individual cells
- Terminal-based MVP
- React-based frontend
- Node/Express REST backend
- Unit and integration testing for Terminal-based MVP
- Object-oriented board and pattern model
- Sparse board representation using `Set<number>`

## Tech Stack

### Language

- TypeScript

### Backend

- Node.js
- Express

### Frontend

- React

### Testing

- Mocha
- Chai
- c8

### Tools

- Git

## Testing

Testing was a major focus of the **terminal-based implementation**. The backend and React frontend do not currently have automated tests.

The terminal implementation includes:

- Unit tests for utility functions
- Branch and boundary-value coverage
- Integration tests using recognized Game of Life patterns such as Block and Blinker
- Hand-traced custom patterns
- Separate tests for board edges and corners
- Reusable test helpers to keep setup and assertions DRY
- `describe`-scoped fixtures using `beforeEach`

Reusable helpers include:

- `setAliveStates`
- `expectBoardHasExactly`
- `assertNextGeneration`
- `assertNeighborNodesExist`

The backend and frontend were developed after the terminal test suite and were not covered by the automated test suite.

## Running the Project

From the `game_of_life` project directory, run:

```bash
npm run game
```

This starts both the backend and frontend.

## Project Development

### Phase 1: Plan Required Utility Functions for Data Processing `[x]`

Planned the utility functions required to represent and process Game of Life board state.

### Phase 2: Build Tests for Utility Functions `[x]`

- Reduced test duplication using `describe`-scoped fixtures and shared board state through `beforeEach`
- Built reusable assertion helpers
- Added unit tests for utility functions, including branch and boundary-value coverage
- Added integration tests using recognized Game of Life patterns and hand-traced custom patterns
- Isolated boundary-condition tests for board edges and corners

### Phase 3: Develop a Terminal-Based Game of Life MVP `[x]`

#### User Stories

- [x] As a user, I want to select the board size between 1 and 9 so I can control how large the simulation is.
- [x] As a user, I want to enter which cells are alive so I can generate my own patterns.
- [x] As a user, I want to watch the board update through each generation so I can observe the simulation working.

#### Implementation

- Built a `readline`-based prompt system using `promptUntilValid` with reusable parsing and validation callbacks for board size, cell coordinates, and yes/no prompts
- Rendered the board as a 2D character grid (`▢` / `■`)
- Used a template array and mutable display array to support resetting between generations
- Cached static output such as the coordinate legend and whitespace while regenerating the dynamic board display for each render
- Implemented the simulation loop with `runGenerations`, clearing and redrawing the terminal between generations with a delay

### Phase 4: Original API Design `[x]`

The original API design was created around a more backend-driven architecture.

#### Original User Stories

- As a user, I would like to select preset layouts in order to learn the different patterns.
- As a user, I would like to save my own custom preset games so I can load them later.
- As a user, I would like to start and stop the generation so I can customize the board during a paused state.

#### Original API Proposal 

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/game` | Get the current game state |
| POST | `/game/start` | Start generating the game |
| POST | `/game/next` | Advance the game one generation and return the new state |
| POST | `/game/pause` | Pause the current game |
| POST | `/game/pattern` | Place a selected pattern at the specified cell |
| POST | `/game/reset` | Reset/end the current game |
| GET | `/game/patterns` | Get available patterns |
| GET | `/game/patterns/:id` | Get one pattern |
| POST | `/game/patterns` | Save a new custom pattern |
| DELETE | `/game/patterns/:id` | Delete a saved custom pattern |

> **Note:** This was the original API design. Several of these endpoints were never implemented in the final application. See [Known Limitations](#known-limitations).

#### Original Pattern Library

- Single cell
- Glider
- Block
- Blinker
- Pulsar
- Bomb
- Custom

### Phase 5: Object-Oriented Architecture & Optimization `[x]`

#### Design Choice: Abstraction

While designing how patterns would be represented and placed on the board, I noticed that the `Pattern` class shared much of the functionality required by the `Board` class. Rather than duplicating this logic, I abstracted their shared functionality into an abstract `Grid` class.

`Grid` provides the common functionality required by both `Board` and `Pattern`, including:

- Cell management
- Grid dimensions
- Coordinate validation

`Board` and `Pattern` extend `Grid` while remaining responsible for their own domain-specific rules.

For example, both classes require validation when they are constructed. The shared `Grid` constructor establishes the common grid state, while each subclass defines and enforces its own construction requirements.

This allows common functionality to be reused without tightly coupling `Board` and `Pattern`.

#### Design Choice: Representing Board Data

When building the MVP, I initially used a `Set<string>` to represent active cells because the application was terminal-based and only needed a simple way to track cell coordinates.

As the project evolved toward a modular, object-oriented architecture, I reconsidered the representation.

I initially considered using a `boolean[][]`. While this provides straightforward access to individual cells, it requires storing a value for every cell, including cells known to be dead. For a sparse board, that creates unnecessary storage.

I therefore changed the representation to a `Set<number>`, where each active cell is represented by a single integer.

The integer is converted to and from 2D coordinates using a mapping based on the board's column count. This provides:

- Average `O(1)` cell lookups through `Set.has()`
- Less stored state for sparse boards
- A compact representation of active cells
- Separation between the internal storage representation and the coordinate system used by the application

#### Design Choice: Separating Pattern Placement Logic

While implementing pattern placement, I initially coupled the `Board` class directly to coordinate and pattern-resolution logic.

After getting the feature working, I recognized that `Board` only needs to apply the resulting cell updates; it does not need to know how those updates are calculated.

I separated the placement logic into a standalone utility and introduced a `GridState` interface containing only the information required to resolve a pattern's placement.

The interface exposes a `has(index)` operation rather than the underlying cell set. This keeps the utility independent of the concrete `Board` and `Pattern` classes and avoids unnecessary access to internal state.

**Result:** a more modular architecture with lower coupling, clearer responsibilities, and independently testable coordinate and placement logic.

### Phase 6: Convert the Terminal Game into a Node Backend `[x]`

Converted the terminal-based implementation into a Node/Express backend and exposed the required functionality through HTTP.

### Phase 7: Design the Frontend Layout `[x]`

Designed the layout and controls required for the web-based version of the application.

### Phase 8: Develop the React Frontend `[x]`

Built the React frontend and connected it to the backend.

## Known Limitations

- **Reset is currently frontend-only.** `ResetButton` clears local state but does not notify the backend; `callResetBackend` remains a stub. There is no persisted "current game" on the server to keep in sync.
- **Pattern presets and saved custom patterns are not implemented in the frontend.** The `Pattern` model and placement logic exist and are tested at the model layer, but the planned pattern endpoints and preset-picker UI were never wired into the React application.
- **Resizing the grid clears the board instead of remapping it.** Changing the width or height wipes `liveCells` rather than preserving and repositioning existing cells. An index-remapping approach was attempted first but was dropped after it produced subtle bugs.
- **There is no board persistence.** The original `GET /game` and save/load endpoints were never built. The application currently supports a single in-memory session per page load.
- **The frontend grid is locked to square dimensions.** The backend `Board` model supports independent width and height values, but the current frontend does not expose that flexibility.

## Design Reflections & Lessons Learned

### Coordinate Encoding Is More Fragile Under Resize Than It Looks

Representing live cells as `Set<number>` using `row * width + col` works well for a fixed-size board, but it means every index's meaning is tied to the current width.

Changing the width does not simply invalidate out-of-bounds cells; it can silently reinterpret existing indexes as different `(row, col)` coordinates.

I initially wrote a remapping function assuming that only edge cells needed to be trimmed. That worked for height-only changes but was incorrect for width changes.

Working through the problem exposed a gap in my reasoning about the encoding. Rather than keep a remapping implementation I was not confident was correct, I chose to clear the board on resize. This gives the application simpler and more predictable behavior.

### Splitting Frontend State Ownership Mattered More Than Expected

Early in development, `PlayButton`, `PauseButton`, and `StepButton` each had their own backend-call stubs. This would have duplicated fetch logic and made it difficult for Step or Reset to cleanly interrupt an in-progress Play loop.

I moved the interval and the single source of truth for whether the game was playing into `OptionsPanel`, while keeping the buttons themselves as simple triggers.

That consolidation made the play, pause, step, and reset interactions much easier to reason about.

### React State and Refs

I also learned that React's rules around mutating refs during render matter in practice.

I initially used a ref during render as part of stale-closure avoidance. After encountering the issue, I moved that logic into a `useEffect`, where the ref could be updated without mutating it during rendering.

### Project Structure and Tooling

Restructuring the repository to provide a single top-level `npm run` command surfaced several path and `package.json` issues, including nested or duplicated paths, a stray misnamed folder shadowing a real source file, and an accidentally emptied `package.json`.

These issues were unrelated to the Game of Life logic, but they still consumed a meaningful amount of development time and highlighted the importance of establishing project structure early.

### The Gap Between the Original API Design and the Final Application

The biggest difference between the original plan and the final application was the persistence and pattern-library layer.

The object model was built to support these features through `Pattern`, `GameRules`, and `GridState`, but the REST endpoints and frontend UI for that layer were ultimately deprioritized in favor of completing the core play/pause/step/reset experience.

## Moving Forward

This project did not fully turn out the way I originally modeled it in my head. Looking back, much of that came from not fully understanding the application's data flow and responsibilities before implementation.

The clearest example is frontend/backend communication. The frontend stores live cells as a `Set<number>`, but a `Set` cannot be directly represented in JSON. Each request therefore has to convert the set into an array, package it into JSON, and reconstruct the state on the backend.

That conversion works, but it is redundant work that I only discovered after committing to the `Set<number>` representation rather than considering the communication format during the initial design.

I also misjudged which layer should own certain responsibilities. I built the `Pattern` class to work with the backend, but patterns only affect what is ultimately rendered by the frontend. There was never a strong reason for the backend to understand the pattern model.

Going forward, I want to start future projects with a pen-and-paper design:

1. Sketch what the application should look like.
2. Define what data the frontend needs to own.
3. Decide how that data should be represented.
4. Determine what the backend actually needs to store or expose.
5. Design the API around those responsibilities.
6. Only then begin implementation.

I expect this ordering — **designing the data model and system boundaries before implementation** — to reduce redundant work and make future projects easier to evolve.
