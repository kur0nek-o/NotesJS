const { readFileSync, read } = require('node:fs')

const notes = readFileSync('./data/notes.json', 'utf-8')

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
