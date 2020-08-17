import React from 'react'
import { connect } from 'react-redux'
import { Box } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import PropTypes from 'prop-types'
import { openModal } from '../../redux/actions'

import './SourceAdd.scss'

const SourceAdd = ({ dispatch }) => {
    return (
        <Box onClick={() => dispatch(openModal({ modal: 'add' }))} className="addBlock">
            <AddIcon classes={{ root: "addIcon" }} />
        </Box>
    )
}

SourceAdd.propTypes = {
    openModal: PropTypes.func,
    modal: PropTypes.string
}

export default connect()(SourceAdd)
