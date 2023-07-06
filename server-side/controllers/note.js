const { readFileSync, writeFileSync } = require('fs')
const { generateID } = require('../utils/createID')

const filePath = './data/notes.json'
let cachedNotes = []

function cacheNotes() {
    cachedNotes = JSON.parse(readFileSync(filePath, 'utf-8'))
}

function saveNotes() {
    writeFileSync(filePath, JSON.stringify(cachedNotes), 'utf-8')
}

exports.getAllNotes = (req, res) => {
    try {
        res.status(200).json({
            status: true,
            data: cachedNotes
        })
    } catch (error) {
        res.status(500).json({
            status: false,
            message: 'Terjadi kesalahan server saat mencoba mengambil data'
        })
    }
}

exports.getNoteById = (req, res) => {
    try {
        const id = req.params.id
        const note = cachedNotes.find((n) => n.id === id)
        if (note) {
            res.status(200).json({
                status: true,
                data: note
            })
        } else {
            res.status(404).json({
                status: false,
                message: 'Data tidak ditemukan'
            })
        }
    } catch (error) {
        res.status(500).json({
            status: false,
            message: 'Terjadi kesalahan server saat mencoba mengambil data'
        })
    }
}

exports.createNote = (req, res) => {
    try {
        const newNote = {
            id: generateID(),
            note: req.body.note
        }
        cachedNotes.push(newNote)
        saveNotes()
        res.status(201).json({
            status: true,
            message: 'Note berhasil disimpan'
        })
    } catch (error) {
        res.status(500).json({
            status: false,
            message: 'Terjadi kesalahan server saat mencoba menyimpan data'
        })
    }
}

exports.updateNote = (req, res) => {
    try {
        const id = req.params.id
        const updatedNote = {
            id,
            note: req.body.note
        }
        const noteIndex = cachedNotes.findIndex((n) => n.id === id)
        if (noteIndex !== -1) {
            cachedNotes[noteIndex] = updatedNote
            saveNotes()
            res.status(200).json({
                status: true,
                message: 'Note berhasil diperbarui'
            })
        } else {
            res.status(404).json({
                status: false,
                message: 'Data tidak ditemukan'
            })
        }
    } catch (error) {
        res.status(500).json({
            status: false,
            message: 'Terjadi kesalahan server saat mencoba memperbarui data'
        })
    }
}

exports.deleteNote = (req, res) => {
    try {
        const id = req.params.id
        const noteIndex = cachedNotes.findIndex((n) => n.id === id)
        if (noteIndex !== -1) {
            cachedNotes.splice(noteIndex, 1)
            saveNotes()
            res.status(200).json({
                status: true,
                message: 'Note berhasil dihapus'
            })
        } else {
            res.status(404).json({
                status: false,
                message: 'Data tidak ditemukan'
            })
        }
    } catch (error) {
        res.status(500).json({
            status: false,
            message: 'Terjadi kesalahan server saat mencoba menghapus data'
        })
    }
}

cacheNotes()

module.exports = exports
