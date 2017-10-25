<template>
    <div class="fileRename" @mousedown.stop="clickStop">
        <div class="model-normal">
            <div class="model-normal-header">
                <a class="model-name">文件名</a>
                <div class="model-close"><i class="fa fa-close"></i></div>
            </div>
            <div class="model-normal-middle">
                <input placeholder="名字" ref="inputValue">
            </div>
            <div class="model-normal-bottom">
                <div class="model-right-send">
                    <span class="cancel-open" @click="cancel">取消</span>
                    <span class="shareAdd-sure-send" @click="sureSend">确认</span>
                </div>
            </div>
        </div>
        <div class="model-normal-wrapper"></div>
    </div>
</template>

<script>
    const path = require('path')

    export default {
        name: 'fileRename',
        data() {
            return {}
        },
        computed: {},
        methods: {
            sureSend() {
                // this.$emit('fileRenameShow', false, this.$refs.inputValue.value)
                this.$emit('setFileRenameValue', this.$refs.inputValue.value)
                this.$store.commit('setFileRenameValue', this.$refs.inputValue.value)
                this.$store.commit('setFileRenameShow', false)
                let data = this.$refs.inputValue.value
                let kind = this.$store.state.kind

                if (kind === 'newFile') {
                    let showPath = this.$store.state.path
                    let filePath = path.posix.join(showPath, data)
                    this.$store.dispatch('newFile', {showPath, filePath})
                } else if (kind === 'newDir') {
                    let showPath = this.$store.state.path
                    let dirPath = path.posix.join(showPath, data)
                    this.$store.dispatch('createDir', {showPath, dirPath})
                } else if (this.operateFile === 'rename') {
                    // let arrayId = this.$store.state.rightClickMenuPath
                    // this.fileTree.renameNode(arrayId, data)
                    // this.itemTotal = this.fileTree.getChildrenNodeList(this.currentPath)
                    // store.commit('saveTreeNodeArray', this.fileTree.treeNodeArray) // 赋值给FileTree,用到Vuex
                    // store.commit('saveRightClickMenuPath', '') // 用到vuex
                }
            },
            cancel() {
                // this.$emit('fileRenameShow', false)
                this.$store.commit('setFileRenameShow', false)
                this.$refs.inputValue.value = ''
            },
            clickStop() {
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
    .model-normal
        position: fixed
        top: 50%
        left: 50%
        margin-top: -68px
        margin-left: -150px
        width: 300px
        height: 136px
        z-index: 1000
        border-radius: 2px
        background: #ffffff
        transition: 0.2s all linear
        .model-normal-header
            position: relative
            padding: 15px 20px 13px 20px
            font-size: 15px
            .model-close
                position: absolute
                right: 20px
                top: 13px
        .model-normal-middle
            overflow: hidden
            text-align: center
            input, input:focus
                width: 80%
                margin: 0 auto
                padding: 3px 6px
                height: 27px
                font-size: 15px
                border: 1px solid #96d8fc
        .model-normal-bottom
            .model-right-send
                margin: 15px 20px 0 0
                float: right
                font-size: 15px
                .shareAdd-sure-send
                    cursor: pointer
                .cancel-open
                    margin: 15px 15px 0 0
                    cursor: pointer

    .model-normal-wrapper
        position: fixed
        top: 0
        left: 0
        width: 100%
        height: 100%
        z-index: 800
        background: #4b4149
        opacity: 0.3
</style>

