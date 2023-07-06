const express = require('express')
const router = express.Router()

const noteController = require('../controllers/note')

router.get('/:id', noteController.getNoteById)
router.get('/', noteController.getAllNotes)
router.post('/', noteController.createNote)
router.put('/:id', noteController.updateNote)
router.delete('/:id', noteController.deleteNote)

module.exports = router
