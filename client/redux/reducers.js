function rootReducer(state = {}, action) {
    switch (action.type) {
        case 'CHANGE': {
            return action.modal
        }
        default:
            return state;
    }
};
  
export default rootReducer;