<template>
    <div class="right-click-menu" :style="{left:menuLeft+'px',top:menuTop+'px'}" v-if="getParentEvent">
        <div class="menu-item" v-for="item in rightMenuData"
             @mousedown.stop="operateFile(item.kind,$event)">{{item.name}}
        </div>
    </div>
</template>

<script>
    import store from '../../store/index'

    export default {
        name: 'right-click-menu',
        props: {
            currentPath: { // 当前选择节点的currentPath
                type: Number
            },
            currentEvent: {
                type: MouseEvent
            },
            rightMenuData: {
                type: Array
            }
        },
        data() {
            return {
                rightMenuShow: true,
                menuLeft: '200',
                menuTop: '20',
                nodeEvent: {},
                path: ''
            }
        },
        computed: {
            getParentEvent() {
                let event = this.currentEvent
                if (this.currentEvent === null) {
                    return false
                } else {
                    let positionX = event.clientX
                    let positionY = event.layerY
                    this.menuLeft = positionX
                    this.menuTop = positionY
                    return true
                }
            },
            getRightClickMenuPath() {
                return this.$store.state.rightClickMenuPath
            }
        },
        methods: {
            operateFile(kind, event) {
                if (event.button === 0) {
                    switch (kind) {
                        case 'newFile-txt':
                            this.newFile(kind)
                            break
                        case 'newFile-dir':
                            this.newFile(kind)
                            break
                        case 'open':
                            this.openFile()
                            break
                        case 'copy':
                            this.copyFile()
                            break
                        case 'cut':
                            this.cutFile()
                            break
                        case 'post':
                            this.postFile()
                            break
                    }
                }
            },
            newFile(kind) {
                this.$emit('fileRenameShow', true, kind)
            },
            openFile() {
                let treeNodeArray = store.state.treeNodeArray
                let arrayId = store.state.rightClickMenuPath
                if (treeNodeArray[arrayId].fileKind === 'dir') { // 打开目录
                } else {
                    let text = treeNodeArray[arrayId].content
                    store.commit('saveFileTextObj', {text, arrayId})
                    store.commit('saveFileTextFlag', true) // 用到vuex
                }
                this.$emit('rightMenuFade', true)
            },
            copyFile() {
                store.commit('saveFileOperate', {
                        path: this.currentPath,
                        operateKind: 'copy'
                    }
                )
                this.$emit('rightMenuFade', true)
            },
            cutFile() {
                store.commit('saveFileOperate', {
                        path: this.currentPath,
                        operateKind: 'cut'
                    }
                )
                this.$emit('rightMenuFade', true)
            },
            postFile() {
                this.$emit('filePost')
                this.$emit('rightMenuFade', true)
            }
        },
        watch: {
            getRightClickMenuPath(val) {
                if (val !== this.currentPath) {
                    this.$emit('rightMenuFade', true)
                }
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
    .right-click-menu
        position: absolute
        box-shadow: 1px 1px 1px 1px #0bb0e6
        background: #ffffff
        z-index: 10
        .menu-item
            font-size: 14px
            padding: 0 0 0 15px
            width: 80px
            height: 26px
            line-height: 26px
            cursor: pointer
        .menu-item:hover
            background: #0bb0e6
            color: #ffffff
</style>

