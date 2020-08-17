import React from 'react'
import { connect } from 'react-redux'
import { refetchSources, openModal } from '../../redux/actions'
import { Box, Link } from '@material-ui/core'
import PreviewImage from '../PreviewImage'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import EditIcon from '@material-ui/icons/Edit';
import { deleteSourceById, updateSourceById } from '../../api'
import { getValidUrl } from '../../helpers/checkUrl'

import './SourceBlock.scss'

const SourceBlock = ({ dispatch, source }) => {
    const deleteSource = async () => {
        await deleteSourceById(source._id)
        .then(() => dispatch(refetchSources({ refetchHash: `${source._id}_delete` })))
        .catch(err => console.error(err))
    }

    const openEditModal = () => {
        dispatch(openModal({ modal: { opened: true, type: 'edit', data: source } }))
    }

    return (
        <Box className="sourceBox">
            <Link className="linkContainer" target="_blank" href={getValidUrl(source.link)} color="initial" underline="none">
                <PreviewImage imageLink={`${getValidUrl(source.link)}/favicon.ico`} />
                <Box className="title">{source.name}</Box>
            </Link>
            <EditIcon onClick={openEditModal} classes={{ root: 'icon' }} />
            <DeleteForeverIcon onClick={deleteSource} classes={{ root: 'icon icon_last' }} />
        </Box>
    )
}

export default connect()(SourceBlock)
