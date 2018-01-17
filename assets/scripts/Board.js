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
        this.coordinateCell = null
        this.coordinateItem = null
    },

    start() {
        this._initCells()
        this._initItem()
    },

    _initCells() {
        let coordinateCell = new Map()
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                let item = cc.instantiate(this.cell)
                item.active = true
                this.node.addChild(item)
                const {symbolMap} = Model
                const symbol = symbolMap.get(i)
                const coordinateUnit = [i, j]
                const coordinateSymbol = `${symbol}-${j + 1}`
                let cell = item.getComponent('Cell')
                cell.coordinateSymbol = coordinateSymbol
                coordinateCell.set(coordinateUnit, item)
            }
        }
        this.node.getComponent(cc.Layout).destroy()
        this.coordinateCell = coordinateCell
    },

    _initItem() {
        const {coordinateItemModel, itemTypeMap} = Model
        for (let [coordinate, itemProp] of coordinateItemModel.entries()) {
            let {type, team} = itemProp
            let chessItem = cc.instantiate(this.item)
            const position = this.coordinateCell.get(coordinate).getPosition()
            chessItem.setPosition(position)
            let item = chessItem.getComponent('Item')
            const spriteName = `${itemTypeMap.get(type)}-${team}`
            item.setSpriteFrame(spriteName)
            item.type = type
            item.team = team
            
        }
    }

    // update (dt) {},
});
