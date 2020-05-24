import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'
import { userActions } from '../../_actions';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares);

describe('async actions', () => {
    afterEach(() => {
        fetchMock.restore();
    })

    it('creates LOGIN_SUCCESS when fetching login is done', () => {
        fetchMock.post('/login'), {
            response: {
                foundUser: "user",
                token: "token"
            }
        }

        const expectedActions= [
            {type: "USERS_LOGIN_REQUEST", user: {username: "test", password: "test", joiningRoom: false} },
            {type: "USERS_LOGIN_SUCCESS", user: {foundUser: "user", token:"token"}}
        ]
        
        const store = mockStore({user: {}});

        return store.dispatch(userActions.login("test", "test", false)).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        })
    })
})




