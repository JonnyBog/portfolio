export const initialState = {
    isInitial: true,
    isPending: false,
    data: [],
    hasError: false
};

export default (types) => (state = initialState, { type, data }) => {
    switch (type) {
        case types.pending:
            return {
                ...state,
                isPending: true,
                isInitial: false
            };
        case types.success:
            return {
                ...state,
                isInitial: false,
                isPending: false,
                data
            };
        case types.error:
            return {
                ...state,
                isInitial: false,
                isPending: false,
                hasError: true
            };
        case types.reset:
            return {
                ...state,
                ...initialState
            };
        default:
            return state;
    }
};
