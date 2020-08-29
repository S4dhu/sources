import React from 'react'
import { Modal } from '@material-ui/core'
import { observer } from 'mobx-react';


const FlexModal = observer(({ store, children, opened }) => {
    const { updateModal, modal } = store

    const closeModal = () => {
        updateModal({ ...modal, opened: false, type: '' })
    }
    // @TODO: Check two redux states at same time and chanched opened props at MainPage
    return (
        <Modal open={opened && opened.opened} className="modal" onClose={closeModal}>
            <>
                {children}
            </>
        </Modal>
    )
})

export default FlexModal
