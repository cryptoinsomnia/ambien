import React from 'react';
import { pure, compose, withState, withHandlers } from 'recompose';
import { Button } from 'antd';

const App = ({ isShowing, show, hide }) => (
  <div>
    <Button onClick={isShowing ? hide : show}> Toggle </Button>
    {isShowing && <div>YO</div>}
  </div>
);

export default compose(
  pure,
  withState('isShowing', 'setShowing', false),
  withHandlers({
    show: ({ setShowing }) => () => setShowing(true),
    hide: ({ setShowing }) => () => setShowing(false),
  })
)(App);
