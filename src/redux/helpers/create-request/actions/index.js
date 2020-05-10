const createActions = ({ pending, success, error, reset }) => ({
    fetchData: () => ({
        type: pending
    }),
    fetchDataSuccess: (data) => ({
        type: success,
        data
    }),
    fetchDataError: () => ({
        type: error
    }),
    fetchDataReset: () => ({
        type: reset
    })
});

export default ({ types, endpoint: initialEndpoint }) => {
    const {
        fetchData,
        fetchDataSuccess,
        fetchDataError,
        fetchDataReset: requestReset
    } = createActions(types);

    return {
        requestData: (slug) => (dispatch) => {
            const endpoint = slug
                ? `${initialEndpoint}&slug=${slug}`
                : initialEndpoint;
            dispatch(fetchData());
            return fetch(endpoint)
                .then((response) => response.json())
                .then(
                    (data) => dispatch(fetchDataSuccess(data)),
                    () => dispatch(fetchDataError())
                );
        },
        requestReset
    };
};
