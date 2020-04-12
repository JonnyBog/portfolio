import getPredicateHelper from '../../../lib/helpers/get-predicate';

import homeSelectors from '.';

describe('Selectors: home', () => {
    describe('getPredicate', () => {
        it('returns the default state', () => {
            expect(homeSelectors.getPredicate()).toEqual(getPredicateHelper());
        });

        it('returns the correct state', () => {
            expect(
                homeSelectors.getPredicate({
                    home: {
                        isInitial: 'isInitial',
                        isPending: 'isPending',
                        hasError: 'hasError'
                    }
                })
            ).toEqual(
                getPredicateHelper({
                    isInitial: 'isInitial',
                    isPending: 'isPending',
                    hasError: 'hasError',
                    data: ''
                })
            );
        });
    });

    describe('getSimple', () => {
        describe('heading', () => {
            it('returns the default state', () => {
                expect(homeSelectors.getSimple().heading).toBeUndefined();
            });

            it('returns the correct state', () => {
                expect(
                    homeSelectors.getSimple({
                        home: {
                            data: {
                                acf: {
                                    heading: 'test'
                                }
                            }
                        }
                    }).heading
                ).toEqual('test');
            });
        });

        describe('description', () => {
            it('returns the default state', () => {
                expect(homeSelectors.getSimple().heading).toBeUndefined();
            });

            it('returns the correct state', () => {
                expect(
                    homeSelectors.getSimple({
                        home: {
                            data: {
                                acf: {
                                    description: 'test'
                                }
                            }
                        }
                    }).description
                ).toEqual('test');
            });
        });
    });
});
