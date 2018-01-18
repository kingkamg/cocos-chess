const getSymbolMap = () => {
    let symbolMap = new Map()
    let symbolArray = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
    for (let i = 0; i < 8; i++) {
        symbolMap.set(i, symbolArray[i])
    }
    return symbolMap
}

const itemTypeMap = new Map([[1, 'xe'], [2, 'ma'], [3, 'tinh'], [4, 'hau'], [5, 'tuong'], [6, 'tot']])
const arrangement = [1, 2, 3, 4, 5, 3, 2, 1]

const getCoordinateItemModel = () => {
    let coordinateItemModel = new Array()
    for (let i = 0; i < 8; i++) {
        const itemTypeBlack = arrangement[i]
        const itemTypeWhite = arrangement.slice().reverse()[i]
        coordinateItemModel.push(
            {
                coordinate: {
                    i, j: 0,
                },
                type: itemTypeBlack,
                team: 'den'
            }
        )
        coordinateItemModel.push(
            {
                coordinate: {
                    i, j: 1,
                },
                type: 6,
                team: 'den'
            }
        )
        coordinateItemModel.push(
            {
                coordinate: {
                    i, j: 6,
                },
                type: 6,
                team: 'trang'
            }
        )
        coordinateItemModel.push(
            {
                coordinate: {
                    i, j: 7,
                },
                type: itemTypeWhite,
                team: 'trang'
            }
        )
    }
    return coordinateItemModel
}

const getSymbol = (i, j) => {
    const symbol = getSymbolMap().get(j)
    const coordinateSymbol = `${symbol}-${i + 1}`
}

const Model = {
    getSymbol,
    coordinateItemModel: getCoordinateItemModel(),
    itemTypeMap
}

export default Model