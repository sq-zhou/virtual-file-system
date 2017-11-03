<template>
    <div class="director">
        <div class="dir-inner">
            <nav-header></nav-header>
            <div class="dir-content">
                <file-show></file-show>
                <f-a-t-table></f-a-t-table> <!-- FATTable 组件-->
            </div>
        </div>
    </div>
</template>

<script>
    import navHeader from '../nav/navHeader'
    import fileShow from '../fileShow/fileShow'
    import FATTable from '../FATTable/FATTable'
    export default {
        name: 'director',
        components: {
            navHeader: navHeader,
            fileShow: fileShow,
            FATTable: FATTable
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
    .director
        background: url('../../assets/bg.jpg')
        background-size: 100% 100%
        height: 100%;
        .dir-inner
            padding: 0
            margin: 0
            .dir-content
                width:100%
                display: flex
</style>
