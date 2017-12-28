// @flow
import * as React from 'react';
import { withStateHandlers } from 'recompose';
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
    {isShowing && <div>Showing</div>}
  </div>
);

const enhance: HOC<*, Props> = withStateHandlers(
  { isShowing: false },
  {
    show: () => () => ({ isShowing: true }),
    hide: () => () => ({ isShowing: false }),
  }
);

export default enhance(App);
