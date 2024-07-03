'use strict'

export class Utils {
  static getTime (ms) {
    const min = Math.floor(ms / 60000)
    const sec = Math.floor((ms % 60000) / 1000)
    return `${min < 10 ? '0' : ''}${min}:${sec < 10 ? '0' : ''}${sec}`
  }

  static randomSizeCells () {
    return Math.round(Math.random() * 100)
  }

  static randomMinMax (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  static getCellsOfPercent (size, percent) {
    return Math.round(((size * size) / 100) * percent)
  }

  static getPercentOfLifes (size, lifes) {
    return Math.round((lifes / (size * size)) * 100)
  }

  static getMinus (number, max) {
    return number - 1 === 0 ? max : number - 1
  }

  static getSum (number, max) {
    return number + 1 === max + 1 ? 1 : number + 1
  }
}
