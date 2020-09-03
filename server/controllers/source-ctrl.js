const Source = require('../models/source-model')

const createSource = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a source',
        })
    }

    const source = new Source(body)

    if (!source) {
        return res.status(400).json({ success: false, error: res })
    }

    await source
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: source._id,
                message: 'Source created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Source not created!',
            })
        })
}

const updateSource = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Source.findOne({ _id: req.params.id }, (err, source) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Source not found!',
            })
        }
        source.name = body.name
        source.link = body.link
        source
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: source._id,
                    message: 'Source updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Source not updated!',
                })
            })
    })
}

const deleteSource = async (req, res) => {
    await Source.findOneAndDelete({ _id: req.params.id }, (err, source) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!source) {
            return res
                .status(404)
                .json({ success: false, error: `Source not found` })
        }

        return res.status(200).json({ success: true, data: source })
    }).catch(err => console.log(err))
}

const getSourcesByUser = async (req, res) => {
    await Source.find({ user: req.params.user }, (err, sources) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!sources) {
            return res
                .status(404)
                .json({ success: false, error: `Sources not found` })
        }
        return res.status(200).json({ success: true, data: sources })
    }).catch(err => console.log(err))
}

const getSources = async (req, res) => {
    await Source.find({}, (err, sources) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        return res.status(200).json({ success: true, data: sources })
    }).catch(err => console.log(err))
}

module.exports = {
    createSource,
    updateSource,
    deleteSource,
    getSources,
    getSourcesByUser,
}