export const {remote} = require('electron')
const {Menu, MenuItem} = remote

export const menuForItem = new Menu()
menuForItem.append(new MenuItem({
    label: '打开',
    click() {
        console.log('fileItem')
    }
}))
menuForItem.append(new MenuItem({label: '剪切'}))
menuForItem.append(new MenuItem({label: '复制'}))
menuForItem.append(new MenuItem({label: '粘贴'}))
menuForItem.append(new MenuItem({label: '重命名'}))
menuForItem.append(new MenuItem({label: '新建文件'}))
menuForItem.append(new MenuItem({label: '新建文件夹'}))

export const menuForWrapper = new Menu()
menuForWrapper.append(new MenuItem({
    label: '新建文件',
    click() {
    console.log('fileShow')
    }
 }))
menuForWrapper.append(new MenuItem({label: '新建文件夹'}))
menuForWrapper.append(new MenuItem({label: '粘贴'}))
