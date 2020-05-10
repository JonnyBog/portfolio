import { createSelector } from 'reselect';

const getAcf = ({ contact } = {}) => contact?.data[0]?.acf || {};
const getDescription = (state) => getAcf(state).description;
const getNumber = (state) => getAcf(state).number;
const getEmail = (state) => getAcf(state).email;

const getSimple = createSelector(
    [getDescription, getNumber, getEmail],
    (description, number, email) => ({
        description,
        number,
        email
    })
);

export default {
    getSimple
};
