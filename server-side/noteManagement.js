const { readFileSync, writeFileSync } = require('node:fs')

const filePath = './data/notes.json'
const notes = readFileSync(filePath, 'utf-8')

const { generateID } = require('./src/createID')

exports.all = () => {
    return JSON.parse(notes)
}

exports.find = id => {
    const data = JSON.parse(notes).find(val => val.id === id)

    if (data) {
        return data
    } else {
        return false
    }
}

exports.create = data => {
    const datas = JSON.parse(notes)

    datas.push({
        id: generateID(),
        note: data.note
    })

    writeFileSync(filePath, JSON.stringify(datas), 'utf-8')

    return true
}
