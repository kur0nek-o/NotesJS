const express = require('express')
const app = express()
const port = 3000

const { generateID } = require('./src/createID')
const note = require('./src/noteManagement')

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

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})