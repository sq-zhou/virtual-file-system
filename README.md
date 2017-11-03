# 一个基于electron-vue的模拟磁盘文件应用

### 项目根源

本项目是基于操作系统课程设计，功能有基本的文件操作功能，新建，删除，复制，剪切，粘贴，以及由于文件操作导致FAT表的改变的显示。

### 项目技术基础

项目用到electron-vue,以及zfs-js这个文件操作的插件。

[electron-vue](https://github.com/SimulatedGREG/electron-vue)基于vue和electron的脚手架。

[zfs-js](https://github.com/vincentdchan/zfs-js)是成员[Vincent Chan](https://github.com/vincentdchan)开发的一个插件。

### 使用说明
``` bash
# install dependencies
npm install

# serve with hot reload at localhost:9080
npm run dev

# build electron application for production
npm run build

# lint all JS/Vue component files in `src/`
npm run lint
