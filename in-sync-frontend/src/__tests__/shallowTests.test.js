import React from 'react';
import { shallow } from 'enzyme';
import EmbeddedVideo from '../components/EmbeddedVideo';
import thunk from 'redux-thunk';
import LoginPage from '../pages/LoginPage';
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Header from '../common/Header';

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

describe('<EmbeddedVideo />', () => {
    it('renders components', () => {
        const wrapper = shallow(<EmbeddedVideo />);
        expect(wrapper).toContainExactlyOneMatchingElement('ReactPlayer');
    })
});

describe('<LoginPage />', () => {
    it('renders components', () => {
        const initialState = {}
        const store = mockStore(initialState)
        const wrapper = shallow(
            <Provider store={store}>
                <LoginPage />
            </Provider>).dive();
        expect(wrapper.find(Header)).toHaveLength(1);
    })
});