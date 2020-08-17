import { CHANGE_MODAL_STATE, REFETCH_SOURCES } from './actions'

const initialState = {
    modal: '',
    refetchHash: '',
}

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case CHANGE_MODAL_STATE: {
            return action.modal
        }
        case REFETCH_SOURCES: {
            return action.refetchHash
        }
        default:
            return state;
    }
};
  
export default rootReducer;