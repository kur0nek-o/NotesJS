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

exports.update = (data, id) => {
    const datas = JSON.parse(notes)
    const index = datas.findIndex(val => val.id == id)

    if (index != -1) {
        const replacement = {
            id,
            note: data.note
        }

        datas[index] = replacement
        writeFileSync(filePath, JSON.stringify(datas), 'utf-8')

        return true
    } else {
        return false
    }
}

exports.destroy = id => {
    const datas = JSON.parse(notes)
    const index = datas.findIndex(val => val.id == id)

    if (index != -1) {
        datas.splice(index, 1)
        writeFileSync(filePath, JSON.stringify(datas), 'utf-8')

        return true
    } else {
        return false
    }
}
