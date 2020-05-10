import selectors from '.';

describe('Selectors: contact', () => {
    describe('getSimple', () => {
        describe('description', () => {
            it('returns the default state', () => {
                expect(selectors.getSimple().description).toBeUndefined();
            });

            it('returns the correct state', () => {
                expect(
                    selectors.getSimple({
                        contact: {
                            data: [
                                {
                                    acf: {
                                        description: 'test'
                                    }
                                }
                            ]
                        }
                    }).description
                ).toEqual('test');
            });
        });

        describe('number', () => {
            it('returns the default state', () => {
                expect(selectors.getSimple().number).toBeUndefined();
            });

            it('returns the correct state', () => {
                expect(
                    selectors.getSimple({
                        contact: {
                            data: [
                                {
                                    acf: {
                                        number: 'test'
                                    }
                                }
                            ]
                        }
                    }).number
                ).toEqual('test');
            });
        });

        describe('email', () => {
            it('returns the default state', () => {
                expect(selectors.getSimple().email).toBeUndefined();
            });

            it('returns the correct state', () => {
                expect(
                    selectors.getSimple({
                        contact: {
                            data: [
                                {
                                    acf: {
                                        email: 'test'
                                    }
                                }
                            ]
                        }
                    }).email
                ).toEqual('test');
            });
        });
    });
});
