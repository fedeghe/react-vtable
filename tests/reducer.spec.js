/**
 * @jest-environment jsdom
 */
import reducerFactory from './../source/HyperTable/reducer'
import zeroConfig from './configs/zero'

import zeroState from './states/zero'

describe('reducer', function () {
    const { init } = reducerFactory()
    it('initialise as expected', () => {
        const state = init(zeroConfig);
// console.log(JSON.stringify(state))
        // expect(true).toBeTruthy()
        expect(state).toMatchObject(zeroState)
    });
});