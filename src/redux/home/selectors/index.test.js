import selectors from '.';

describe('Selectors: home', () => {
    describe('getSimple', () => {
        describe('heading', () => {
            it('returns the default state', () => {
                expect(selectors.getSimple().heading).toBeUndefined();
            });

            it('returns the correct state', () => {
                expect(
                    selectors.getSimple({
                        home: {
                            data: [
                                {
                                    acf: {
                                        heading: 'test'
                                    }
                                }
                            ]
                        }
                    }).heading
                ).toEqual('test');
            });
        });

        describe('description', () => {
            it('returns the default state', () => {
                expect(selectors.getSimple().description).toBeUndefined();
            });

            it('returns the correct state', () => {
                expect(
                    selectors.getSimple({
                        home: {
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
    });
});
