# Conway's game of life
A TypeScript implementation of Conway's Game of Life, built with an emphasis on
thorough, hand-verified unit and integration testing. Currently a terminal-based
MVP, with plans to expand to a Node backend and React frontend.

## Setup

## Tech Stack
- TypeScrypt
- Mocha
- Chai
- c8

## Status Update
- Phase 1: Completed : Unknown
- Phase 2: Completed : 2026-08-20
- Phase 3: Completed : 2026-08-21
- Phase 4: Working on


## Project Goals
### **Phase 1: Plan out required utility functions for data Processing - Done**
### **Phase 2: Build a test file to verify utility functions work - Done**
-  Reduced test duplication using `describe` -scoped fixtures (shared board state via `beforeEach`)
- Built reusable assertion helpers (`setAliveStates`, `expectBoardHasExactly`, `assertNextGeneration`, `assertNeighborNodesExist`) used across the suite
- Unit test for every utility function (branch and boundry-value coverage)
- Integrtion test using recongized Game of Life patterns (block, blinker) plus hand-traced
custom patterns.
- Isolated tests for boundary conditions (board edges/corners) seprate from core rule logic
- Reusable test helpers to keep setup and assertions DRY across the suite

### **Phase 3: Develop a MVP terminal based Conway's game of life**
User Stories:
- [x] As a user, I want to be able to select the area of the board between (1 - 9), so I can control how large the simulation is.
- [x] As a user, I want to be able to enter which cells are set alive, so I can generate my own patterns
- [x] As a user, I want to watch the board update through each generation, so i can observe the simulation working

**Implementation: **
- Built a `readline` - based prompt system (`promptUntilValid`) with reusable parse/validation callbacks, used for board size, cell coordinates, and yes/no prompts
- Rendered the board as a 2D character grid (`▢`/`■`), using template array and mutable display array to support resetting between generations
- Cached static output (coordinate legend, whitespace) that doesn't change during a session, while regenerating the dynamic board display every render
- Ran the simulation loop with `runGenerations`, clearing and redrawing the terminal each generation with a delay between frames

### **Phase 4: Planning Endpoints**
- As a user, I would like to select preset layouts in order to better learn the different patterns.
- As a user, I would like to be able to save my own custom preset games so I can load them later.
- As a user, start and stop the generation so I can customize mid generation this is so I can unfreeze a forzen state.

#### Possible HTTP requests

**METHOD                  ENDPOINT                    PURPOSE**
```
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


### **Phase 5: Turn Terminal Based game into a Node backend**

### **Phase 6: Designing layout for frontend**

### **Phase 7: Develope the frontend using `React`**
