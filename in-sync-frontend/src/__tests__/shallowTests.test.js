import React from 'react';
import { shallow } from 'enzyme';
import EmbeddedVideo from '../components/EmbeddedVideo/EmbeddedVideo';

describe('<EmbeddedVideo />', () => {
    it('renders components', () => {
        const wrapper = shallow(<EmbeddedVideo />);
        expect(wrapper).toContainExactlyOneMatchingElement('ReactPlayer');
    })
});
