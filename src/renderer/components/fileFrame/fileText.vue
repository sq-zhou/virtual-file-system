<template>
    <div class="add-file-frame">
        <div class="file-model">
            <div class="title">
                <span>{{ title }}</span>
                <span class="close fa fa-window-close" @click="modelClose()"></span>
            </div>
            <div class="operation">
                <!-- <i class="fa fa-files-o"></i> -->
                <i class="fa fa-save" @click="saveText" title="保存"></i>
            </div>
            <div class="content">
                <textarea class="content-text" 
                contenteditable="true" 
                ref="contentText" v-model="contentBuffer">
                </textarea>
            </div>
        </div>
        <div class="file-fade"></div>
    </div>
</template>

<script>
    import * as path from 'path'

    export default {
        name: 'add-file-frame',
        props: ['fileItem', 'index'],
        data() {
            return {
                contentBuffer: ''
            }
        },
        computed: {
            getFileTextFlag() {
                return this.$store.state.fileTextFlag
            },
            title() {
                return path.posix.basename(this.fileItem.path)
            }
        },
        created() {
            this.contentBuffer = this.fileItem.content
        },
        methods: {
            modelClose() {
                this.$store.commit('removeFileEditorById', this.index)
            },
            saveText() {
                this.$store.commit('setFileEditorContentById', this.index, this.contentBuffer)
                this.$store.dispatch('saveFileEditorToFile', {
                    path: this.fileItem.path,
                    content: this.contentBuffer
                })
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
    .file-model
        position: fixed
        top: 50%
        left: 50%
        width: 50%
        max-width: 630px
        min-width: 320px
        height: auto
        z-index: 2000
        visibility: visible
        backface-visibility: visible
        transform: translateX(-50%) translateY(-50%)
        background #ffffff
        box-shadow: 0 0 6px 2px #0bb0e6
        border 1px solid #ffffff
        .title
            position relative
            padding: 5px 0 5px 8px
            font-size: 14px
            color: white
            background: #0bb0e6
            .close
                position: absolute
                top: 5px
                right: 8px
                font-size: 15px
                color: #ffffff
                cursor: pointer
        .operation
            padding 5px 0 5px 8px
            i
                margin: 0 10px
                font-size: 19px
            i:nth-child(1)
                margin: 0
        .content
            position: relative
            width: 100%;
            height: 230px
            overflow: hidden
            .content-text
                position: absolute
                left: 0
                right: 0
                top: 0
                overflow-y: scroll
                overflow-x: hidden
                z-index: 11
                padding: 0 0 0 5px
                height: 230px
                outline: none
                border: 0
                resize: none
                font-size: 14px
            .content-text::-webkit-scrollbar
                height: 10px
                width: 10px
                background-color: #cdc2cb
</style>