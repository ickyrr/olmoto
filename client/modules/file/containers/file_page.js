import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';

import FilePage from '../components/file_page.jsx';

export const composer = ({context}, onData) => {
  const {Meteor, Collections} = context();
  onData(null, {});
};

export const depsMapper = (context, actions) => ({
  context: () => context,
  upload: actions.files.upload,
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(FilePage);
