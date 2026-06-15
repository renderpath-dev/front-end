export type CellValue = number | null
export type SudokuBoard = CellValue[]

export interface DailyPuzzle {
  id: string
  dateKey: string
  displayDate: string
  cells: SudokuBoard
  solution: number[]
  givens: boolean[]
  emptyCount: number
}

const GRID_SIZE = 9
const BOX_SIZE = 3
const CELL_COUNT = GRID_SIZE * GRID_SIZE
const TARGET_EMPTY_CELLS = 47
const DIGITS = [1, 2, 3, 4, 5, 6, 7, 8, 9]

interface CandidateChoice {
  index: number
  candidates: number[]
}

export function createDailyPuzzle(date = new Date()): DailyPuzzle {
  const dateKey = getLocalDateKey(date)
  const seed = hashText(`daily-sudoku-${dateKey}`)
  const solution = createSolvedGrid(seed)
  const cells = createPuzzleCells(solution, seed)
  const givens = cells.map((value) => value !== null)

  return {
    id: `daily-${dateKey}`,
    dateKey,
    displayDate: new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date),
    cells,
    solution,
    givens,
    emptyCount: cells.filter((value) => value === null).length,
  }
}

function getLocalDateKey(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

function createSolvedGrid(seed: number): number[] {
  const random = createRandom(seed)
  const rows = createHouseOrder(random)
  const columns = createHouseOrder(random)
  const digits = shuffle(DIGITS, random)

  return Array.from({ length: CELL_COUNT }, (_, index) => {
    const row = rows[Math.floor(index / GRID_SIZE)]
    const column = columns[index % GRID_SIZE]
    const digitIndex = (row * BOX_SIZE + Math.floor(row / BOX_SIZE) + column) % GRID_SIZE

    return digits[digitIndex]
  })
}

function createHouseOrder(random: () => number): number[] {
  return shuffle([0, 1, 2], random).flatMap((band) =>
    shuffle([0, 1, 2], random).map((offset) => band * BOX_SIZE + offset),
  )
}

function createPuzzleCells(solution: number[], seed: number): SudokuBoard {
  const random = createRandom(seed ^ 0x9e3779b9)
  const cellOrder = shuffle(
    Array.from({ length: CELL_COUNT }, (_, index) => index),
    random,
  )
  const puzzle = solution.map<CellValue>((value) => value)
  let emptyCells = 0

  for (const index of cellOrder) {
    if (emptyCells >= TARGET_EMPTY_CELLS) {
      break
    }

    const savedValue = puzzle[index]
    puzzle[index] = null

    if (countSolutions(puzzle, 2) === 1) {
      emptyCells += 1
    } else {
      puzzle[index] = savedValue
    }
  }

  return puzzle
}

function countSolutions(board: SudokuBoard, maxSolutions: number): number {
  const workingBoard = [...board]
  let solutionCount = 0

  function solve(): void {
    if (solutionCount >= maxSolutions) {
      return
    }

    const nextChoice = findBestChoice(workingBoard)

    if (nextChoice === null) {
      solutionCount += 1
      return
    }

    if (nextChoice.candidates.length === 0) {
      return
    }

    for (const candidate of nextChoice.candidates) {
      workingBoard[nextChoice.index] = candidate
      solve()
      workingBoard[nextChoice.index] = null

      if (solutionCount >= maxSolutions) {
        return
      }
    }
  }

  solve()

  return solutionCount
}

function findBestChoice(board: SudokuBoard): CandidateChoice | null {
  let bestChoice: CandidateChoice | null = null

  for (let index = 0; index < board.length; index += 1) {
    if (board[index] !== null) {
      continue
    }

    const candidates = getCandidates(board, index)

    if (candidates.length === 0) {
      return { index, candidates }
    }

    if (bestChoice === null || candidates.length < bestChoice.candidates.length) {
      bestChoice = { index, candidates }
    }
  }

  return bestChoice
}

function getCandidates(board: SudokuBoard, index: number): number[] {
  const usedValues = new Set<number>()
  const row = Math.floor(index / GRID_SIZE)
  const column = index % GRID_SIZE
  const boxRow = Math.floor(row / BOX_SIZE) * BOX_SIZE
  const boxColumn = Math.floor(column / BOX_SIZE) * BOX_SIZE

  for (let offset = 0; offset < GRID_SIZE; offset += 1) {
    addUsedValue(usedValues, board[row * GRID_SIZE + offset])
    addUsedValue(usedValues, board[offset * GRID_SIZE + column])
  }

  for (let rowOffset = 0; rowOffset < BOX_SIZE; rowOffset += 1) {
    for (let columnOffset = 0; columnOffset < BOX_SIZE; columnOffset += 1) {
      addUsedValue(
        usedValues,
        board[(boxRow + rowOffset) * GRID_SIZE + boxColumn + columnOffset],
      )
    }
  }

  return DIGITS.filter((digit) => !usedValues.has(digit))
}

function addUsedValue(usedValues: Set<number>, value: CellValue): void {
  if (value !== null) {
    usedValues.add(value)
  }
}

function shuffle<T>(items: T[], random: () => number): T[] {
  const result = [...items]

  for (let index = result.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1))
    const currentValue = result[index]
    result[index] = result[swapIndex]
    result[swapIndex] = currentValue
  }

  return result
}

function hashText(value: string): number {
  let hash = 2166136261

  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index)
    hash = Math.imul(hash, 16777619)
  }

  return hash >>> 0
}

function createRandom(seed: number): () => number {
  let state = seed >>> 0

  return () => {
    state += 0x6d2b79f5
    let value = state
    value = Math.imul(value ^ (value >>> 15), value | 1)
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61)

    return ((value ^ (value >>> 14)) >>> 0) / 4294967296
  }
}
