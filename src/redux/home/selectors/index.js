import { createSelector } from 'reselect';

const getAcf = ({ home } = {}) => home?.data[0]?.acf || {};
const getDescription = (state) => getAcf(state).description;
const getHeading = (state) => getAcf(state).heading;

const getSimple = createSelector(
    [getDescription, getHeading],
    (description, heading) => ({
        description,
        heading
    })
);

export default {
    getSimple
};
