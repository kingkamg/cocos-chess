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
        chessAtlas: cc.SpriteAtlas,
        chessSprite: cc.Sprite,
        boardNode: cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.board = this.boardNode.getComponent('Board')
    },

    start() {
    },

    setSpriteFrame(spriteName) {
        this.chessSprite.spriteFrame = this.chessAtlas.getSpriteFrame(spriteName)
    },

    onItemClicked() {
        this.board.toggleHighlightMove(false)
        let { _x, _y } = this
        // this._refreshHighlight()
        this.board.chosenItem = this
        this.board.isReadyToMove = true
        this._getHighLightCoordinates(_x, _y)
        this.board.toggleHighlightMove(true)
    },

    _getHighLightCoordinates(x, y) {
        for (let i = -1; i < 2; i++) {
            for (let j = -1; j < 2; j++) {
                if (i * j != 0 || i + j === 0) continue
                let item = this._changeCoordinate(x, y, i, j)
                item && this.board.highlightCoordinates.push(item)
            }
        }
    },

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
        if(item2 && item1.team === item2.team) isValid = false
        return isValid
    }


    // update (dt) {},
});
