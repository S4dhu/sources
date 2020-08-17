import React from 'react'
import { connect } from 'react-redux'
import { Modal } from '@material-ui/core'
import { openModal } from '../../redux/actions'


const FlexModal = ({ dispatch, children, opened }) => {
    console.log(opened)

    const closeModal = () => {
        dispatch(openModal({ modal: { opened: false, type: '' } }))
    }
    // @TODO: Check two redux states at same time and chanched opened props at MainPage
    return (
        <Modal open={opened && opened.opened} className="modal" onClose={closeModal}>
            <>
                {children}
            </>
        </Modal>
    )
}

export default connect()(FlexModal)
