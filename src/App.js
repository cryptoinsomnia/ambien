import React from 'react';
import { Button } from 'antd';
import { pure, compose, withState, withHandlers } from 'recompose';

const App = ({ isShowing, show, hide }) => (
  <div>
    <Button onClick={isShowing ? hide : show}> Toggle </Button>
    {isShowing && 
      <div>
        YO
      </div>
    }
  </div>
)

export default compose(
  pure,
  withState('isShowing', 'setShowing', false),
  withHandlers({
    show: ({ setShowing }) => () => setShowing(true),
    hide: ({ setShowing }) => () => setShowing(false),
  })
)(App);
