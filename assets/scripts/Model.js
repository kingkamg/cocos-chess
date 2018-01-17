const getSymbolMap = () => {
    let symbolMap = new Map()
    let symbolArray = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
    for (let i = 0; i < 8; i++) {
        symbolMap.set(i, symbolArray[i])
    }
    return symbolMap
}

const itemTypeMap = new Map([[1, 'xe'], [2, 'ma'], [3, 'tinh'], [4, 'hau'], [5, 'vua'], [6, 'tot']])
const arrangement = [1, 2, 3, 4, 5, 3, 2, 1]

const getCoordinateItemModel = () => {
    let coordinateItemModel = new Map()
    for (let i = 0; i < 8; i++) {
        const itemTypeBlack = arrangement[i]
        const itemTypeWhite = arrangement.slice().reverse()[i]
        coordinateItemModel.set(
            [i, 0],
            {
                type: itemTypeBlack,
                team: 'den'
            }
        )
        coordinateItemModel.set(
            [i, 1],
            {
                type: 'tot',
                team: 'den'
            }
        )
        coordinateItemModel.set(
            [i, 6],
            {
                type: itemTypeWhite,
                team: 'trang'
            }
        )
        coordinateItemModel.set(
            [i, 7],
            {
                type: 'tot',
                team: 'trang'
            }
        )
    }
    return coordinateItemModel
}

const Model = {
    symbolMap: getSymbolMap(),
    coordinateItemModel: getCoordinateItemModel(),
    itemTypeMap
}

export default Model