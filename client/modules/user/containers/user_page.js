import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';

import UserPage from '../components/user_page.jsx';

export const composer = ({context}, onData) => {
  const {Meteor, Collections} = context();

  onData(null, {});
};

export const depsMapper = (context, actions) => ({
  context: () => context,
  insert: actions.users.insert,
  setLocalState: actions.core.setLocalState,
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(UserPage);
