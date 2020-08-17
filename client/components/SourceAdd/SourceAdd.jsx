import React from 'react'
import { connect } from 'react-redux'
import { Box, Typography } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import { openModal } from '../../redux/actions'

import './SourceAdd.scss'

const SourceAdd = ({ dispatch }) => {
    return (
        <Box onClick={() => dispatch(openModal({ modal: { opened: true, type: 'add' } }))} className="addBlock">
            <span class="dashing"><i></i></span>
            <span class="dashing rotated"><i></i></span>
            <span class="dashing"><i></i></span>
            <span class="dashing rotated"><i></i></span>
            <Typography classes={{ root: 'addText' }}>New source</Typography>
            <AddIcon classes={{ root: 'addIcon' }} />
        </Box>
    )
}

export default connect()(SourceAdd)
