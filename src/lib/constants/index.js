export const routes = {
    home: '/',
    project: '/project',
    contact: '/contact'
};

export const api = 'http://www.boggonbone.co.uk/jonny/wp-json/wp/v2';

export const prependRequest =
    window.location.hostname === 'localhost'
        ? ''
        : 'https://cors-anywhere.herokuapp.com/';
