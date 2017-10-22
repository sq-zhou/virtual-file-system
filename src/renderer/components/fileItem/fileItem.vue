<template>
    <div class="file-item" @mousedown.stop="mouseRightClick($event)">
        <div class="logo">
            <i :class="setLogoClass"></i>
        </div>
        <div class="name"><span>{{ fileNodeItem.name }}</span></div>
        <div class="time"><span>{{ fileNodeItem.created_time }}</span></div>
        <div class="size"><span>{{ fileNodeItem.size}}</span></div>
        <right-click-menu :currentPath="fileNodeItem.arrayId" :currentEvent="currentEventToRightMenu" @fileRenameShow="fileRenameToFileShow"
                          :rightMenuData="rightMenuData" @rightMenuFade="setRightClickFade" @filePost="filePostToFileShow"
                          v-if="rightMenuFlag"></right-click-menu>
    </div>
</template>

<script>
    import rightClickMenu from '../rightClickMenu/rightClickMenu'
    import store from '../../store/index'

    export default {
        name: 'file-item',
        props: {
            fileNodeItem: {
                type: Object
            }
        },
        components: {
            rightClickMenu: rightClickMenu
        },
        data() {
            return {
                logoClass: 'fa fa-file',
                currentEventToRightMenu: null,
                rightMenuFlag: false,
                rightMenuData: [
                    {
                        kind: 'open',
                        name: '打开'
                    },
                    {
                        kind: 'copy',
                        name: '复制'
                    },
                    {
                        kind: 'cut',
                        name: '剪切'
                    },
                    {
                        kind: 'post',
                        name: '粘贴'
                    },
                    {
                        kind: 'delete',
                        name: '删除'
                    },
                    {
                        kind: 'rename',
                        name: '重命名'
                    },
                    {
                        kind: 'newFile-txt',
                        name: '新建文本'
                    },
                    {
                        kind: 'newFile-file',
                        name: '新建文件夹'
                    }
                ]
            }
        },
        computed: {
            /*  在节点渲染完成后执行 */
            setLogoClass() {
                if (this.fileNodeItem.fileKind === 'dir') {
                    this.logoClass = 'fa fa-file'
                } else {
                    this.logoClass = 'fa fa-file-text-o'
                }
                return this.logoClass
            }
        },
        methods: {
            addNewFile() {
            },
            senMsgToRightMenu(event) {
                this.rightMenuFlag = true
                this.currentEventToRightMenu = event
            },
            /*  文件点击事件:鼠标右击，鼠标左击 */
            mouseRightClick(event) {
                // let path = this.fileNodeItem.appId
                if (event.button === 2) { // 鼠标右击
                    this.senMsgToRightMenu(event)
                    store.commit('saveRightClickMenuPath', this.fileNodeItem.arrayId) // 用到vuex
                } else if (event.button === 0) { // 鼠标左击
                    if (this.rightMenuFlag === true) {
                        this.rightMenuFlag = false
                        return
                    }

                    let item = this.fileNodeItem
                    if (item.type === 0x1) { // is a dir
                        let currentPath = store.state.path
                        let showPath = currentPath
                        if (currentPath === '/') {
                            showPath += item.name
                        } else {
                            showPath += '/' + item.name
                        }
                        store.dispatch('changeDir', showPath)
                    }

                    // if (this.fileNodeItem.fileKind === 'dir') {
                    //     this.$emit('showByFileItemPath', this.fileNodeItem.arrayId)
                    // } else {
                    //     let treeNodeArray = store.state.treeNodeArray
                    //     let arrayId = this.fileNodeItem.arrayId
                    //     let text = treeNodeArray[arrayId].content
                    //     store.commit('saveFileTextObj', {text, arrayId})
                    //     store.commit('saveFileTextFlag', true) // 用到vuex
                    // }
                }
            },
            setRightClickFade(flag) {
                if (flag) {
                    this.rightMenuFlag = false
                }
            },
            filePostToFileShow() { // 中转站，发送子组件的filePost操作给父组件
                this.$emit('filePost')
            },
            fileRenameToFileShow(flag, data) {
                this.$emit('fileRenameShow', flag, data)
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
    @import '../../assets/font-awesome-4.7.0/css/font-awesome.min.css'
    .file-item
        position: relative
        box-sizing: border-box
        width: 100%
        height: 30px
        line-height: 30px
        cursor: default
        .logo
            display: inline-block
            margin-left: 15px
            width: 15px
            text-align: center
            vertical-align: middle
        .name
            display: inline-block
            margin: 0 0 0 10px
            width: 300px
            overflow: hidden
            font-size: 14px
            white-space: nowrap
            text-overflow: ellipsis
            vertical-align: middle
            span
                vertical-align: middle
        .time
            display: inline-block
            width: 160px
            text-align: left
            font-size: 14px
        .size
            display: inline-block
            width: 100px
            text-align: right
            font-size: 14px
</style>

