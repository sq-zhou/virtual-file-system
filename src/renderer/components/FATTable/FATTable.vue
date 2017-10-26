<template>
    <div class="FAT-Table">
        <div class="disk-cont">
            <div class="title">磁盘使用情况</div>
            <div class="disk-wrapper">
                <!-- <table>
                    <tbody>
                        <tr v-for="row in table">
                            <td v-for="col in row" :key="col">
                                {{ col }}
                            </td>
                        </tr>
                    </tbody>
                </table> -->
                <div class="disk-inner">
                    <div v-for="row in table">
                        <div class="disk-piece" :class="{'disk-cover-color': col===-1}" v-for="col in row" :key="col">{{col}}</div>
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
        overflow: auto
        .disk-cont
            margin: 0 auto
            padding: 15px 0 0 0
            width: 270px
            .title
                padding: 0 0 15px 0;
                font-size: 15px
            .disk-wrapper
                position: relative
                height: 245px
                overflow: hidden
                box-shadow: 0 0 1px 1px #0bb0e6
                background: #c6c6c6
                .disk-inner
                    position: absolute
                    left: 0
                    top: 10px;
                    right: 0
                    height: 235px
                    overflow: auto
                    div
                        text-align: center
                        font-size: 0
                        .disk-piece
                            display: inline-block
                            vertical-align: top
                            margin: 3px 5px
                            width: 20px
                            height: 20px
                            line-height: 20px
                            text-align: center
                            font-size: 12px
                            background: #ffffff
                            border: 1px solid #eeeeee
</style>