class Role {
    constructor(self) {
        this.self = self
    }

    _changeCoordinate(x, y, i, j) {
        x += i
        y += j
        if (!this._checkInsideBoard(x, y)) return null
        let coordinateItem = this.board.coordinateItems[x][y]
        let chosenItem = this.board.chosenItem
        if (this._checkNotDuplicateTeam(chosenItem, coordinateItem))
            return [x, y]
        else
            return null
    },

    _checkInsideBoard(i, j) {
        return i >= 0 && i <= 7 && j >= 0 && j <= 7
    },

    _checkNotDuplicateTeam(item1, item2) {
        let isValid = true
        if (item2 && item1.team === item2.team) isValid = false
        return isValid
    }
}

export default Role