import React, { useState } from 'react'
import { Paper, TextField, Box, Button, Select, MenuItem, FormControl, InputLabel } from '@material-ui/core'
import { insertSource } from 'api'
import { showError } from 'helpers/pushups'
import { validateURL } from 'helpers/validation'
import { observer } from 'mobx-react';
import ArrowDropDownRoundedIcon from '@material-ui/icons/ArrowDropDownRounded';

import './SourceAddForm.scss'

const SourceAddForm = observer(({ store, categories }) => {
    const { setRefetchHash, updateModal, modal, user } = store
    const [sourceValues, setSourceValues] = useState({ name: '', link: '', category: 'none' })
    const [addFail, setAddFail] = useState({ state: false, message: '' })

    const confirmNewSource = async () => {
        if (validateURL(sourceValues.link)) {
            await insertSource({ name: sourceValues.name, link: sourceValues.link, category: sourceValues.category, user: user.username })
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
            <FormControl variant="outlined">
                <InputLabel>Collection</InputLabel>
                <Select
                    value={sourceValues.category}
                    onChange={e => handleChange('category', e)}
                    label="Collection"
                    variant="outlined"
                    IconComponent={ArrowDropDownRoundedIcon}
                    MenuProps={{
                        anchorOrigin: {
                        vertical: "bottom",
                        horizontal: "left"
                        },
                        transformOrigin: {
                        vertical: "top",
                        horizontal: "left"
                        },
                        getContentAnchorEl: null,
                    }}
                >
                    <MenuItem value="none">None</MenuItem>
                    {categories.map(c => <MenuItem key={`${c.name}_category`} value={c.name}>{c.name}</MenuItem>)}
                </Select>
            </FormControl>
            <Box className="actionBar">
                <Button onClick={confirmNewSource}>OK</Button>
                <Button onClick={closeModal}>CANCEL</Button>
            </Box>
        </Paper>
    )
})

export default SourceAddForm
