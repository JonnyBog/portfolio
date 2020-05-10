import selectors from '.';

describe('Selectors: projects', () => {
    describe('getProjects', () => {
        it('returns the default state', () => {
            expect(selectors.getProjects()).toEqual([]);
        });

        it('returns the correct state', () => {
            expect(
                selectors.getProjects({
                    projects: {
                        data: 'test'
                    }
                })
            ).toEqual('test');
        });
    });
});
