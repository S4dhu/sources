import React, { useState } from 'react'
import { connect } from 'react-redux'
import { openModal, refetchSources } from '../../redux/actions'
import { Paper, TextField, Box, Button } from '@material-ui/core'
import { insertSource } from '../../api'

import './SourceAddForm.scss'

const SourceAddForm = ({ dispatch }) => {
    const [sourceValues, setSourceValues] = useState({ name: '', link: '' })

    const confirmNewSource = async () => {
        await insertSource({ name: sourceValues.name, link: sourceValues.link })
            .then(res => dispatch(refetchSources({ refetchHash: `${res.data.id}_add` })))
            .then(() => dispatch(openModal({ modal: { opened: false, type: '' } })))
            .catch(err => console.error(err))
    }

    const handleChange = (field, event) => {
        setSourceValues({ ...sourceValues, [field]: event.target.value })
    }

    const closeModal = () => {
        dispatch(openModal({ modal: { opened: false, type: '' } }))
    }
    
    return (
        <Paper className="paper">
            <TextField label="Name" value={sourceValues.name} onChange={e => handleChange('name', e)} variant="outlined" />
            <TextField label="Link" value={sourceValues.link} onChange={e => handleChange('link', e)} variant="outlined" />
            <Box className="actionBar">
                <Button onClick={confirmNewSource}>OK</Button>
                <Button onClick={closeModal}>CANCEL</Button>
            </Box>
        </Paper>
    )
}

export default connect()(SourceAddForm)
