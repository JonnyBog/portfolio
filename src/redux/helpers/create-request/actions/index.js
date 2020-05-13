import axios from 'axios';

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

export default ({ types, endpoint, params = {} } = {}) => {
    const {
        fetchData,
        fetchDataSuccess,
        fetchDataError,
        fetchDataReset: requestReset
    } = createActions(types);

    return {
        requestData: ({ params: dynamicParams = {} } = {}) => async (
            dispatch
        ) => {
            dispatch(fetchData());
            try {
                const response = await axios.get(endpoint, {
                    params: {
                        ...params,
                        ...dynamicParams
                    }
                });
                dispatch(fetchDataSuccess(response?.data));
            } catch (error) {
                dispatch(fetchDataError());
            }
        },
        requestReset
    };
};
