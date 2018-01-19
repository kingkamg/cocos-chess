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
        this.coordinateItem = []
        this.highlightCoordinates = []
        this._initCells()
    },

    start() {
        setTimeout(() => {
            // this._initItem()
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
                const { getSymbol } = Model
                cell.coordinateSymbol = getSymbol(i, j)
                setTimeout(() => {
                    this.coordinateCell[i][j] = cell
                }, 500)

                // coordinateCell.set(coordinateUnit, item)
            }
        }
        console.log('count======',count)
        // this.node.getComponent(cc.Layout).destroy()
    },

    _initItem() {
        this.node.getComponent(cc.Layout).destroy()
        const { coordinateItemModel, itemTypeMap } = Model
        for (let i = 0; i < 8; i++) {
            this.coordinateItem[i] = new Array()
            for (let j = 0; j < 8; j++) {
                this.coordinateItem[i][j] = null
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
                this.coordinateItem[i][j] = item
            }, 200);
        }
    },

    highlightMove() {
        let coordinateCell = this.coordinateCell
        this.highlightCoordinates.forEach(point => {
            let i = point[0]
            let j = point[1]
            coordinateCell[i][j].highlightNode.active = true
        })
    }

    // update (dt) {},
});
