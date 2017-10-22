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
const zfs = require('zfs-js')

zfs.connect('test.disk')

Vue.use(Vuex)
// 首先声明一个状态 state
const state = {
    // 设置fileText内容
    fileTextObj: {},
    // 设置fileText是否显示
    fileTextFlag: {},
    // 操作文件 例如复制，剪切，删除,内含有参数path(String),operateKind(String)
    fileOperate: {},
    // 操作文件的Flag 用于通知主组件fileshow 粘贴文件
    fileOperateFlag: {},
    // 用于右击菜单的多个显示的排除,相当与flag，赋值参数为当前fileitem的currentPath
    rightClickMenuPath: {},
    // 文件的选择当前路径,为文件树现行的arrayId
    msgOfCurrentPath: {},
    // 文件树
    treeNodeArray: {},

    path: '/',
    fileItems: zfs.listdir('/')
}
// 然后给 actions 注册一个事件处理函数，当这个函数被触发时，将状态提交到 mutaions中处理
const actions = {
    newFile({commit}, {showPath, filePath}) {
        let fd = zfs.open(filePath, zfs.ZFILE_FLAG_WRITE)
        zfs.close(fd)
        commit('setFileItems', zfs.listdir(showPath))
    },
    createDir({commit}, {showPath, dirPath}) {
        zfs.createdir(dirPath)
        commit('setFileItems', zfs.listdir(showPath))
    },
    changeDir({commit}, showPath) {
        commit('setPath', showPath)
        commit('setFileItems', zfs.listdir(showPath))
    },
    saveDataFileTextObj({commit}, msg) {
        commit('saveFileTextObj', msg)
    },
    saveDataFileTextFlag({commit}, msg) {
        commit('saveFileTextFlag', msg)
    },
    saveDataFileOperate({commit}, msg) {
        commit('saveFileOperate', msg)
    },
    saveDataFileOperateFlag({commit}, msg) {
        commit('saveFileOperateFlag', msg)
    },
    saveDataRightClickMenuPath({commit}, msg) {
        commit('saveMsgToFileFrame', msg)
    },
    saveDataToCurrentPath({commit}, msg) {
        commit('saveRightClickMenuPath', msg)
    },
    saveDataTreeNodeArray({commit}, msg) {
        commit('saveTreeNodeArray', msg)
    }
}
// 更新状态
const mutations = {
    setPath(state, path) {
        state.path = path
    },
    addFileItem(state, fileItem) {
        state.fileItems.push(fileItem)
    },
    setFileItems(state, fileItems) {
        state.fileItems = fileItems
    },
    saveFileTextObj(state, msg) {
        state.fileTextObj = msg
    },
    saveFileTextFlag(state, msg) {
        state.fileTextFlag = msg
    },
    saveFileOperate(state, msg) {
        state.fileOperate = msg
    },
    saveFileOperateFlag(state, msg) {
        state.fileOperateFlag = msg
    },
    saveRightClickMenuPath(state, msg) {
        state.rightClickMenuPath = msg
    },
    saveMsgToCurrentPath(state, msg) {
        state.msgOfCurrentPath = msg
    },
    saveTreeNodeArray(state, msg) {
        state.treeNodeArray = msg
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
