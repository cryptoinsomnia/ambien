// @flow
import { css } from 'styled-components';

// Note some of these colors are referenced in config-overrides.js as well.
export const colors = {
  whiteBackground: '#fff',
  lightGrey: 'rgba(0, 0, 0, 0.25)',
  grey: 'rgba(0, 0, 0, 0.45)',
  darkGrey: 'rgba(0, 0, 0, 0.65)',
  blue: '#0f215b',
  black: 'black',
};

export const boxShadow = '0 2px 8px #e8e8e8';
export const borderRadius = '3px';

// The same values ant uses
const sizes = {
  xs: 480,
  sm: 596,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1600,
};

// iterate through the sizes and create a media template
export const media = Object.keys(sizes).reduce((accumulator, label) => {
  // use em in breakpoints to work properly cross-browser and support users
  // changing their browsers font-size: https://zellwk.com/blog/media-query-units/
  const emSize = sizes[label] / 16;
  accumulator[label] = (...args) => css`
    @media (max-width: ${emSize}em) {
      ${css(...args)};
    }
  `;
  return accumulator;
}, {});
