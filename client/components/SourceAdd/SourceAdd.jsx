import React from 'react'
import { Box } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import PropTypes from 'prop-types'

import './SourceAdd.scss'

const SourceAdd = ({ openModal, model }) => {
    console.log(model)
    return (
        <Box onClick={() => openModal({ open: true })} className="addBlock">
            <AddIcon classes={{ root: "addIcon" }} />
        </Box>
    )
}

SourceAdd.propTypes = {
    openModal: PropTypes.func,
    modal: PropTypes.bool
}

export default SourceAdd
