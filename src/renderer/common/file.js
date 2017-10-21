const path = require('path')
const fs = require('fs')
const os = require('os')
const {shell} = require('electron')
/*
* @export
* @returns
* @feature 返回系统根目录
* */
export const getSystemFile = function () {
    let filePath = getParentPath(path.sep)
    console.log(path + ',' + os.homedir())
    return getCurrentPathAllFile(filePath)
}

/*
* @export
* param {String} path
* @returns
* @feature 返回文件的子目录
* */
export const getCurrentPathAllFile = function (currentPath) {
    let floder = []
    return new Promise(function (resolve, reject) {
        fs.readdir(currentPath, (err, files) => {
            if (err) {
                console.log('打开系统文件失败')
            }
            (function iterator(i) {
                if (i >= files.length) {
                    resolve(floder)
                    return
                }
                fs.stat(currentPath + '\\' + files[i], (err, stats) => {
                    if (err) {
                        console.log('打开系统下的文件失败')
                    }
                    if (stats && stats.isDirectory()) { // 当是目录
                        floder.push({
                            fileName: files[i],
                            path: path.resolve(currentPath, files[i]),
                            kind: 'dir',
                            size: '',
                            changeTime: spiltCreateTime(stats.mtime)
                        })
                    } else if (stats) { // 当是文件
                        floder.push({
                            fileName: files[i],
                            path: path.resolve(currentPath, files[i]),
                            kind: 'file',
                            size: Math.ceil((stats.size) / 1024) + ' ' + 'KB',
                            changeTime: spiltCreateTime(stats.mtime)
                        })
                    }
                    iterator(i + 1)
                })
            })(0)
        })
    })
}

/*
* param {String} string
* @returns
* @feature 返回分割后的时间
* */
const spiltCreateTime = function (string) {
    let d = new Date(string)
    let changeTime = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds()
    return changeTime
}

/*
* @export
* param {String} path
* @returns
* @feature 返回文件的父目录
* */
export const getParentPath = function (currentPath) {
    return path.resolve(currentPath, '..')
}

/*
* @export
* param {String} path
* @returns
* @feature 打开文件
* */
export const openFile = function (path) {
    shell.openItem(path)
}
/*
* @export
* param {String} path
* @returns
* @feature 复制
* */
export const copyFile = function (originPath, aimPath) {
}
