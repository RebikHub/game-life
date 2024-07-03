'use strict'

import { Utils } from './utils'

export class Board {
  constructor (input) {
    this.board = document.querySelector('.board')
    this.input = input
    this.size = this.input.defaultValue
    this.map = new Map()
    this.renderBoard()
  }

  static clearLifeCells () {
    const lifes = document.querySelectorAll('.life')
    lifes.forEach(life => life.classList.remove('life'))
  }

  createCells (cells) {
    Board.clearLifeCells()
    for (let i = 0; i < cells; i += 1) {
      const x = Utils.randomMinMax(1, +this.size)
      const y = Utils.randomMinMax(1, +this.size)
      const cell = this.map.get(`${x},${y}`)
      cell.classList.add('life')
    }
  }

  updateSize () {
    this.size = this.input.value
    this.renderBoard()
  }

  renderBoard () {
    this.map.clear()
    const size = +this.size
    this.board.innerHTML = ''
    const fragment = document.createDocumentFragment()

    for (let i = 0; i < size; i += 1) {
      const div = document.createElement('div')
      div.className = 'line'

      for (let j = 0; j < size; j += 1) {
        const cell = document.createElement('span')
        cell.className = 'cell'
        cell.dataset.x = `${j + 1}`
        cell.dataset.y = `${i + 1}`
        div.append(cell)
        this.map.set(`${j + 1},${i + 1}`, cell)
      }

      fragment.append(div)
    }
    this.board.append(fragment)
  }
}
