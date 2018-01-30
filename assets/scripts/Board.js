// Learn cc.Class:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/class/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html

import Model from './Model'

cc.Class({
    extends: cc.Component,

    properties: {
        cell: cc.Node,
        item: cc.Node,
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.coordinateCell = []
        this.coordinateItems = []
        this.highlightCoordinates = []
        this.isReadyToMove = false
        this.chosenItem = null
        this.isWhiteTurn = true
        this._initCells()
    },

    start() {
        setTimeout(() => {
            this._initItem()
        }, 600);
    },

    _initCells() {
        let count = 0
        for (let i = 0; i < 8; i++) {
            this.coordinateCell[i] = new Array()
            for (let j = 0; j < 8; j++) {
                count++
                let item = cc.instantiate(this.cell)
                this.node.addChild(item)
                item.active = true
                // const coordinateUnit = [i, j]
                let cell = item.getComponent('Cell')
                cell._x = i
                cell._y = j
                const { getSymbol } = Model
                cell.coordinateSymbol = getSymbol(i, j)
                setTimeout(() => {
                    this.coordinateCell[i][j] = cell
                }, 500)

                // coordinateCell.set(coordinateUnit, item)
            }
        }
        console.log('count======', count)
        // this.node.getComponent(cc.Layout).destroy()
    },

    _initItem() {
        this.node.getComponent(cc.Layout).destroy()
        const { coordinateItemModel, itemTypeMap } = Model
        for (let i = 0; i < 8; i++) {
            this.coordinateItems[i] = new Array()
            for (let j = 0; j < 8; j++) {
                this.coordinateItems[i][j] = null
            }
        }
        for (let iteratorItem of coordinateItemModel) {
            let { coordinate, type, team } = iteratorItem
            const { i, j } = coordinate

            let chessItem = cc.instantiate(this.item)
            chessItem.active = true
            this.node.addChild(chessItem)
            const position = this.coordinateCell[i][j].node.getPosition()
            chessItem.setPosition(position)
            let item = chessItem.getComponent('Item')
            const spriteName = `${itemTypeMap.get(type)}-${team}`
            item.setSpriteFrame(spriteName)
            item._x = i
            item._y = j
            item.type = type
            item.team = team
            setTimeout(() => {
                this.coordinateItems[i][j] = item
            }, 200);
        }
    },

    moveItem(x, y) {
        let position = this.coordinateCell[x][y].node.getPosition()
        let { chosenItem } = this
        chosenItem.node.runAction(cc.moveTo(0.2, position))
        let oldX = chosenItem._x
        let oldY = chosenItem._y
        chosenItem._x = x
        chosenItem._y = y
        this.coordinateItems[oldX][oldY] = null
        if(this.coordinateItems[x][y]) {
            this.node.removeChild(this.coordinateItems[x][y].node)
        }
        this.coordinateItems[x][y] = chosenItem

        this.toggleHighlightMove(false)
        this.changeTurn()
    },

    handleInvalidMove() {
        this.toggleHighlightMove(false)
    },

    toggleHighlightMove(isEnable) {
        let coordinateCell = this.coordinateCell
        this.highlightCoordinates.forEach(point => {
            let [i, j] = point
            if (coordinateCell[i][j]) coordinateCell[i][j].highlightNode.active = isEnable
        })
        this.isReadyToMove = isEnable
        if (!isEnable) {
            this.highlightCoordinates = []
        }

    },

    changeTurn() {
        this.isWhiteTurn = !this.isWhiteTurn
    },

    checkMovable(i, j) {
        let isValid = false
        let coordinateToMove = this.highlightCoordinates.filter(position =>
            position[0] == i && position[1] == j
        )
        if(coordinateToMove[0]) isValid = true
        return isValid
    }

    // update (dt) {},
});
