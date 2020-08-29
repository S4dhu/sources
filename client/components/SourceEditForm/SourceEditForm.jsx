import React, { useState } from 'react'
import { Paper, TextField, Box, Button } from '@material-ui/core'
import { updateSourceById } from '../../api'
import { observer } from 'mobx-react';

import './SourceEditForm.scss'

const SourceEditForm = observer(({ store }) => {
    const { modal, setRefetchHash, updateModal } = store
    const [sourceValues, setSourceValues] = useState({ name: modal.data.name, link: modal.data.link })

    const editSource = async payload => {
        await updateSourceById(modal.data._id, payload)
        .then(() => setRefetchHash(`${modal.data._id}_${modal.data.name}_${modal.data.link}_edit`))
        .then(() => updateModal({ ...modal, opened: false, type: '' }))
    }

    const handleChange = (field, event) => {
        setSourceValues({ ...sourceValues, [field]: event.target.value })
    }

    const closeModal = () => {
        updateModal({ ...modal, opened: false, type: '' })
    }
    
    return (
        <Paper className="paper">
            <TextField label="Name" value={sourceValues.name} onChange={e => handleChange('name', e)} variant="outlined" />
            <TextField label="Link" value={sourceValues.link} onChange={e => handleChange('link', e)} variant="outlined" />
            <Box className="actionBar">
                <Button onClick={() => editSource(sourceValues)}>OK</Button>
                <Button onClick={closeModal}>CANCEL</Button>
            </Box>
        </Paper>
    )
})

export default SourceEditForm
