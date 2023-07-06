const express = require('express')
const router = express.Router()
const validator = require('validator')

const noteController = require('../controllers/note')

const validateNoteInput = (req, res, next) => {
    if (req.body.note) {
        req.body.note = validator.trim(validator.escape(req.body.note))
        next()
    } else {
        res.status(400).json({
            status: false,
            message: 'Note harus diisi'
        })
    }
}

router.get('/:id', noteController.getNoteById)
router.get('/', noteController.getAllNotes)
router.post('/', validateNoteInput, noteController.createNote)
router.put('/:id', validateNoteInput, noteController.updateNote)
router.delete('/:id', noteController.deleteNote)

module.exports = router
