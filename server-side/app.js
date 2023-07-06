const express = require('express')
const app = express()
const port = 3000

const bodyParser = require('body-parser')
const noteRouter = require('./routes/note')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/api/notes', noteRouter)

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})
