const Category = require('../models/category-model')

const createCategory = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a category',
        })
    }

    const category = new Category(body)

    if (!category) {
        return res.status(400).json({ success: false, error: res })
    }

    await category
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: category._id,
                message: 'Category created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Category not created!',
            })
        })
}

const updateCategory = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Category.findOne({ _id: req.params.id }, (err, category) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Category not found!',
            })
        }
        category.name = body.name
        category.link = body.link
        category
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: category._id,
                    message: 'Category updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Category not updated!',
                })
            })
    })
}

const deleteCategory = async (req, res) => {
    await Category.findOneAndDelete({ _id: req.params.id }, (err, category) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        return res.status(200).json({ success: true })
    }).catch(err => console.log(err))
}

const getCategoriesByUser = async (req, res) => {
    await Category.find({ user: req.params.user }, (err, categories) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!categories) {
            return res
                .status(404)
                .json({ success: false, error: `Categories not found` })
        }
        return res.status(200).json({ success: true, data: categories })
    }).catch(err => console.log(err))
}

module.exports = {
    createCategory,
    updateCategory,
    deleteCategory,
    getCategoriesByUser,
}