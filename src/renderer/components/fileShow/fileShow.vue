<template>
    <div class="file-show" @mousedown="makeSureMouseDown($event)">
        <div class="file-inner">
            <div class="file-intro">
                <div class="name"><span>名称</span></div>
                <div class="time"><span>修改时间</span></div>
                <div class="size"><span>大小</span></div>
            </div>
            <file-item v-for="item in fileItems" :fileNodeItem="item" :key="item.name"
                       @fileRenameShow="fileRenameChange" @showByFileItemPath="showByCurrentPath"
                       @filePost="filePostToFileTree"></file-item>
        </div>
        <right-click-menu :currentPath="currentPath" :currentEvent="currentEvent" :rightMenuData="rightMenuData"
                          v-if="rightMenuFlag" @fileRenameShow="fileRenameChange" @filePost="filePostToFileTree"
                          @rightMenuFade="setRightClickFade"></right-click-menu>
        <file-rename v-if="fileRenameFlag" @fileRenameShow="fileRenameChange"
                     :operateFileKind="operateFile"></file-rename>
        <file-frame-text @changeChildrenText="changeChildrenContent"></file-frame-text>
    </div>
</template>

<script>
    import fileItem from '../fileItem/fileItem'
    import fileFrameText from '../fileFrame/fileText'
    import fileRename from '../fileFrame/fileRename'
    import rightClickMenu from '../rightClickMenu/rightClickMenu'
    import store from '../../store/index'

    export default {
        name: 'file-show',
        data() {
            return {
                itemTotal: {},
                fileTree: Object,
                rightMenuFlag: false,
                fileRenameFlag: false,
                operateFile: '',
                currentPath: '',
                currentEvent: null,
                rightMenuData: [
                    {
                        kind: 'newFile-txt',
                        name: '新建文本'
                    },
                    {
                        kind: 'newFile-dir',
                        name: '新建文件夹'
                    },
                    {
                        kind: 'post',
                        name: '粘贴'
                    }
                ]
            }
        },
        computed: {
            getCurrentPath() {
                return this.$store.state.msgOfCurrentPath
            },
            fileItems() {
                return this.$store.state.fileItems
            }
        },
        components: {
            fileItem: fileItem,
            fileFrameText: fileFrameText,
            fileRename: fileRename,
            rightClickMenu: rightClickMenu
        },
        methods: {
            senMsgToRightMenu(event) {
                this.rightMenuFlag = true
                this.currentEvent = event
            },
            makeSureMouseDown(event) {
                if (event.button === 2) { // 鼠标右击
                    this.senMsgToRightMenu(event)
                    store.commit('saveRightClickMenuPath', this.currentPath) // 用到vuex
                } else if (event.button === 0) { // 鼠标左击
                    store.commit('saveRightClickMenuPath', '') // 用到vuex
                    if (this.rightMenuFlag) {
                        this.rightMenuFlag = false
                    }
                }
            },
            fileRenameChange(flag, data) {
                if (flag) {
                    this.rightMenuFlag = false
                    this.fileRenameFlag = true
                    if (data) {
                        this.operateFile = data // 发送操作的数据 newFile-txt newFile-dir rename
                    }
                } else {
                    if (data) { // 注意这是没有按了确认键的操作
                        this.operateFileMethod(data)
                    }
                    this.rightMenuFlag = false
                    this.fileRenameFlag = false
                }
            },
            showByCurrentPath(arrayId) {
                store.commit('saveMsgToCurrentPath', arrayId) // 先赋值后运算,用到Vuex
                this.currentPath = arrayId
                this.itemTotal = this.fileTree.getChildrenNodeList(arrayId)
            },
            operateFileMethod(data) {
                if (this.operateFile === 'newFile-txt') {
                    let showPath = store.state.path
                    let filePath = showPath
                    if (showPath === '/') {
                        filePath += data
                    } else {
                        filePath += '/' + data
                    }
                    store.dispatch('newFile', {showPath, filePath})
                } else if (this.operateFile === 'newFile-dir') {
                    let showPath = store.state.path
                    let dirPath = showPath
                    if (showPath === '/') {
                        dirPath += data
                    } else {
                        dirPath += '/' + data
                    }
                    store.dispatch('createDir', {showPath, dirPath})
                } else if (this.operateFile === 'rename') {
                    let arrayId = store.state.rightClickMenuPath
                    this.fileTree.renameNode(arrayId, data)
                    this.itemTotal = this.fileTree.getChildrenNodeList(this.currentPath)
                    store.commit('saveTreeNodeArray', this.fileTree.treeNodeArray) // 赋值给FileTree,用到Vuex
                    store.commit('saveRightClickMenuPath', '') // 用到vuex
                }
            },
            setRightClickFade(flag) {
                if (flag) {
                    this.rightMenuFlag = false
                }
            },
            changeChildrenContent(text) {
                let arrayId = store.state.fileTextObj.arrayId
                this.fileTree.getPointNode(arrayId).content = text
                store.commit('saveTreeNodeArray', this.fileTree.treeNodeArray) // 赋值给FileTree,用到Vuex
            },
            filePostToFileTree() {
                let fileOperate = store.state.fileOperate
                if (fileOperate.operateKind === 'copy') {
                    this.fileTree.copyNode(this.currentPath, fileOperate.path)
                } else if (fileOperate.operateKind === 'cut') {
                    this.fileTree.cutNode(this.currentPath, fileOperate.path)
                } else if (fileOperate.operateKind === 'delete') {
                    this.fileTree.deleteNode(fileOperate.path)
                } else if (fileOperate.operateKind === 'rename') {
                    console.log('rename')
                    this.fileTree.renameNode()
                }
                this.itemTotal = this.fileTree.getChildrenNodeList(this.currentPath)
                store.commit('saveTreeNodeArray', this.fileTree.treeNodeArray) // 赋值给FileTree,用到Vuex
            }
        },
        created() {
            this.currentPath = 0
            this.itemTotal = this.fileTree.getChildrenNodeList(0)
            store.commit('saveTreeNodeArray', this.fileTree.treeNodeArray) // 赋值给FileTree,用到Vuex
        },
        watch: {
            getCurrentPath(arrayId) {
                this.currentPath = arrayId
                this.itemTotal = this.fileTree.getChildrenNodeList(arrayId)
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
    .file-show
        position: absolute
        top: 30px
        border: 0
        bottom: 0
        right: 310px
        left: 0
        overflow: auto
        .file-inner
            width: 100%
            min-width: 700px;
            height: 100%
            display: flex
            flex-flow: row wrap
            align-content: flex-start
            .file-intro
                height: 30px
                line-height: 30px
                font-size: 14px
                .name
                    display: inline-block
                    width: 340px
                    span
                        margin: 0 0 0 15px
                .time
                    display: inline-block
                    width: 160px
                    text-align: left
                    span
                        margin: 0 0 0 5px
                .size
                    display: inline-block
                    width: 175px
                    text-align: right

</style>

