/*
* fat分配表类
* */
export class fatTable {
    get tableList() {
        return this._tableList
    }

    set tableList(value) {
        this._tableList = value
    }

    constructor() {
        this._tableList = []
    }

    _init() {
        for (let item of 127) {
            this._tableList.push({
                fatTableId: item,
                arrayIdOfTreeNode: '',
                isEmpty: true
            })
        }
    }

    assign(arrayIdOfTreeNode) {
        for (let i of this._tableList) {
            if (this._tableList[i].isEmpty && this._tableList[i].fatTableId === arrayIdOfTreeNode) {
                this._tableList[i].arrayIdOfTreeNode = arrayIdOfTreeNode
            }
        }
    }

    removeOneNode(arrayIdOfTreeNode) {
        for (let i of this._tableList) {
            if (this._tableList[i].arrayIdOfTreeNode === arrayIdOfTreeNode) {
                this._tableList[i].arrayIdOfTreeNode = ''
                this._tableList[i].isEmpty = false
            }
        }
    }
}
