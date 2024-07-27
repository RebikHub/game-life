'use strict'

import { Interface } from './interface'
import { Utils } from './utils'

export class Simulation {
  constructor (board) {
    this.totalTime = document.querySelector('.total-time')
    this.generation = document.querySelector('.number-generation')
    this.inputCell = document.querySelector('.input-cell')
    this.cellPercent = document.querySelector('.cell-percent')
    this.timeStep = 200
    this.timer = null
    this.board = board
    this.logs = { position: [] }
  }

  simulationLogs (lifes) {
    const positions = Array.from(lifes).map((e) => ({
      x: e.dataset.x,
      y: e.dataset.y
    }))

    if (this.logs.position.length < 3) {
      this.logs.position.push(positions)
    } else {
      this.logs.position.shift()
      this.logs.position.push(positions)
    }
  }

  checkConditionsStopping () {
    const lifes = document.querySelectorAll('.life')
    if (lifes.length === 0) {
      this.stopSimulation()
      return false
    }
    this.simulationLogs(lifes)
    const array1 = JSON.stringify(this.logs.position[0])
    const array2 = JSON.stringify(this.logs.position[1])
    const array3 = JSON.stringify(this.logs.position[2])
    if (this.logs.position.length === 3 &&
      (array3 === array2 || array3 === array1)) {
      this.stopSimulation()
      return false
    }

    return true
  }

  simulation (coreCell, max) {
    const x = +coreCell.dataset.x
    const y = +coreCell.dataset.y
    const siblings = [
      { x: Utils.getMinus(x, max), y: Utils.getMinus(y, max) },
      { x: Utils.getMinus(x, max), y: Utils.getSum(y, max) },
      { x: Utils.getSum(x, max), y: Utils.getMinus(y, max) },
      { x: Utils.getSum(x, max), y: Utils.getSum(y, max) },
      { x, y: Utils.getMinus(y, max) },
      { x, y: Utils.getSum(y, max) },
      { x: Utils.getSum(x, max), y },
      { x: Utils.getMinus(x, max), y }
    ]

    let lifes = 0
    siblings.forEach(({ x, y }) => {
      const cell = this.board.map.get(`${x},${y}`)
      if (cell && cell.classList.contains('life')) {
        lifes += 1
      }
    })

    if (coreCell.classList.contains('life') && (lifes < 2 || lifes > 3)) {
      return { x, y, life: false }
    } else if (lifes === 3) {
      return { x, y, life: true }
    }
    return { x, y, life: coreCell.classList.contains('life') }
  }

  updateGeneration (cells) {
    Interface.updatePercentOfLifes(this.board.size, this.inputCell, this.cellPercent)
    const size = +this.board.size
    const newGeneration = []
    cells.forEach(cell => {
      newGeneration.push(this.simulation(cell, size))
    })

    newGeneration.forEach(({ x, y, life }) => {
      const cell = this.board.map.get(`${x},${y}`)
      if (life && !cell.classList.contains('life')) {
        cell.classList.add('life')
      } else if (!life && cell.classList.contains('life')) {
        cell.classList.remove('life')
      }
    })
  }

  startSimulation () {
    const startTime = Date.now()
    let generation = 1
    const cells = document.querySelectorAll('.cell')

    const simulate = () => {
      if (this.checkConditionsStopping()) {
        this.totalTime.textContent = Utils.getTime(Date.now() - startTime)
        generation += 1
        this.updateGeneration(cells)
        this.generation.textContent = generation
        this.timer = setTimeout(simulate, this.timeStep)
      }
    }

    simulate()
  }

  stopSimulation () {
    clearInterval(this.timer)
  }

  resetSimulation () {
    clearInterval(this.timer)
    this.timer = null
    this.totalTime.textContent = '00:00'
    this.generation.textContent = '0'
  }
}
