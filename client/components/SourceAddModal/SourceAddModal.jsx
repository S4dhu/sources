import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Modal, Paper, TextField, Box, Button } from '@material-ui/core'

import './SourceAddModal.scss'

const SourceAddModal = props => {
    const { isOpen } = props;
    const [open, setOpen] = useState(isOpen)
    return (
        <Modal open={open} className="modal" onClose={() => setOpen(false)}>
            <Paper className="paper">
                <TextField label="Имя ресурса" variant="outlined" />
                <TextField label="Ссылка на ресурс" variant="outlined" />
                <Box className="actionBar">
                    <Button>ОК</Button>
                    <Button onClick={() => setOpen(false)}>Отмена</Button>
                </Box>
            </Paper>
        </Modal>
    )
}

SourceAddModal.propTypes = {
    isOpen: PropTypes.bool
}

export default SourceAddModal
