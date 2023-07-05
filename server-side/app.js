const express = require('express')
const app = express()
const port = 3000

const bodyParser = require('body-parser')
const { readFileSync, writeFileSync } = require('node:fs')

const { generateID } = require('./src/createID')
const note = require('./noteManagement')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/api/notes/:id', (req, res) => {
    const id = req.params.id
    const data = note.find(id)

    if (data) {
        res.status(200).json({
            status: true,
            data
        })
    } else {
        res.status(404).json({
            status: false,
            message: 'Data tidak ditemukan'
        })
    }
})

app.get('/api/notes', (req, res) => {
    res.status(200).json({
        status: true,
        data: note.all()
    })
})

app.post('/api/notes', (req, res) => {
    const save = note.create(req.body)

    if (save) {
        res.status(201).json({
            status: true,
            message: 'Note berhasil disimpan'
        })
    } else {
        res.status(500).json({
            status: false,
            message: 'Terjadi kesalahan server saat mencoba menyimpan data'
        })
    }
})

app.put('/api/notes/:id', (req, res) => {
    const id = req.params.id
    const update = note.update(req.body, id)

    if (update) {
        res.status(200).json({
            status: true,
            message: 'Note berhasil diperbaharui'
        })
    } else {
        res.status(404).json({
            status: false,
            message: 'Data tidak ditemukan'
        })
    }
})

app.delete('/api/notes/:id', (req, res) => {
    const id = req.params.id
    const destroy = note.destroy(id)

    if (destroy) {
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
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})