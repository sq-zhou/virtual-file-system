import store from '../store/index'
export const {remote} = require('electron')
const path = require('path')
const {Menu, MenuItem} = remote

export const menuForItem = new Menu()
menuForItem.append(new MenuItem({
    label: '打开',
    click() {
        console.log('fileItem')
    }
}))
menuForItem.append(new MenuItem({
    label: '剪切',
    click() {
        let selectedIndex = store.state.selectedIndex
        if (selectedIndex > -1) {
            const item = store.state.fileItems[selectedIndex]
            const _path = path.posix.join(store.state.path, item.name)
            store.commit('setCopyPath', _path)
            store.commit('setIsCut', true)
        }
    }
}))
menuForItem.append(new MenuItem({
    label: '复制',
    click() {
        let selectedIndex = store.state.selectedIndex
        if (selectedIndex > -1) {
            const item = store.state.fileItems[selectedIndex]
            const _path = path.posix.join(store.state.path, item.name)
            store.commit('setCopyPath', _path)
            store.commit('setIsCut', false)
        }
    }
}))
menuForItem.append(new MenuItem({label: '重命名'}))
menuForItem.append(new MenuItem({
    label: '删除',
    click() {
        let selectedIndex = store.state.selectedIndex
        if (selectedIndex > -1) {
            let item = store.state.fileItems[selectedIndex]
            let removePath = path.posix.join(store.state.path, item.name)
            store.dispatch('removeFile', {
                showPath: store.state.path,
                filePath: removePath
            })
        }
    }
}))

export const menuForWrapper = new Menu()
menuForWrapper.append(new MenuItem({
    label: '新建文件',
    click() {
        store.commit('setKind', 'newFile')
        store.commit('setFileRenameShow', true)
    }
 }))
menuForWrapper.append(new MenuItem({
    label: '新建文件夹',
    click() {
        store.commit('setKind', 'newDir')
        store.commit('setFileRenameShow', true)
    }
}))
menuForWrapper.append(new MenuItem({
    label: '粘贴',
    click() {
        let filename = path.posix.basename(store.state.copyPath)
        store.dispatch('pasteFile', {
            srcPath: store.state.copyPath,
            distPath: path.posix.join(store.state.path, filename),
            showPath: store.state.path,
            isCut: store.state.isCut
        })
    }
}))
