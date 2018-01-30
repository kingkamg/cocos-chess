import Role from 'Role'
class Xe extends Role{
    constructor() {
        this.self = super.self
    }

    _getHighLightCoordinates() {
        let self = this.self
        let {_x: x, _y: y} = self
        for (let i = -1; i < 2; i++) {
            for (let j = -1; j < 2; j++) {
                if (i * j != 0 || i + j === 0) continue
                let item = this._changeCoordinate(x, y, i, j)
                item && self.board.highlightCoordinates.push(item)
            }
        }

    },
}