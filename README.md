# Conway's game of life
A TypeScript implementation of Conway's Game of Life, built with an emphasis on
thorough, hand-verified unit and integration testing. Currently a terminal-based
MVP, with plans to expand to a Node backend and React frontend.

## Issues

The simulation runs entirely client-side to avoid network round-trip latency between generations. The backend provides a REST API for persistence operations such as creating, retrieving, and deleting saved boards, but is not involved in the real-time simulation loop.

## Setup

## Tech Stack
## Tech Stack

**Languages**
- TypeScript

**Backend**
- Node.js
- Express

**Frontend**
- React

**Testing**
- Mocha
- Chai
- c8

**Tools**
- Git

## Status Update
- Phase 1: Completed :
- Phase 2: Completed : 2026-08-20
- Phase 3: Completed : 2026-08-21
- Phase 4: Delayed 
- Phase 5: Completed : 2026-08-26


## Project Goals
### **Phase 1: Plan out required utility functions for data Processing** [x]
### **Phase 2: Build a test file to verify utility functions work** [x]
-  Reduced test duplication using `describe` -scoped fixtures (shared board state via `beforeEach`)
- Built reusable assertion helpers (`setAliveStates`, `expectBoardHasExactly`, `assertNextGeneration`, `assertNeighborNodesExist`) used across the suite
- Unit test for every utility function (branch and boundry-value coverage)
- Integrtion test using recongized Game of Life patterns (block, blinker) plus hand-traced
custom patterns.
- Isolated tests for boundary conditions (board edges/corners) seprate from core rule logic
- Reusable test helpers to keep setup and assertions DRY across the suite

### **Phase 3: Develop a MVP terminal based Conway's game of life** [x]
User Stories:
- [x] As a user, I want to be able to select the area of the board between (1 - 9), so I can control how large the simulation is.
- [x] As a user, I want to be able to enter which cells are set alive, so I can generate my own patterns
- [x] As a user, I want to watch the board update through each generation, so i can observe the simulation working

#### **Implementation:**
- Built a `readline` - based prompt system (`promptUntilValid`) with reusable parse/validation callbacks, used for board size, cell coordinates, and yes/no prompts
- Rendered the board as a 2D character grid (`▢`/`■`), using template array and mutable display array to support resetting between generations
- Cached static output (coordinate legend, whitespace) that doesn't change during a session, while regenerating the dynamic board display every render
- Ran the simulation loop with `runGenerations`, clearing and redrawing the terminal each generation with a delay between frames

### **Phase 4: API Design** [x]
- As a user, I would like to select preset layouts in order to better learn the different patterns.
- As a user, I would like to be able to save my own custom preset games so I can load them later.
- As a user, start and stop the generation so I can customize mid generation this is so I can unfreeze a forzen state.

#### Possible HTTP requests
```
METHOD                  ENDPOINT                    PURPOSE

GET                     /game                       Get the current game state
POST                    /game/start                 Start generating the game
POST                    /game/next                  Advance the game one generation, return new state
POST                    /game/pause                 Pauses the current game
POST                    /game/pattern               Place a selected pattern at the specified cell
POST                    /game/reset                 Reset/end the current game

GET                     /game/patterns              Get available patterns
GET                     /game/patterns/:id          Get one pattern
POST                    /game/patterns              Save a new custom pattern
DELETE                  /game/patterns/:id          Delete a saved custom pattern
```
#### **DEFINITIONS**
```
game                    represents the current game state
game/pattern            allows user to upset a specific cell
game/patterns           represents the list of all pre built patterns
```
#### **PRE-BUILD PATTERNS**
```
Single cell
Glider
Block
Blinker
Pulsar
Bomb
Custom
```
### **Phase 5: Object-Oriented Architecture & Optimization** [x]

#### **Design Choices - Abstraction**

While designing how patterns would be represented and placed on the board, I noticed that the `Pattern` class shared much of the same functionality that would be required by the `Board` class. Rather than duplicating this logic, I recognized an opportunity to **abstract their shared functionality** into an abstract `Grid` class.

The `Grid` class now provides the common functionality required by both `Board` and `Pattern`, including **cell management, grid dimensions, and coordinate validation**. `Board` and `Pattern` extend `Grid` while remaining responsible for enforcing their own **domain-specific rules**.

For example, both `Board` and `Pattern` require their own validation logic when being constructed. The shared `Grid` constructor establishes the common grid state, while each subclass can **define and enforce its own construction requirements**.

This approach allows me to **reuse common functionality without tightly coupling `Board` and `Pattern`**, while keeping each class responsible for the rules specific to its purpose.

#### **Design Choices - Representing Data**

When building the MVP, I initially used a `Set<string>` to represent active cells because the application was terminal-based and I only needed a simple way to track cell coordinates. However, as the project evolved toward a **modular, object-oriented architecture**, this representation became unnecessarily expensive and difficult to work with.

I initially considered using a `boolean[][]` to represent the grid. While this provided straightforward access to individual cells, it required storing a value for **every cell**, including cells that were known to be dead. For a sparse board, this resulted in significant redundant data. If I already knew which cells were alive, I did not need to explicitly store every dead cell.

I therefore changed the representation to a `Set<number>`, where each active cell is represented by a single integer. To convert between the integer representation and 2D coordinates, I implemented a **bijective coordinate mapping** based on the board's column count. This allows coordinates to be encoded as a single integer and decoded back into `(x, y)` coordinates when required.

This representation provides **O(1)-average cell lookups** through `Set.has()` while significantly reducing the amount of state that must be stored for sparse boards. It also separates the **storage representation** from the 2D coordinate system used by the rest of the application, allowing the underlying data structure to remain compact without sacrificing the ability to work with conventional grid coordinates.

#### **Design Choice - architecture decisions**

While implementing pattern placement, I initially coupled the Board class directly to the coordinate and pattern-resolution logic. After getting the feature working, I recognized that Board only needs to apply the resulting cell updates, not know how those updates are calculated.

I separated the placement logic into a standalone utility and introduced a GridState interface containing only the information required to resolve a pattern's placement. This decouples the utility layer from the concrete Board and Pattern classes and allows the coordinate logic to be tested independently.

I deliberately kept the interface minimal by exposing a has(index) operation rather than the underlying cell set, avoiding unnecessary access to internal state.

Result: A more modular architecture with lower coupling, clearer responsibilities, and independently testable coordinate and placement logic.

### **Phase 6: Backend API Layer design**
TODO: 
- GameEngine service 
- Board Serialization
- In memory store 
- Express routes
- Build Pattern Library 
- Decide and build a run loop model
- Error handling (maybe)
- Input validation 


### **Phase 6: Turn Terminal Based game into a Node backend** []

### **Phase 7: Designing layout for frontend** []

### **Phase 8: Develope the frontend using `React`** []
