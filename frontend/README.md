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
Phase 1: Completed
Phase 2: Completed
Phase 3: Working on


## Project Goals
**Phase 1: Plan out required utility functions for data Processing - Done** 
**Phase 2: Build a test file to verify utility functions work - Done**
    - Reduced test duplication using `describe` -scoped fixtures (shared board state via `beforeEach`)
    - Built reusable assertion helpers (`setAliveStates`, `expectBoardHasExactly`, `assertNextGeneration`, `assertNeighborNodesExist`) used across the suite
    - Unit test for every utility function (branch and boundry-value coverage)
    - Integrtion test using recongized Game of Life patterns (block, blinker) plus hand-traced
    custom patterns.
    - Isolated tests for boundary conditions (board edges/corners) seprate from core rule logic
    - Reusable test helpers to keep setup and assertions DRY across the suite

**Phase 3: Develop a MVP terminal based Conway's game of life**
     

Testing Design: utilsGameBoard.test.ts
    - built reusable scope tests that use hoisted variables in a described block in every test
## Phase 2 - Turn the Terminal based game into a Node backend 
## Phase 3 - Add React 
## Phase 4 - Add more Phases
