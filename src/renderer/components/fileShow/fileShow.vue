<template>
    <div class="file-show" @mousedown="makeSureMouseDown($event)" ref="fileShow">
        <div class="file-inner">
            <file-item v-for="(item, index) in fileItems" 
                :fileNodeItem="item" :key="item.name"
                :index="index" ></file-item>
        </div>
        <right-click-menu :rightMenuData="rightMenuData"
                          v-if="rightMenuFlag" @fileRenameShow="fileRenameChange" @filePost="filePostToFileTree"
                          ></right-click-menu>
        <file-rename v-if="fileRenameFlag"></file-rename>
        <file-frame-text v-for="(item, index) in fileEditors" :key="item.id"
            v-bind:fileItem="item"
            v-bind:index="index"
            @changeChildrenText="changeChildrenContent">
            </file-frame-text>
        <file-property v-if="filePropertyFlag"></file-property>
    </div>
</template>

<script>
    import fileItem from '../fileItem/fileItem'
    import fileFrameText from '../fileFrame/fileText'
    import fileRename from '../fileFrame/fileRename'
    import rightClickMenu from '../rightClickMenu/rightClickMenu'
    import fileProperty from '../fileFrame/fileProperty'
    import store from '../../store/index'
    import {menuForWrapper} from '../../common/rightMenu'
    export default {
        name: 'file-show',
        data() {
            return {
                itemTotal: {},
                fileTree: Object,
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
                ],
                filePropertyFlag: false
            }
        },
        computed: {
            getCurrentPath() {
                return this.$store.state.msgOfCurrentPath
            },
            fileItems() {
                return this.$store.state.fileItems
            },
            rightMenuFlag() {
                return this.$store.state.rightClickMenuShow
            },
            fileRenameFlag() {
                return this.$store.state.fileRename.show
            },
            fileEditors() {
                return this.$store.state.fileEditors
            }
        },
        components: {
            fileItem: fileItem,
            fileFrameText: fileFrameText,
            fileRename: fileRename,
            rightClickMenu: rightClickMenu,
            fileProperty: fileProperty
        },
        methods: {
            senMsgToRightMenu(event) {
                this.rightMenuFlag = true
                this.currentEvent = event
            },
            makeSureMouseDown(event) {
                if (event.button === 2) { // 鼠标右击
                    // this.senMsgToRightMenu(event)
                    // store.commit('saveRightClickMenuPath', this.currentPath) // 用到vuex

                    // store.commit('setRightClickMenuShow', true)
                    // store.commit('setRightClickMenuPos', {
                    //     x: event.pageX,
                    //     y: event.pageY
                    // })
                    if (event.target.className === 'file-inner') {
                        menuForWrapper.popup()
                    }
                } else if (event.button === 0) { // 鼠标左击
                    if (store.state.rightClickMenuShow) {
                        store.commit('setRightClickMenuShow', false)
                    }
                }
            },
            fileRenameChange(flag, data) {
                if (flag) {
                    store.commit('setRightClickMenuShow', false)
                    store.commit('setFileRenameShow', true)
                    if (data) {
                        this.operateFile = data // 发送操作的数据 newFile-txt newFile-dir rename
                    }
                } else {
                    if (data) { // 注意这是没有按了确认键的操作
                        this.operateFileMethod(data)
                    }
                    store.commit('setRightClickMenuShow', false)
                    store.commit('setFileRenameShow', false)
                }
            },
            changeChildrenContent(text) {
                let arrayId = store.state.fileTextObj.arrayId
                this.fileTree.getPointNode(arrayId).content = text
                store.commit('saveTreeNodeArray', this.fileTree.treeNodeArray) // 赋值给FileTree,用到Vuex
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

