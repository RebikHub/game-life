'use strict'

import { Board } from './board'
import { Simulation } from './simulation'
import { Utils } from './utils'

export class Interface {
  constructor () {
    this.inputSize = document.querySelector('.input-size')
    this.inputCell = document.querySelector('.input-cell')
    this.cellPercent = document.querySelector('.cell-percent')
    this.btnStart = document.querySelector('.btn-start')
    this.btnRandomSize = document.querySelector('.btn-random-size')
    this.btnRandomCells = document.querySelector('.btn-random-cells')
    this.btnStop = document.querySelector('.btn-stop')
    this.btnReset = document.querySelector('.btn-reset')
    this.board = new Board(this.inputSize)
    this.simulation = new Simulation(this.board)
    this.cells = 0
  }

  static updatePercentOfLifes (size, input, percent) {
    const lifes = document.querySelectorAll('.life')
    const perc = Utils.getPercentOfLifes(+size, lifes.length)
    input.value = perc
    percent.textContent = perc
  }

  listenerCells () {
    const cells = document.querySelectorAll('.cell')
    cells.forEach(cell => {
      cell.addEventListener('click', (e) => {
        const { target } = e
        if (target.classList.contains('life')) {
          target.classList.remove('life')
        } else {
          target.classList.add('life')
        }
        Interface.updatePercentOfLifes(this.inputSize.value, this.inputCell, this.cellPercent)
      })
    })
  }

  init () {
    this.inputSize.addEventListener('input', (e) => {
      this.board.size = e.target.value
      this.inputCell.value = 0
      this.cellPercent.textContent = 0
      this.board.renderBoard()
      this.listenerCells()
    })

    this.inputCell.addEventListener('input', (e) => {
      this.cellPercent.textContent = e.target.value
      this.cells = Utils.getCellsOfPercent(+this.inputSize.value, e.target.value)
      this.board.createCells(this.cells)
      Interface.updatePercentOfLifes(this.inputSize.value, this.inputCell, this.cellPercent)
    })

    this.btnStart.addEventListener('click', () => {
      this.btnStart.disabled = true
      this.btnRandomSize.disabled = true
      this.btnRandomCells.disabled = true
      this.inputSize.disabled = true
      this.inputCell.disabled = true
      this.simulation.startSimulation()
    })

    this.btnRandomSize.addEventListener('click', () => {
      const randomNumber = Utils.randomMinMax(5, 29)
      this.inputSize.value = randomNumber
      this.board.updateSize()
      this.listenerCells()
      Interface.updatePercentOfLifes(this.inputSize.value, this.inputCell, this.cellPercent)
    })

    this.btnRandomCells.addEventListener('click', () => {
      const randomNumber = Utils.randomSizeCells()
      this.inputCell.value = randomNumber
      this.cellPercent.textContent = randomNumber
      this.cells = Utils.getCellsOfPercent(+this.inputSize.value, randomNumber)
      this.board.createCells(this.cells)
      Interface.updatePercentOfLifes(this.inputSize.value, this.inputCell, this.cellPercent)
    })

    this.btnStop.addEventListener('click', () => {
      this.simulation.stopSimulation()
    })

    this.btnReset.addEventListener('click', () => {
      this.simulation.resetSimulation()
      this.btnStart.disabled = false
      this.btnRandomSize.disabled = false
      this.btnRandomCells.disabled = false
      this.inputSize.disabled = false
      this.inputCell.disabled = false
      this.inputSize.value = 10
      this.board.size = 10
      this.inputCell.value = 0
      this.cellPercent.textContent = 0
      Board.clearLifeCells()
      this.board.renderBoard()
      this.listenerCells()
    })

    this.listenerCells()
  }
}
