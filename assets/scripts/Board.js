// Learn cc.Class:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/class/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html

cc.Class({
    extends: cc.Component,

    properties: {
        cell: cc.Node
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
    },

    start() {
        this._initCells()
    },

    _initCells() {
        let coordinate = new Map()
        for (i = 0; i < 8; i++) {
            for (j = 0; j < 8; j++) {
                let item = cc.instantiate(this.cell)
                item.active = true
                let symbolMap = this.__setSymbol()
                const symbol = symbolMap.get(i)
                const coordinateSymbol = `symbol-${j+1}`
                const cellPosition = item.getPosition()
                this.node.addChild(item)
                coordinate.set(coordinateSymbol, cellPosition)
            }
        }
    },

    _setSymbol() {
        let symbolMap = new Map()
        let symbolArray = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
        for (i = 0; i < 8; i++) {
            symbolMap.set(i, symbolArray[i])
        }
        return symbolMap
    }

    // update (dt) {},
});
