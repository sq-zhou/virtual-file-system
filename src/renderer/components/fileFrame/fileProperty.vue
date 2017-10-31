<template>
    <div class="fileProperty" v-if="filePropertyFlag">
        <div class="fileProperty-wrapper">
            <div class="header">
                <span>文件名</span><span class="close" @click="close"><i class="fa fa-close"></i></span>
            </div>
            <div class="middle">
                <div class="middle-wrapper">
                    <div class="cont">
                        <span class="cont-title">文件名</span>
                        <span class="cont-content">abc.txt</span>
                    </div>
                    <div class="line"></div>
                     <div class="cont">
                        <span class="cont-title">时间</span>
                        <span class="cont-content">2018/10/09</span>
                    </div>
                    <div class="cont">
                        <span class="cont-title">大小</span>
                        <span class="cont-content">2KB</span>
                    </div>
                    <div class="cont">
                        <span class="cont-title">属性标题</span>
                        <span class="cont-content">属性特点</span>
                    </div>
                     <div class="cont">
                        <span class="cont-title">属性标题</span>
                        <span class="cont-content">属性特点</span>
                    </div>
                    <div class="line"></div>
                     <div class="cont">
                        <span class="cont-title">属性</span>
                        <span class="cont-content">
                            <input type="radio" name="property" value="read"><span>只读</span>
                            <input type="radio" name="property" value="write"><span>读写</span>
                        </span>
                    </div>
                </div>
            </div>
            <div class="bottom">
                <span class="sure">确定</span>
                <span class="cancel" @click="close">取消</span>
            </div>
        </div>
        <div class="fileProperty-fade"></div>
    </div>
</template>

<script>
    export default {
        name: 'fileProperty',
        data() {
            return {
                filePropertyFlag: true
            }
        },
        methods: {
            close() {
                this.filePropertyFlag = false
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
    .fileProperty-wrapper
        position: fixed
        left: 50%
        top: 50%
        width: 430px
        height: 310px
        margin-left: -215px
        margin-top: -155px
        background: #f0f0f0
        z-index: 1000
        .header
            width: 100%
            height: 33px
            line-height: 33px
            font-size: 13px
            background: #fff
            span 
                margin: 0 5px 0 13px
            .close
                float: right
                margin: 0 13px 
        .middle
            margin: 10px
            background: #ffffff
            .middle-wrapper
                padding: 5px 8px 40px 8px
                border: 1px solid #d9d9d9
                .cont
                    padding: 5px 2px
                    font-size: 13px
                    .cont-title
                        display: inline-block
                        width: 55px
                    .cont-content
                        display: inline-block
                        margin: 0 15px
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
                border: 1px solid #adadad
                font-size: 13px
            span:first-of-type
                margin: 0
    .fileProperty-fade
        position: fixed
        top: 0
        left: 0
        width: 100%
        height: 100%
        z-index: 800
        background: #4b4149
        opacity: 0.3
</style>