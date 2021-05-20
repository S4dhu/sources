import React, { useState } from 'react'
import { Paper, TextField, Box, Button, FormControl, MenuItem, Select, InputLabel } from '@material-ui/core'
import { updateSourceById } from 'api'
import { observer } from 'mobx-react';
import { validateURL } from 'helpers/validation'
import ArrowDropDownRoundedIcon from '@material-ui/icons/ArrowDropDownRounded';

import './SourceEditForm.scss'

const SourceEditForm = observer(({ store, categories }) => {
    const { modal, setRefetchHash, updateModal } = store
    const [sourceValues, setSourceValues] = useState({ name: modal.data.name, link: modal.data.link, category: modal.data.category })
    const [editFail, setEditFail] = useState({ state: false, message: '' })

    const editSource = async payload => {
        if (validateURL(sourceValues.link)) {
            await updateSourceById(modal.data._id, payload)
            .then(() => setRefetchHash(`${modal.data._id}_${modal.data.name}_${modal.data.link}${modal.data.category}_edit`))
            .then(() => updateModal({ ...modal, opened: false, type: '' }))
        } else {
            setEditFail({ state: true, message: 'Invalid link' })
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
            <TextField error={editFail.state} helperText={editFail.state && editFail.message} label="Link" value={sourceValues.link} onChange={e => handleChange('link', e)} variant="outlined" />
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
                <Button onClick={() => editSource(sourceValues)}>OK</Button>
                <Button onClick={closeModal}>CANCEL</Button>
            </Box>
        </Paper>
    )
})

export default SourceEditForm
