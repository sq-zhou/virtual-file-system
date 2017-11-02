<template>
    <div class="FAT-Table">
        <div class="disk-cont">
            <div class="title">磁盘使用情况</div>
            <div class="disk-wrapper">
                <div class="disk-inner">
                    <div v-for="(row, indexA) in table" :key="indexA">
                        <div class="disk-piece" :class="{'disk-cover-color': col===-1}" v-for="(col, indexB) in row" :key="indexB">{{col}}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'FAT-Table',
        data() {
            return {
                FatLength: 127
            }
        },
        computed: {
            table() {
                return this.$store.state.FATTable
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
    @import '../../assets/stylus/public.styl'
    .FAT-Table
        position: absolute
        right: 0
        top: 30px
        bottom: 0
        width: 310px
        background: #dddddd
        overflow-y: scroll
        .disk-cont
            margin: 0 auto
            padding: 15px 0 0 25px
            .title
                padding: 0 0 15px 0;
                font-size: 15px
            .disk-wrapper
                .disk-inner
                    div
                        font-size: 0
                        .disk-piece
                            display: inline-block
                            vertical-align: top
                            margin: 2px 2px
                            width: 42px
                            height: 42px
                            line-height: 42px
                            text-align: center
                            font-size: 12px
                            background: #F9F9FA
                            border: 1px solid #eeeeee
</style>