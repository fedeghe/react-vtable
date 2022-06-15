/**
 * @jest-environment jsdom
 */
import reducerFactory from './../source/HyperTable/reducer'
import basicConfig from './configs/basic'
import zeroState from './states/zero'

describe('reducer', function () {
    const { init } = reducerFactory()
    it('initialise as expected', () => {
        const state = init(basicConfig);
        expect(state).toMatchObject(zeroState)
    });
});