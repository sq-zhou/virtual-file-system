<template>
    <div class="fileProperty">
        <div class="fileProperty-wrapper">
            <div class="header">
                <span>文件属性 - {{ fp.name }}</span><span class="close" @click="close"><i class="fa fa-close"></i></span>
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
                        <span class="cont-content">{{ fp.size }}</span>
                    </div>
                    <div class="cont">
                        <span class="cont-title">创建时间</span>
                        <span class="cont-content">{{ fp.created_time }}</span>
                    </div>
                    <div class="cont">
                        <span class="cont-title">更新时间</span>
                        <span class="cont-content">{{ fp.edited_time }}</span>
                    </div>
                      <div class="cont">
                        <span class="cont-title">文件属性</span>
                        <input type="checkbox"/>
                        <span>只读</span>
                    </div>
                </div>
            </div>
            <div class="bottom">
                <span class="sure" @click="close">确定</span>
                <!-- <span class="cancel">取消</span> -->
            </div>
        </div>
        <div class="fileProperty-fade"></div>
    </div>
</template>

<script>
    export default {
        name: 'fileProperty',
        props: ['fp', 'index'],
        methods: {
            close() {
                this.$store.commit('removeFilePropertiesById', this.index)
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
        height: 326px
        margin-left: -215px
        margin-top: -163px
        background: #ffffff
        box-shadow: 0 0 6px 2px #0bb0e6
        border: 1px solid #fff
        z-index: 1000
        .header
            width: 100%
            height: 33px
            line-height: 33px
            font-size: 14px
            background: #0bb0e6
            color: #ffffff
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
                border: 1px solid #0bb0e6
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
                        margin : 4px 5px 0 15px
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
                border: 1px solid #0bb0e6
                font-size: 14px
                cursor: pointer
    .fileProperty-fade
        display:none
        position: fixed
        top: 0
        left: 0
        width: 100%
        height: 100%
        z-index: 800
        background: #4b4149
        opacity: 0.3
</style>