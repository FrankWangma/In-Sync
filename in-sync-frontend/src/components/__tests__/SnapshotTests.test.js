import React from 'react';
import renderer from 'react-test-renderer';
import AddVideoModal from '../AddVideoModal';

it('renders correctly', () => {
    const tree = renderer
    .create(<AddVideoModal/>)
    .toJSON;
    expect(tree).ToMatchSnapshots();
})

