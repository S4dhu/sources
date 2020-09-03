import React from 'react'
import { Box, Link } from '@material-ui/core'
import PreviewImage from '../PreviewImage'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import EditIcon from '@material-ui/icons/Edit';
import { deleteSourceById } from 'api'
import { getValidUrl } from 'helpers/checkUrl'
import { observer } from 'mobx-react';

import './SourceBlock.scss'

const SourceBlock = observer(({ store, source }) => {
    const { setRefetchHash, updateModal, modal } = store
    const deleteSource = async () => {
        await deleteSourceById(source._id)
        .then(() => setRefetchHash(`${source._id}_delete`))
        .catch(err => console.error(err))
    }

    const openEditModal = () => {
        updateModal({ ...modal, opened: true, type: 'edit', data: source })
    }

    return (
        <Box className="sourceBox">
            <Link className="linkContainer" target="_blank" href={getValidUrl(source.link)} color="initial" underline="none">
                <PreviewImage imageLink={`https://www.google.com/s2/favicons?domain=${getValidUrl(source.link)}`} />
                <Box className="title">{source.name}</Box>
            </Link>
            <Box className="actions">
                <EditIcon onClick={openEditModal} classes={{ root: 'icon icon_first' }} />
                <DeleteForeverIcon onClick={deleteSource} classes={{ root: 'icon icon_last' }} />
            </Box>
        </Box>
    )
})

export default SourceBlock
