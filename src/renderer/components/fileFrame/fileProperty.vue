<template>
    <transition name="slide-fade">
        <div class="fileProperty">
            <div class="fileProperty-wrapper" ref="fileModel">
                <div class="header" @mousedown="getMoveFile($event)" ref="header">
                    <span>文件属性 - {{ fp.name }}</span><span class="close" @click.stop="close"><i class="fa fa-close"></i></span>
                </div>
                <div class="middle">
                    <div class="middle-wrapper">
                        <div class="cont">
                            <span class="cont-title">路径</span>
                            <span class="cont-content">{{ fp.full_path }}</span>
                        </div>
                        <div class="line"></div>
                        <div class="cont">
                            <span class="cont-title">开始块号</span>
                            <span class="cont-content">{{ fp.begin_num }}</span>
                        </div>
                        <div class="cont">
                            <span class="cont-title">大小</span>
                            <span class="cont-content">{{ fp.size }} 字节</span>
                        </div>
                        <div class="cont">
                            <span class="cont-title">创建时间</span>
                            <span class="cont-content">{{ fp.created_time | bTime }}</span>
                        </div>
                        <div class="cont">
                            <span class="cont-title">更新时间</span>
                            <span class="cont-content">{{ fp.edited_time | bTime }}</span>
                        </div>
                        <div class="cont">
                            <span class="cont-title">文件属性</span>
                            <input v-model="readOnly" type="checkbox"/>
                            <span>只读</span>
                        </div>
                    </div>
                </div>
                <div class="bottom">
                    <span class="sure" @click="close">确定</span>
                    <!-- <span class="cancel">取消</span> -->
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    import {MoveFrame} from '../../common/frameMove'
    export default {
        name: 'fileProperty',
        props: ['fp', 'index'],
        data() {
            return {
                readOnly: this.fp.attr === 1,
                isDraging: false
            }
        },
        methods: {
            close() {
                let isReadOnlySource = this.fp.attr === 1
                if (this.readOnly !== isReadOnlySource) {
                    this.$store.dispatch('changeAttr', {
                        path: this.fp.full_path,
                        attr: this.readOnly ? 0x1 : 0
                    })
                }
                this.$store.commit('removeFilePropertiesById', this.index)
            },
            getMoveFile(event) {
                let model = this.$refs.fileModel
                let header = this.$refs.header
                MoveFrame(model, header, 2000, this.isDraging)
            }
        },
        filters: {
            bTime: (input) => {
            let time = new Date(input)
            // margin-left: -215px
            // margin-top: -163px
            return `${time.getFullYear()}年${time.getMonth() + 1}月${time.getDate()}日 ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
    .fileProperty-wrapper
        opacity: 0.85
        position: fixed
        left: 50%
        top: 50%
        width: 430px
        height: 326px
        transform: translateX(-50%) translateY(-50%)
        background: #ffffff
        box-shadow: 0 0 6px 2px #97D9D7
        border: 1px solid #fff
        z-index: 2000
        .header
            width: 100%
            height: 33px
            line-height: 33px
            font-size: 14px
            background: dimgrey
            color: #ffffff
            cursor: default
            span 
                margin: 0 5px 0 13px
            .close
                float: right
                margin: 0 13px
                cursor: pointer 
        .middle
            margin: 13px 10px 10px 10px
            background: #ffffff
            .middle-wrapper
                padding: 5px 8px 40px 8px
                border: 1px solid dimgrey
                .cont
                    padding: 5px 2px
                    font-size: 14px
                    .cont-title
                        vertical-align: top
                        display: inline-block
                        width: 75px
                    .cont-content
                        vertical-align: top
                        display: inline-block
                        margin: 0 15px
                    input
                        display: inline-block
                        vertical-align: top
                        margin: 4px 5px 0 15px
                        box-sizing:border-box
                .line
                    margin: 3px 0
                    width: 100%
                    height: 1px
                    background: #a0a0a0
        .bottom
            padding: 5px 0
            text-align: right 
            span
                display: inline-block
                margin: 0 10px
                padding: 3px 15px
                border: 1px solid dimgrey
                font-size: 14px
                cursor: pointer
                user-select: none
    .slide-fade-enter-active 
        transition: opacity .3s
    .slide-fade-leave-active
        transition: opacity .3s
    .slide-fade-enter, .slide-fade-leave-to
        opacity: 0
</style>