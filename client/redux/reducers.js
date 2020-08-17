import { CHANGE_MODAL_STATE, REFETCH_SOURCES } from './actions'

const initialState = {
    modal: { opened: false, type: '' },
    refetchHash: '',
}

const rootReducer = (state = initialState, action) => {
    if (action.type === CHANGE_MODAL_STATE) {
        return action.modal
    }
    if (action.type === REFETCH_SOURCES) {
        return action.refetchHash
    }
    return state;
};
  
export default rootReducer;