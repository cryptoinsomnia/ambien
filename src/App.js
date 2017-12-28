// @flow
import React from 'react';
import { compose, pure, withStateHandlers } from 'recompose';
import { Button } from 'antd';
import type { HOC } from 'recompose';

type Props = {
  isShowing: boolean,
  show: () => void,
  hide: () => void,
};

const App = ({ isShowing, show, hide }: Props) => (
  <div>
    <Button onClick={isShowing ? hide : show}>Toggle</Button>
    {isShowing && <div>YO</div>}
  </div>
);

const enhance: HOC<*, Props> = compose(
  pure,
  withStateHandlers(
    { isShowing: false },
    {
      show: () => () => ({ isShowing: true }),
      hide: () => () => ({ isShowing: false }),
    }
  )
);

export default enhance(App);
