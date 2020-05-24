import rootReducer from "../../_reducers";
import { createStore } from 'redux';

let store;

beforeEach(() => {
    store = createStore(rootReducer);
})

it('check the intial store state', () => {
    const keys = Object.keys(store.getState());
    expect(keys.length).toBe(3);
    expect(keys[0]).toBe('authentication');
    expect(store.getState.authentication).toBe(undefined);
    expect(keys[1]).toBe('registration');
    expect(store.getState.registration).toBe(undefined);
    expect(keys[2]).toBe('alert');
    expect(store.getState.alert).toBe(undefined);
})


