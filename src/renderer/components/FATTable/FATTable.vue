<template>
    <div class="FAT-Table">
        <div class="disk-cont">
            <div class="title">磁盘使用情况</div>
            <div class="disk-wrapper">
                <table>
                    <tbody>
                        <tr v-for="row in table">
                            <td v-for="col in row" :key="col">
                                {{ col }}
                            </td>
                        </tr>
                    </tbody>
                </table>
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
    .FAT-Table
        position: absolute
        right: 0
        top: 30px
        bottom: 0
        width: 310px
        background: #e7dde5
        overflow: auto
        .disk-cont
            margin: 0 auto
            padding: 5px 0 0 0
            width: 270px
            .title
                padding: 0 0 5px 0
                font-size: 15px
            .disk-wrapper
                position: relative
                height: 152px
                overflow: hidden
                border: 1px solid #ada3ab
                .disk-inner::-webkit-scrollbar
                    width:10px
                    background-color: #F5F5F5
                .disk-inner::-webkit-scrollbar-track
                    background-color: #F5F5F5;
                .disk-inner::-webkit-scrollbar-thumb
                    background-color: #ada3ab
                .disk-inner
                    position: absolute
                    left: 0
                    top: 0
                    right: 0
                    height: 150px
                    padding: 0 3px 0 3px
                    overflow: auto
                    .disk-piece
                        display: inline-block
                        vertical-align: top
                        margin: 3px
                        width: 20px
                        height: 20px
                        line-height: 20px
                        text-align: center
                        font-size: 12px
                        background: #ffffff
                        border: 1px solid #eeeeee
        .FAT-cont
            margin: 0 auto
            padding: 10px 0 0 0
            width: 270px
            .title
                font-size: 15px
            table
                margin: 5px 0 10px 0
                width: 100%
                border-collapse: collapse
                border-spacing: 0
                tr
                    td
                        padding: 3px 5px 3px 5px
                        font-size: 14px
                        color: #494247
</style>