import store from '../store/index'
export const {remote} = require('electron')
const path = require('path')
const {Menu, MenuItem} = remote
// 文件的右击显示
export const menuForfile = new Menu()
menuForfile.append(new MenuItem({
    label: '打开',
    click() {
        console.log('fileItem')
    }
}))
menuForfile.append(new MenuItem({
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
menuForfile.append(new MenuItem({
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
menuForfile.append(new MenuItem({label: '重命名'}))
menuForfile.append(new MenuItem({
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
menuForfile.append(new MenuItem({
    label: '属性',
    click() {
        let selectedIndex = store.state.selectedIndex
        if (selectedIndex > -1) {
            let item = store.state.fileItems[selectedIndex]
            let _path = path.posix.join(store.state.path, item.name)
            store.dispatch('showFileProperty', _path)
        }
    }
}))
// 文件夹的右击显示
export const menuForDir = new Menu()
menuForDir.append(new MenuItem({
    label: '打开',
    click() {
        console.log('fileItem')
    }
}))
menuForDir.append(new MenuItem({
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
// 空白的右击显示
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
