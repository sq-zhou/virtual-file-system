<template>
    <div class="file-item" :class="{'file-item-background': selectedIndex === index}" @mousedown.stop="mouseRightClick($event)">
        <div class="logo">
            <i :class="setLogoClass"></i>
        </div>
        <div class="name"><span>{{ fileNodeItem.name }}</span></div>
        <div class="time"><span>{{ fileNodeItem.created_time }}</span></div>
        <div class="size"><span>{{ fileNodeItem.size}}</span></div>
        <!-- <right-click-menu :currentPath="fileNodeItem.arrayId" :currentEvent="currentEventToRightMenu" @fileRenameShow="fileRenameToFileShow"
                          :rightMenuData="rightMenuData" @rightMenuFade="setRightClickFade" @filePost="filePostToFileShow"
                          v-if="rightMenuFlag"></right-click-menu> -->
    </div>
</template>

<script>
    import rightClickMenu from '../rightClickMenu/rightClickMenu'
    import store from '../../store/index'
    const path = require('path')

    export default {
        name: 'file-item',
        props: {
            fileNodeItem: {
                type: Object
            },
            index: {
                type: Number
            }
        },
        components: {
            rightClickMenu: rightClickMenu
        },
        data() {
            return {
                logoClass: 'fa fa-file',
                clickNumer: 0,
                fileItemChoose: false,
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
            selectedIndex() {
                return this.$store.state.selectedIndex
            },
            /*  在节点渲染完成后执行 */
            setLogoClass() {
                if (this.fileNodeItem.fileKind === 'dir') {
                    this.logoClass = 'fa fa-file'
                } else {
                    this.logoClass = 'fa fa-file-text-o'
                }
                return this.logoClass
            },
            getRightClickMenuPath() {
                return this.$store.state.rightClickMenuPath
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
                    this.checkClick(event)
                }
            },
            checkClick(event) {
                this.clickNumer += 1
                this.fileItemChoose = true
                store.commit('saveRightClickMenuPath', this.fileNodeItem.arrayId) // 用到vuex

                if (this.clickNumer === 1) {
                    this.clickNumer = 0
                } else if (this.clickNumer) {
                    this.dbClick(event)
                    this.clickNumer = 0
                }

                let item = this.fileNodeItem
                if (item.type === 0x1) { // is a dir
                    let currentPath = store.state.path
                    let showPath = path.posix.join(currentPath, item.name)
                    store.dispatch('changeDir', showPath)
                } else if (item.type === 0x0) { // is a file
                //  something
                    store.commit('setSelectedIndex', this.index)
                } else {
                    store.commit('setSelectedIndex', -1)
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
        },
        watch: {
            getRightClickMenuPath(val) {
                if (val === this.fileNodeItem.arrayId) {
                    this.fileItemChoose = true
                } else {
                    this.fileItemChoose = false
                }
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
    @import '../../assets/font-awesome-4.7.0/css/font-awesome.min.css'
    @import '../../assets/stylus/public.styl'
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
            color: #4c444a
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
            width: 170px
            text-align: right
            font-size: 14px
</style>

