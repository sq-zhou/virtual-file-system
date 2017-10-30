<template>
    <div class="file-item" 
        :class="{'file-item-background': selectedIndex === index}" 
            @mousedown="handleMouseDown($event)"
            @click="mouseRightClick($event)">
        <div class="logo">
            <i :class="logoClass"></i>
        </div>
        <div class="name"><span>{{ fileNodeItem.name }}</span></div>
    </div>
</template>

<script>
    import store from '../../store/index'
    const ipc = require('electron').ipcRenderer
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
        data() {
            return {
                clickNumer: 0,
                fileItemChoose: false,
                currentEventToRightMenu: null
            }
        },
        computed: {
            selectedIndex() {
                return this.$store.state.selectedIndex
            },
            logoClass() {
                return this.fileNodeItem.type === 1 ? 'fa fa-file' : 'fa fa-file-text-o'
            },
            getRightClickMenuPath() {
                return this.$store.state.rightClickMenuPath
            }
        },
        methods: {
            handleMouseDown(evt) {
                if (event.button === 2) { // 鼠标右击
                    store.commit('setSelectedIndex', this.index)
                    let item = this.fileNodeItem
                    if (item.type === 0x1) { // is a dir
                        ipc.send('menuForDir')
                    } else if (item.type === 0x0) { // is a file
                        ipc.send('menuForFile')
                    }
                } else if (event.button === 0) { // 鼠标左击
                    store.commit('setSelectedIndex', this.index)
                }
            },
            senMsgToRightMenu(event) {
                this.rightMenuFlag = true
                this.currentEventToRightMenu = event
            },
            /*  文件点击事件:鼠标右击，鼠标左击 */
            mouseRightClick(event) {
                this.checkClick(event)
            },
            checkClick(event) {
                this.clickNumer += 1
                this.fileItemChoose = true

                if (this.clickNumer === 1) {
                    this.clickNumer = 0
                } else if (this.clickNumer) {
                    this.dbClick(event)
                    this.clickNumer = 0
                }

                let item = this.fileNodeItem
                let currentPath = store.state.path
                let showPath = path.posix.join(currentPath, item.name)
                if (item.type === 0x1) { // is a dir
                    store.dispatch('changeDir', showPath)
                } else if (item.type === 0x0) { // is a file
                    // something
                    store.commit('setSelectedIndex', this.index)
                    store.dispatch('openFile', showPath)
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
        margin: 10px 5px
        width: 70px
        height: 70px
        text-align:center
        line-height: 30px
        cursor: default
        .logo
            padding: 5px 0 0 0;
            text-align: center
            vertical-align: middle
            color: #4c444a
            i 
                font-size: 33px
        .name
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

