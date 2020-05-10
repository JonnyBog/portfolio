const PREFIX = 'FETCH_';

export default (name) => {
    const TYPE = name.toUpperCase();

    return {
        pending: `${PREFIX}${TYPE}`,
        success: `${PREFIX}${TYPE}_SUCCESS`,
        error: `${PREFIX}${TYPE}_ERROR`,
        reset: `${PREFIX}${TYPE}_RESET`
    };
};
