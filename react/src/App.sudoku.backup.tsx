import { useEffect, useMemo, useState } from 'react'
import type { ChangeEvent, KeyboardEvent } from 'react'
import './sudoku/App.css'
import {
  addLeaderboardEntry,
  formatTime,
  loadLeaderboard,
  loadPlayerName,
  sanitizePlayerName,
  savePlayerName,
} from './sudoku/leaderboard'
import type { LeaderboardEntry } from './sudoku/leaderboard'
import { createDailyPuzzle } from './sudoku/sudoku'
import type { CellValue, SudokuBoard } from './sudoku/sudoku'

const GRID_SIZE = 9
const NUMBER_KEYS = [1, 2, 3, 4, 5, 6, 7, 8, 9]

function App() {
  const puzzle = useMemo(() => createDailyPuzzle(), [])
  const firstOpenCell = useMemo(() => getFirstOpenCell(puzzle.cells), [puzzle.cells])
  const [board, setBoard] = useState<SudokuBoard>(() => [...puzzle.cells])
  const [selectedCell, setSelectedCell] = useState(firstOpenCell)
  const [mistakes, setMistakes] = useState(0)
  const [startedAt, setStartedAt] = useState(() => Date.now())
  const [elapsedSeconds, setElapsedSeconds] = useState(0)
  const [playerName, setPlayerName] = useState(() => loadPlayerName())
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>(() =>
    loadLeaderboard(puzzle.id),
  )
  const [hasSavedResult, setHasSavedResult] = useState(false)
  const [statusMessage, setStatusMessage] = useState('Select an empty cell to start.')

  const isComplete = board.every((value, index) => value === puzzle.solution[index])
  const filledCells = board.filter((value) => value !== null).length
  const remainingCells = board.length - filledCells
  const completionPercent = Math.round((filledCells / board.length) * 100)

  useEffect(() => {
    if (isComplete) {
      return
    }

    const intervalId = window.setInterval(() => {
      setElapsedSeconds(Math.floor((Date.now() - startedAt) / 1000))
    }, 1000)

    return () => window.clearInterval(intervalId)
  }, [isComplete, startedAt])

  function handlePlayerNameChange(event: ChangeEvent<HTMLInputElement>): void {
    const nextName = event.target.value
    setPlayerName(nextName)
    savePlayerName(nextName)
  }

  function handleCellInput(index: number, digit: number): void {
    if (isComplete) {
      return
    }

    setSelectedCell(index)

    if (puzzle.givens[index]) {
      setStatusMessage('Given cells cannot be changed.')
      return
    }

    if (board[index] !== null) {
      setStatusMessage('Clear the cell before changing it.')
      return
    }

    if (digit !== puzzle.solution[index]) {
      setMistakes((currentMistakes) => currentMistakes + 1)
      setStatusMessage(`${digit} does not fit there.`)
      return
    }

    const nextBoard = [...board]
    nextBoard[index] = digit
    setBoard(nextBoard)

    if (isSolvedBoard(nextBoard, puzzle.solution) && !hasSavedResult) {
      recordCompletion()
      return
    }

    setStatusMessage('Correct. Keep going.')
  }

  function handleClearCell(index: number): void {
    if (isComplete) {
      return
    }

    setSelectedCell(index)

    if (puzzle.givens[index]) {
      setStatusMessage('Given cells cannot be cleared.')
      return
    }

    if (board[index] === null) {
      setStatusMessage('That cell is already empty.')
      return
    }

    setBoard((currentBoard) => {
      const nextBoard = [...currentBoard]
      nextBoard[index] = null
      return nextBoard
    })
    setStatusMessage('Cell cleared.')
  }

  function handleCellKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number): void {
    if (/^[1-9]$/.test(event.key)) {
      event.preventDefault()
      handleCellInput(index, Number(event.key))
      return
    }

    if (event.key === 'Backspace' || event.key === 'Delete') {
      event.preventDefault()
      handleClearCell(index)
    }
  }

  function handleReset(): void {
    setBoard([...puzzle.cells])
    setSelectedCell(firstOpenCell)
    setMistakes(0)
    setStartedAt(Date.now())
    setElapsedSeconds(0)
    setHasSavedResult(false)
    setStatusMessage('Puzzle reset. Timer restarted.')
  }

  function recordCompletion(): void {
    const finalSeconds = Math.max(1, elapsedSeconds)
    const completedAt = new Date(startedAt + finalSeconds * 1000).toISOString()
    const entry: LeaderboardEntry = {
      id: `${puzzle.id}-${completedAt}`,
      name: sanitizePlayerName(playerName),
      seconds: finalSeconds,
      mistakes,
      completedAt,
    }

    setElapsedSeconds(finalSeconds)
    setLeaderboard((currentEntries) => addLeaderboardEntry(puzzle.id, currentEntries, entry))
    setHasSavedResult(true)
    setStatusMessage('Puzzle complete. Your result is on the local leaderboard.')
  }

  return (
    <main className="app-shell">
      <section className="game-surface" aria-labelledby="game-title">
        <header className="game-header">
          <div>
            <p className="eyebrow">Daily challenge</p>
            <h1 id="game-title">Daily Sudoku</h1>
            <p className="header-copy">
              One deterministic puzzle for {puzzle.displayDate}. Finish with fewer
              mistakes and a faster time to climb the local leaderboard.
            </p>
          </div>

          <div className="date-badge" aria-label={`Puzzle date ${puzzle.dateKey}`}>
            <span>Today</span>
            <strong>{puzzle.dateKey}</strong>
          </div>
        </header>

        <section className="metrics-grid" aria-label="Game statistics">
          <GameMetric label="Time" value={formatTime(elapsedSeconds)} />
          <GameMetric label="Mistakes" value={String(mistakes)} />
          <GameMetric label="Remaining" value={String(remainingCells)} />
          <GameMetric label="Progress" value={`${completionPercent}%`} />
        </section>

        <div className="game-layout">
          <section className="board-panel" aria-label="Sudoku board">
            <div className="sudoku-board" role="grid" aria-label="Daily sudoku puzzle">
              {board.map((value, index) => {
                const row = Math.floor(index / GRID_SIZE)
                const column = index % GRID_SIZE
                const isGiven = puzzle.givens[index]

                return (
                  <button
                    aria-label={getCellLabel(row, column, value, isGiven)}
                    aria-selected={selectedCell === index}
                    className={getCellClassName(index, value, selectedCell, isGiven)}
                    id={`cell-${index}`}
                    key={index}
                    onClick={() => setSelectedCell(index)}
                    onKeyDown={(event) => handleCellKeyDown(event, index)}
                    role="gridcell"
                    type="button"
                  >
                    {value}
                  </button>
                )
              })}
            </div>

            <div className="board-actions" aria-label="Number controls">
              <div className="number-pad">
                {NUMBER_KEYS.map((digit) => (
                  <button
                    className="number-key"
                    disabled={isComplete}
                    key={digit}
                    onClick={() => handleCellInput(selectedCell, digit)}
                    type="button"
                  >
                    {digit}
                  </button>
                ))}
              </div>

              <div className="action-row">
                <button
                  className="secondary-action"
                  disabled={isComplete}
                  onClick={() => handleClearCell(selectedCell)}
                  type="button"
                >
                  Clear
                </button>
                <button className="secondary-action" onClick={handleReset} type="button">
                  Reset puzzle
                </button>
              </div>
            </div>
          </section>

          <aside className="side-panel" aria-label="Leaderboard and status">
            <label className="name-field">
              <span>Player name</span>
              <input
                maxLength={24}
                onChange={handlePlayerNameChange}
                placeholder="Player"
                value={playerName}
              />
            </label>

            <section className="status-panel" aria-live="polite">
              <span>Status</span>
              <p>{statusMessage}</p>
            </section>

            <section className="leaderboard-panel" aria-labelledby="leaderboard-title">
              <div className="panel-heading">
                <div>
                  <p className="eyebrow">Browser local</p>
                  <h2 id="leaderboard-title">Leaderboard</h2>
                </div>
                <span>{leaderboard.length}/10</span>
              </div>

              {leaderboard.length === 0 ? (
                <p className="empty-state">
                  Complete today&apos;s puzzle to post the first score on this browser.
                </p>
              ) : (
                <table className="leaderboard-table">
                  <thead>
                    <tr>
                      <th scope="col">Rank</th>
                      <th scope="col">Player</th>
                      <th scope="col">Time</th>
                      <th scope="col">Mistakes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaderboard.map((entry, index) => (
                      <tr key={entry.id}>
                        <td>{index + 1}</td>
                        <td>{entry.name}</td>
                        <td>{formatTime(entry.seconds)}</td>
                        <td>{entry.mistakes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </section>

            <section className="rules-panel" aria-label="Game rules">
              <h2>How scoring works</h2>
              <p>
                Correct numbers are placed immediately. Wrong guesses stay off the
                board and add one mistake. Rankings sort by mistakes first, then time.
              </p>
              <p>{puzzle.emptyCount} cells are open in today&apos;s puzzle.</p>
            </section>
          </aside>
        </div>
      </section>
    </main>
  )
}

interface GameMetricProps {
  label: string
  value: string
}

function GameMetric({ label, value }: GameMetricProps) {
  return (
    <div className="metric-card">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  )
}

function getFirstOpenCell(cells: SudokuBoard): number {
  const firstOpenIndex = cells.findIndex((value) => value === null)

  return firstOpenIndex === -1 ? 0 : firstOpenIndex
}

function getCellLabel(row: number, column: number, value: CellValue, isGiven: boolean): string {
  const valueLabel = value === null ? 'empty' : String(value)
  const sourceLabel = isGiven ? 'given' : 'editable'

  return `Row ${row + 1}, column ${column + 1}, ${valueLabel}, ${sourceLabel}`
}

function isSolvedBoard(board: SudokuBoard, solution: number[]): boolean {
  return board.every((value, index) => value === solution[index])
}

function getCellClassName(
  index: number,
  value: CellValue,
  selectedCell: number,
  isGiven: boolean,
): string {
  const classNames = ['sudoku-cell']

  if (isGiven) {
    classNames.push('given-cell')
  }

  if (!isGiven && value !== null) {
    classNames.push('solved-cell')
  }

  if (index === selectedCell) {
    classNames.push('selected-cell')
  } else if (isRelatedCell(index, selectedCell)) {
    classNames.push('related-cell')
  }

  if (isBoxRightEdge(index)) {
    classNames.push('box-right')
  }

  if (isBoxBottomEdge(index)) {
    classNames.push('box-bottom')
  }

  return classNames.join(' ')
}

function isRelatedCell(index: number, selectedCell: number): boolean {
  const row = Math.floor(index / GRID_SIZE)
  const column = index % GRID_SIZE
  const selectedRow = Math.floor(selectedCell / GRID_SIZE)
  const selectedColumn = selectedCell % GRID_SIZE
  const boxRow = Math.floor(row / 3)
  const boxColumn = Math.floor(column / 3)
  const selectedBoxRow = Math.floor(selectedRow / 3)
  const selectedBoxColumn = Math.floor(selectedColumn / 3)

  return (
    row === selectedRow ||
    column === selectedColumn ||
    (boxRow === selectedBoxRow && boxColumn === selectedBoxColumn)
  )
}

function isBoxRightEdge(index: number): boolean {
  const column = index % GRID_SIZE

  return column === 2 || column === 5
}

function isBoxBottomEdge(index: number): boolean {
  const row = Math.floor(index / GRID_SIZE)

  return row === 2 || row === 5
}

export default App
