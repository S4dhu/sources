const Source = require('../models/source-model')

const createSource = (req, res) => {
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

    source
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
        source.time = body.time
        source.rating = body.rating
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

const getSourceById = async (req, res) => {
    await Source.findOne({ _id: req.params.id }, (err, source) => {
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

const getSources = async (req, res) => {
    await Source.find({}, (err, sources) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!sources.length) {
            return res
                .status(404)
                .json({ success: false, error: `Source not found` })
        }
        return res.status(200).json({ success: true, data: sources })
    }).catch(err => console.log(err))
}

module.exports = {
    createSource,
    updateSource,
    deleteSource,
    getSources,
    getSourceById,
}