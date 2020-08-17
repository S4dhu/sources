import React, { useState } from 'react'
import { connect } from 'react-redux'
import { openModal, refetchSources } from '../../redux/actions'
import { Paper, TextField, Box, Button } from '@material-ui/core'
import { updateSourceById } from '../../api'

import './SourceEditForm.scss'

const SourceEditForm = ({ dispatch, modal }) => {
    console.log(modal)
    const [sourceValues, setSourceValues] = useState({ name: modal.data.name, link: modal.data.link })

    const editSource = async payload => {
        await updateSourceById(modal.data._id, payload)
        .then(() => dispatch(refetchSources({ refetchHash: `${modal.data._id}_edit` })))
    }

    const handleChange = (field, event) => {
        setSourceValues({ ...sourceValues, [field]: event.target.value })
    }

    const closeModal = () => {
        dispatch(openModal({ modal: { opened: false, type: '' } }))
    }
    
    return (
        <Paper className="paper">
            <TextField label="Имя ресурса" value={sourceValues.name} onChange={e => handleChange('name', e)} variant="outlined" />
            <TextField label="Ссылка на ресурс" value={sourceValues.link} onChange={e => handleChange('link', e)} variant="outlined" />
            <Box className="actionBar">
                <Button onClick={() => editSource(sourceValues)}>ОК</Button>
                <Button onClick={closeModal}>Отмена</Button>
            </Box>
        </Paper>
    )
}

const mapStateToProps = state => ({
    modal: state.modal
})

export default connect(mapStateToProps)(SourceEditForm)
