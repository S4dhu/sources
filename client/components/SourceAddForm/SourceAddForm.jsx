import React, { useState } from 'react'
import { Paper, TextField, Box, Button } from '@material-ui/core'
import { insertSource } from '../../api'
import { showError } from '../../helpers/pushups'
import { validateURL } from '../../helpers/validation'
import { observer } from 'mobx-react';

import './SourceAddForm.scss'

const SourceAddForm = observer(({ store }) => {
    const { setRefetchHash, updateModal, modal, user } = store
    const [sourceValues, setSourceValues] = useState({ name: '', link: '' })
    const [addFail, setAddFail] = useState({ state: false, message: '' })

    const confirmNewSource = async () => {
        if (validateURL(sourceValues.link)) {
            await insertSource({ name: sourceValues.name, link: sourceValues.link, user: user.username })
                .then(res => setRefetchHash(`${res.data.id}_add`))
                .then(() => updateModal({ ...modal, opened: false, type: '' }))
                .catch(err => showError('Failed creation'))
        } else {
            setAddFail({ state: true, message: 'Invalid link' })
        }
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
            <TextField error={addFail.state} helperText={addFail.state && addFail.message} label="Link" value={sourceValues.link} onChange={e => handleChange('link', e)} variant="outlined" />
            <Box className="actionBar">
                <Button onClick={confirmNewSource}>OK</Button>
                <Button onClick={closeModal}>CANCEL</Button>
            </Box>
        </Paper>
    )
})

export default SourceAddForm
