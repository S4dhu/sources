const express = require('express')

const CategoryCtrl = require('../controllers/category-ctrl')

const router = express.Router()

router.post('/category', CategoryCtrl.createCategory)
router.put('/category/:id', CategoryCtrl.updateCategory)
router.delete('/category/:id', CategoryCtrl.deleteCategory)
router.get('/categories/:user', CategoryCtrl.getCategoriesByUser)

module.exports = router