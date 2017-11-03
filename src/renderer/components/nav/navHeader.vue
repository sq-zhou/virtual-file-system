<template>
    <div class="nav-header">
        <div class="nav-left">
            <span class="name">路径</span>
            <span class="return" @click="goBack">
                <span class="fa fa-arrow-left"></span>
            </span>
        </div>
        <div class="nav-right">
            <div class="nav-path-name">
                <span class="pathPart">{{ path }}</span>
            </div>
        </div>
    </div>
</template>

<script>
    import store from '../../store/index'

    export default {
        name: 'nav-header',
        data() {
            return {
                currentPath: 'system',
                parentPath: ''
            }
        },
        computed: {
            getCurrentPath() {
                return this.$store.state.msgOfCurrentPath
            },
            path() {
                return this.$store.state.path
            }
        },
        methods: {
            goBack() {
                store.dispatch('pathGoBackHistory')
            }
        },
        watch: {
            getCurrentPath(arrayId) {
                let treeNode = store.state.treeNodeArray[arrayId]
                this.currentPath = treeNode.path
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
    .nav-header
        display: flex
        align-items: center
        width: 100%
        height: 30px
        background: #dddddd
        .nav-left
            flex: 0 0 90px
            height: 30px
            line-height: 30px
            font-size: 14px
            .name
                margin 0 13px 0 15px
            .return
                cursor: pointer
        .nav-right
            flex: 1
            padding: 0 0 0 15px
            height: 23px
            line-height: 23px
            border: 1px solid #a8a8a8
            .pathPart
                margin: 0 0
                font-size: 14px
</style>

