import React from 'react'
import { Box, Typography } from '@material-ui/core'
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import { observer } from 'mobx-react';

import './SourceAdd.scss'

const SourceAdd = observer(({ store }) => {
    const { updateModal, modal } = store
    return (
        <Box onClick={() => updateModal({ ...modal, opened: true, type: 'add' })} className="addBlock">
            <span className="dashing"><i></i></span>
            <span className="dashing rotated"><i></i></span>
            <span className="dashing"><i></i></span>
            <span className="dashing rotated"><i></i></span>
            <Typography classes={{ root: 'addText' }}>New source</Typography>
            <AddRoundedIcon classes={{ root: 'addIcon' }} />
        </Box>
    )
})

export default SourceAdd
