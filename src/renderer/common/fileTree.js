/*
* 单一一个节点数据
* */
export class TreeNode {
    get size() {
        return this._size
    }

    set size(value) {
        this._size = value
    }

    get createTime() {
        return this._createTime
    }

    set createTime(value) {
        this._createTime = value
    }

    get fatNum() {
        return this._fatNum
    }

    get fileKind() {
        return this._fileKind
    }

    get parentNode() {
        return this._parentNode
    }

    get childNodeList() {
        return this._childNodeList
    }

    get content() {
        return this._content
    }

    get title() {
        return this._title
    }

    get arrayId() {
        return this._arrayId
    }

    set fatNum(value) {
        this._fatNum = value
    }

    set fileKind(value) {
        this._fileKind = value
    }

    set parentNode(value) {
        this._parentNode = value
    }

    set childNodeList(value) {
        this._childNodeList = value
    }

    set content(value) {
        this._content = value
    }

    set title(value) {
        this._title = value
    }

    set arrayId(value) {
        this._arrayId = value
    }

    constructor(fatNum, fileKind, parentNode, content, title, arrayId) {
        this._fatNum = fatNum
        this._fileKind = fileKind
        this._parentNode = parentNode
        this._childNodeList = []
        this._content = content
        this._title = title
        this._arrayId = arrayId
        this._createTime = CurrentTime()
        this._size = (fileKind === 'dir') ? '' : '2KB'
    }

    getTreeNode() {
        return {
            fatNum: this._fatNum,
            fileKind: this._fileKind,
            parentNode: this._parentNode,
            childNodeList: this._childNodeList,
            content: this._content,
            title: this._title,
            arrayId: this._arrayId,
            createTime: this._createTime,
            size: this._size
        }
    }
}

/*
* 文件树的生成
* */
export class FileTree {
    get treeNodeArray() {
        return this._treeNodeArray
    }

    set treeNodeArray(value) {
        this._treeNodeArray = value
    }

    constructor() {
        this._treeNodeArray = []
        this._initRootNode()
    }

    _initRootNode() {
        let rootNode = new TreeNode('1', 'dir', null, '', '', 0)
        this._treeNodeArray.push(rootNode.getTreeNode())
    }

    getParentNode(node) {
        return this._treeNodeArray[node.parentNode]
    }

    getPointNode(arrayId) {
        return this.treeNodeArray[arrayId]
    }

    getChildrenNodeList(arrayId) {
        let arrTem = this._treeNodeArray[arrayId].childNodeList
        let arrChild = []
        for (let item of arrTem) {
            arrChild.push(this._treeNodeArray[item])
        }
        return arrChild
    }

    deleteNodeList(node) {
        this._treeNodeArray[node.arrayId] = null
    }

    insertNode(node) {
        node.arrayId = this._treeNodeArray.length
        this._treeNodeArray.push(node.getTreeNode()) // 节点插入
        let pareNode = this.getParentNode(node)
        pareNode.childNodeList.push(node.arrayId)
    }

    copyTreeNode(treeNode) {
        let oneTreeNode = new TreeNode(treeNode.fatNum, treeNode.fileKind, treeNode.parentNode, treeNode.content, treeNode.title, this._treeNodeArray.length)
        return oneTreeNode
    }

    copyNode(parentArrayId, currentArrayId) {
        // 初始化父节点
        let pareNode = this.copyTreeNode(this._treeNodeArray[currentArrayId])
        pareNode.parentNode = parentArrayId
        let childNodeList = this._treeNodeArray[currentArrayId].childNodeList
        this.insertNode(pareNode)
        let copyErgodic = (childNodeList, pareNode) => {
            for (let i of childNodeList) {
                let oneTreeNode = this.copyTreeNode(this._treeNodeArray[i])
                if (this._treeNodeArray[i].childNodeList) {
                    copyErgodic(this._treeNodeArray[i].childNodeList, oneTreeNode)
                }
                oneTreeNode.parentNode = pareNode.arrayId
                this.insertNode(oneTreeNode)
            }
        }
        copyErgodic(childNodeList, pareNode)
        console.log(this._treeNodeArray)
    }

    getFileTreeDir() {
        let json = []
        let TreeNodeArray = this.treeNodeArray
        let ergodic = (i) => {
            let rootNode = TreeNodeArray[i]
            for (let index of rootNode.childNodeList) {
                {
                    let dataTemIn = {
                        title: TreeNodeArray[index].title,
                        kind: TreeNodeArray[index].fileKind,
                        id: TreeNodeArray[index].arrayId,
                        children: getChildNode(index)
                    }
                    json.push(dataTemIn)
                }
            }
        }
        let getChildNode = (i) => {
            let dataTemOut = []
            if (TreeNodeArray[i].childNodeList.length === 0) {
                return ''
            }
            for (let index of TreeNodeArray[i].childNodeList) {
                let dataTemIn = {
                    title: TreeNodeArray[index].title,
                    kind: TreeNodeArray[index].fileKind,
                    id: TreeNodeArray[index].arrayId,
                    children: getChildNode(index)
                }
                dataTemOut.push(dataTemIn)
            }
            return dataTemOut
        }
        ergodic(0)
        console.log(json)
    }
}

/*
* 获取当前节点创建时间
* */
const CurrentTime = function () {
    let now = new Date()
    let year = now.getFullYear()
    let month = now.getMonth() + 1
    let day = now.getDate()
    let hh = now.getHours()
    let mm = now.getMinutes()
    let clock = year + '-'

    if (month < 10) {
        clock += '0'
    }

    clock += month + '-'

    if (day < 10) {
        clock += '0'
    }

    clock += day + ' '

    if (hh < 10) {
        clock += '0'
    }

    clock += hh + ':'
    if (mm < 10) clock += '0'
    clock += mm
    return clock
}

export const initFileTree = function (FileTree) {
    let fileTree = FileTree
    let TreeNode1 = new TreeNode(2, 'dir', 0, '1', 'work', 1)
    let TreeNode2 = new TreeNode(2, 'dir', 0, '2', '360', 2)
    let TreeNode3 = new TreeNode(2, 'dir', 0, '3', 'download', 3)
    let TreeNode4 = new TreeNode(2, 'txt', 0, '4', 'qq', 4)
    let TreeNode5 = new TreeNode(2, 'txt', 0, '5', 'note', 5)
    let TreeNode6 = new TreeNode(2, 'dir', 2, '6', 'program', 6)
    let TreeNode7 = new TreeNode(2, 'dir', 3, '7', 'software', 7)
    let TreeNode8 = new TreeNode(2, 'txt', 3, '8', 'learn', 8)
    let TreeNode9 = new TreeNode(2, 'txt', 7, '9', 'wechat', 9)
    fileTree.insertNode(TreeNode1)
    fileTree.insertNode(TreeNode2)
    fileTree.insertNode(TreeNode3)
    fileTree.insertNode(TreeNode4)
    fileTree.insertNode(TreeNode5)
    fileTree.insertNode(TreeNode6)
    fileTree.insertNode(TreeNode7)
    fileTree.insertNode(TreeNode8)
    fileTree.insertNode(TreeNode9)
}
