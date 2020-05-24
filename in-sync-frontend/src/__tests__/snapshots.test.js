import React from 'react';
import renderer from 'react-test-renderer';

import AddVideoModal from '../components/Modals/AddVideoModal';
import UserList from '../components/UserList/UserList';
import InviteModal from '../components/Modals/InviteModal';
import EmbeddedVideo from '../components/EmbeddedVideo/EmbeddedVideo';


it(' AddVideoModal renders correctly with no content', () => {
  const tree = renderer.create(<AddVideoModal />).toJSON();
  expect(tree).toMatchSnapshot();
});

it(' UserList renders correctly', () => {
  const tree = renderer.create(<UserList users={[]}/>).toJSON();
  expect(tree).toMatchSnapshot();
});

it(' InviteModal renders correctly', () => {
  const tree = renderer.create(<InviteModal />).toJSON();
  expect(tree).toMatchSnapshot();
});

it(' EmbeddedVideo renders correctly', () => {
    const tree = renderer.create(<EmbeddedVideo />).toJSON();
    expect(tree).toMatchSnapshot();
});