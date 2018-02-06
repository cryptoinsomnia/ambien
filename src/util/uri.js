// @flow
import URI from 'jsuri';
import { type Location } from 'react-router';

/**
 * Util function to create a `jsuri` URI object from a react-router location.
 */
export const locationToUri = (location: Location): URI => {
  const { pathname, search } = location;
  return new URI().setPath(pathname).setQuery(search);
};
