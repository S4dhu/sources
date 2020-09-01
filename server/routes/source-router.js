const express = require('express')

const SourceCtrl = require('../controllers/source-ctrl')

const router = express.Router()

router.post('/source', SourceCtrl.createSource)
router.put('/source/:id', SourceCtrl.updateSource)
router.delete('/source/:id', SourceCtrl.deleteSource)
router.get('/sources/:user', SourceCtrl.getSourcesByUser)
router.get('/sources', SourceCtrl.getSources)

module.exports = router