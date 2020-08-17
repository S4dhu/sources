export const CHANGE_MODAL_STATE = 'CHANGE_MODAL_STATE'
export const REFETCH_SOURCES = 'REFETCH_SOURCES'

export const openModal = modal => ({
    type: CHANGE_MODAL_STATE,
    modal,
});

export const refetchSources = refetchHash => ({
    type: REFETCH_SOURCES,
    refetchHash,
})