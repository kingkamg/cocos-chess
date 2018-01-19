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
        let { _x, _y } = this
        this._getHighLightCoordinates(_x, _y)
        this.board.highlightMove()
    },

    _getHighLightCoordinates(x, y) {
        for (let i = -1; i < 2; i++) {
            for (let j = -1; j < 2; j++) {
                if (i * j != 0 || i + j === 0) continue
                let item = this._changeCoordinate(x, y, i, j)
                this.board.highlightCoordinates.push(item)
            }
        }
    },

    _changeCoordinate(x, y, i, j) {
        return [x + i, y + j]
    }


    // update (dt) {},
});
