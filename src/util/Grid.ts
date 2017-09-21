import { Scene, Mesh } from 'three'
export default class Grid {
  selectedCell: GridCell | undefined
  constructor (private cells: Array<Array<GridCell>>) {}

  static empty (height: number, width: number): Grid {
    let grid = Array.from(new Array(height), (_, row) => Array.from(new Array(width), (_, col) => new GridCell(row, col)))
    return new Grid(grid)
  }

  getCell (row: number, col: number): GridCell {
    return this.cells[row][col]
  }

  selectCell (row: number, col: number) {
    this.selectedCell = this.cells[row][col]
  }

  unselectCell () {
    this.selectedCell = undefined
  }

  addToScene (scene: Scene) {
    for (let cell of this) {
      if (cell.mesh) {
        scene.add(cell.mesh)
      }
    }
  }

  *[Symbol.iterator] (): IterableIterator<GridCell> {
    for (let row of this.cells) {
      for (let cell of row) {
        yield cell
      }
    }
  }
}

export class GridCell {
  mesh: Mesh | null = null
  constructor (public row: number, public col: number, public selected: boolean = false) {}
}
