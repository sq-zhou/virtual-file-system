/*   vuex的使用
   1、 引入  import store from '../../store/index'
   2、 mutations设置状态的方法 store.commit('saveMsg', '456') //带参数
   3、 actions(含异步操作，一般异步操作用actions),例子
   store.dispatch('saveDataToRightClickMenu', {event, path}).then(() => {
                    console.log(store.state.msgToRightClickMenu)
                })
   4、获取方法 console.log(store.state.msgToRightClickMenu)
* */
import Vue from 'vue'
import Vuex from 'vuex'
const _ = require('lodash')
const zfs = require('zfs-js')

zfs.connect('test.disk')

Vue.use(Vuex)
// 首先声明一个状态 state
const state = {

    // 正在选择的文件
    selectedIndex: -1,

    // 右键菜单是否显示
    rightClickMenuShow: false,
    // 右键菜单显示位置
    rightClickMenuPos: {
        x: 0,
        y: 0
    },

    // 文件重命名模块属性
    fileRename: {
        show: false,
        value: ''
    },

    kind: '',

    // 全局地址
    path: '/',
    fileItems: zfs.listdir('/'),

    // FAT文件分配表
    FATTable: _.chunk(zfs.getFATBuffer(), 8),

    // FileEditors
    fileEditors: [
        // {
        //     path: '/abc.txt',
        //     content: ''
        // }
    ],

    copyPath: null,
    isCut: false
}

let pathHistory = [
    '/'
]

// 然后给 actions 注册一个事件处理函数，当这个函数被触发时，将状态提交到 mutaions中处理
const actions = {
    openFile({commit}, path) {
        let fd = zfs.open(path, zfs.ZFILE_FLAG_READ)
        let content = zfs.readAll(fd)
        content = content === null ? '' : content.toString()
        zfs.close(fd)
        commit('addFileEditor', {
            path,
            content
        })
    },
    saveFileEditorToFile({commit}, {path, content}) {
        let fd = zfs.open(path, zfs.ZFILE_FLAG_WRITE)
        zfs.writeAll(fd, Buffer.from(content))
        zfs.close(fd)
        commit('setFAT', _.chunk(zfs.getFATBuffer(), 8))
    },
    loadFAT({commit}) {
        let buffer = zfs.getFATBuffer()
        commit('setFAT', _.chunk(buffer, 8))
    },
    newFile({commit}, {showPath, filePath}) {
        let fd = zfs.open(filePath, zfs.ZFILE_FLAG_WRITE)
        zfs.close(fd)
        commit('setFileItems', zfs.listdir(showPath))
        commit('setFAT', _.chunk(zfs.getFATBuffer(), 8))
        commit('setSelectedIndex', -1)
    },
    removeFile({commit}, {showPath, filePath}) {
        zfs.remove(filePath)
        commit('setFileItems', zfs.listdir(showPath))
        commit('setFAT', _.chunk(zfs.getFATBuffer(), 8))
        commit('setSelectedIndex', -1)
    },
    createDir({commit}, {showPath, dirPath}) {
        zfs.createdir(dirPath)
        commit('setFileItems', zfs.listdir(showPath))
        commit('setFAT', _.chunk(zfs.getFATBuffer(), 8))
        commit('setSelectedIndex', -1)
    },
    changeDir({commit}, showPath) {
        pathHistory.push(showPath)
        commit('setPath', showPath)
        commit('setFileItems', zfs.listdir(showPath))
        commit('setSelectedIndex', -1)
    },
    pathGoBackHistory({commit}) {
        if (pathHistory.length >= 2) {
            let path = pathHistory[pathHistory.length - 2]
            pathHistory.length--
            commit('setPath', path)
            commit('setFileItems', zfs.listdir(path))
        }
    },
    pasteFile({commit}, {srcPath, distPath, showPath, isCut}) {
        if (srcPath === null || distPath === null) return

        if (zfs.stat(distPath) !== null) {
            distPath += ' -副本'
        }

        let fd = zfs.open(srcPath, zfs.ZFILE_FLAG_READ)
        let content = zfs.readAll(fd)
        content = content === null ? '' : content.toString()
        zfs.close(fd)

        fd = zfs.open(distPath, zfs.ZFILE_FLAG_WRITE)
        if (content.length > 0) {
            zfs.writeAll(fd, Buffer.from(content))
        }
        zfs.close(fd)

        if (isCut) {
            zfs.remove(srcPath)
            commit('setCopyPath', null)
        }

        commit('setFileItems', zfs.listdir(showPath))
        commit('setFAT', _.chunk(zfs.getFATBuffer(), 8))
        commit('setSelectedIndex', -1)
    }
}
// 更新状态
const mutations = {
    setCopyPath(state, path) {
        state.copyPath = path
    },
    setIsCut(state, value) {
        state.isCut = value
    },
    setFileEditorContentById(state, id, content) {
        state.fileEditors[id].content = content
    },
    addFileEditor(state, fe) {
        state.fileEditors.push(fe)
    },
    removeFileEditorById(state, id) {
        state.fileEditors.splice(id, 1)
    },
    setSelectedIndex(state, value) {
        state.selectedIndex = value
    },
    setKind(state, value) {
        state.kind = value
    },
    setFileRenameShow(state, value) {
        state.fileRename.show = value
    },
    setFileRenameValue(state, value) {
        state.fileRename.value = value
    },
    setFAT(state, fat) {
        state.FATTable = fat
    },
    setPath(state, path) {
        state.path = path
    },
    setRightClickMenuShow(state, value) {
        state.rightClickMenuShow = value
    },
    setRightClickMenuPos(state, value) {
        state.rightClickMenuPos = value
    },
    addFileItem(state, fileItem) {
        state.fileItems.push(fileItem)
    },
    setFileItems(state, fileItems) {
        state.fileItems = fileItems
    }
}
// 获取状态信息
const getter = {
    showState(state) {
        console.log(state.msg)
    }
}

// 下面这个相当关键了，所有模块，记住是所有，注册才能使用
export default new Vuex.Store({
    state,
    getter,
    mutations,
    actions
})
