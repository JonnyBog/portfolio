import createRequest from '.';

describe('Create request', () => {
    it('should return an empty object if there is no name', () => {
        expect(createRequest({ endpoint: 'test' })).toEqual({});
    });

    it('should return an empty object if there is no endpoint', () => {
        expect(createRequest({ name: 'test' })).toEqual({});
    });
});
