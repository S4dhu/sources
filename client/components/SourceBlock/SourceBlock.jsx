import React from 'react'
import { connect } from 'react-redux'
import { refetchSources } from '../../redux/actions'
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

    const editSource = async payload => {
        await updateSourceById(source._id, payload)
        .then(() => dispatch(refetchSources({ refetchHash: `${source._id}_edit` })))
    }

    return (
        <Box className="sourceBox">
            <Link className="linkContainer" target="_blank" href={getValidUrl(source.link)} color="initial" underline="none">
                <PreviewImage imageLink={`${getValidUrl(source.link)}/favicon.ico`} />
                <Box className="title">{source.name}</Box>
            </Link>
            <EditIcon onClick={editSource} classes={{ root: 'icon icon_first' }} />
            <DeleteForeverIcon onClick={deleteSource} classes={{ root: 'icon icon_last' }} />
        </Box>
    )
}

const mapStateToProps = (state, ownProps) => ({
    source: ownProps.source
})

export default connect(mapStateToProps)(SourceBlock)
