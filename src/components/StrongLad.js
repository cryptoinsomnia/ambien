// @flow
import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { withState, compose } from 'recompose';

import Text from './Text';
import { Flex } from './Layout';
import UserAvatar from './UserAvatar';

import { type SmallUser } from '../types/api';

const AllUsers = gql`
  query AllUsers {
    allUsers {
      id
      name
      username
    }
  }
`;

// class StrongLad extends Component {
//   state = {
//     filterValue: '',
//   };

//   render() {
//     const { allUsers, loading } = this.props.data;
//     const { filterValue } = this.state;
//     return (
//       <Flex align="center" direction="column">
//         <input
//           id="filter"
//           type="text"
//           value={filterValue}
//           onChange={e => {
//             this.setState({
//               filterValue: e.target.value,
//             });
//           }}
//         />
//         <Text size="medium" bold>
//           STRONG LADS
//           {!loading &&
//             allUsers
//               .filter(({ username }) => {
//                 return username.includes(filterValue);
//               })
//               .map(user => <UserAvatar key={user.id} {...user} size="large" />)}
//         </Text>
//       </Flex>
//     );
//   }
// }

type StrongLadData = {|
  allUsers: Array<SmallUser>,
  loading: boolean,
|};

type Props = {|
  data: StrongLadData,
  filterValue: string,
  setFilterValue: string => void,
|};

const StrongLad = ({
  data: { allUsers, loading },
  filterValue,
  setFilterValue,
}: Props) => (
  <Flex align="center" direction="column">
    <input
      id="filter"
      type="text"
      value={filterValue}
      onChange={e => setFilterValue(e.target.value)}
    />
    <Text size="medium" bold>
      STRONG LADS
      {!loading &&
        allUsers
          .filter(({ username }) => {
            return username.includes(filterValue);
          })
          .map(user => <UserAvatar key={user.id} {...user} size="large" />)}
    </Text>
  </Flex>
);

// compose(f,g,x) => f(g(x))
const withAllUsers = graphql(AllUsers);
const withFilterValue = withState('filterValue', 'setFilterValue', '');
export default compose(withAllUsers, withFilterValue)(StrongLad);
