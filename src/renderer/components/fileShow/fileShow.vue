<template>
    <div class="file-show" @mousedown="makeSureMouseDown($event)" ref="fileShow">
        <div class="file-inner">
            <file-item v-for="(item, index) in fileItems" 
                :fileNodeItem="item" :key="item.name"
                :index="index" ></file-item>
        </div>
        <file-rename v-if="fileRenameFlag"></file-rename>
        <file-frame-text v-for="(item, index) in fileEditors" :key="item.id"
            v-bind:fileItem="item"
            v-bind:index="index">
            </file-frame-text>
        <file-property v-for="(fp, index) in fileProperties" 
            :fp="fp" :index="index" :key="index"></file-property>
    </div>
</template>

<script>
    import fileItem from '../fileItem/fileItem'
    import fileFrameText from '../fileFrame/fileText'
    import fileRename from '../fileFrame/fileRename'
    import fileProperty from '../fileFrame/fileProperty'
    import {copyFile, cutFile, pasteFile, deleteFile, newFile, newDir} from '../../common/operateFile'
    import store from '../../store/index'
    import * as path from 'path'
    const ipc = require('electron').ipcRenderer
    export default {
        name: 'file-show',
        data() {
            return {
                itemTotal: {},
                fileTree: Object,
                operateFile: '',
                currentPath: '',
                currentEvent: null,
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
            },
            fileProperties() {
                return this.$store.state.fileProperties
            }
        },
        components: {
            fileItem: fileItem,
            fileFrameText: fileFrameText,
            fileRename: fileRename,
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
                        ipc.send('menuForWrapper')
                    }
                } else if (event.button === 0) { // 鼠标左击
                    if (store.state.rightClickMenuShow) {
                        store.commit('setRightClickMenuShow', false)
                    }
                }
            }
        },
        created() {
            ipc.on('cutFile', function() {
               cutFile()
            })
            ipc.on('copyFile', function() {
               copyFile()
            })
            ipc.on('deleteFile', function() {
               deleteFile()
            })
            ipc.on('pasteFile', function() {
               pasteFile()
            })
            ipc.on('newFile', function() {
               newFile()
            })
            ipc.on('newDir', function() {
               newDir()
            })
            ipc.on('fileProperty', function () {
                let selectedIndex = store.state.selectedIndex
                if (selectedIndex > -1) {
                    let item = store.state.fileItems[selectedIndex]
                    let _path = path.posix.join(store.state.path, item.name)
                    store.dispatch('showFileProperty', _path)
                }
            })
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

