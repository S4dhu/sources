import React from 'react'
import { connect } from 'react-redux'
import { Modal } from '@material-ui/core'
import { openModal } from '../../redux/actions'


const FlexModal = ({ dispatch, children, modal }) => {

    const closeModal = () => {
        dispatch(openModal({ modal: '' }))
    }

    return (
        <Modal open={modal !== ''} className="modal" onClose={closeModal}>
            <>
                {children}
            </>
        </Modal>
    )
}

const mapStateToProps = (state, ownProps) => ({
    children: ownProps.children
})

export default connect(mapStateToProps)(FlexModal)

// import React from 'react'
// import { Modal } from '@material-ui/core'

// const FlexModal = props => {
//     return (
//         <Modal open>
//             <div>1</div>
//         </Modal>
//     )
// }

// export default FlexModal
