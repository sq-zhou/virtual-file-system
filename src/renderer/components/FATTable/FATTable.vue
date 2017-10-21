<template>
    <div class="FAT-Table">
        <div class="FAT-cont">
            <div class="title">FAT分配表</div>
            <table border="1">
                <tr v-for="i in FatLength">
                    <td>{{i}}</td>
                    <td>0</td>
                </tr>
            </table>
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
        .FAT-cont
            margin 0 auto
            padding: 10px 0 0 0
            width: 270px
            .title
                font-size: 15px
            table
                margin: 15px 0 10px 0
                width: 100%
                border-collapse: collapse
                border-spacing: 0
                tr
                    td
                        padding: 3px 5px 3px 5px
                        font-size: 14px
                        color: #494247
</style>

