import Xe from './Roles/Xe'

const getSymbolMap = () => {
    let symbolMap = new Map()
    let symbolArray = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
    for (let i = 0; i < 8; i++) {
        symbolMap.set(i, symbolArray[i])
    }
    return symbolMap
}

const itemTypeMap = new Map([[1, 'xe'], [2, 'ma'], [3, 'tinh'], [4, 'hau'], [5, 'tuong'], [6, 'tot'], [7, 'tot']])
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
                type: 7,
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

const getRole = (itemSelf) => {
    const {type, team} = itemSelf
    switch (type) {
        case 1:
            return new Xe(itemSelf)
        case 2:
            return 
        case 3:
            return 
        case 4:
            return 
        case 5:
            return 
        case 6:
            return 
        case 7:
            return 
    }
}

const Model = {
    getSymbol,
    coordinateItemModel: getCoordinateItemModel(),
    itemTypeMap,

}

export default Model