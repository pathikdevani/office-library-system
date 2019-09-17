import { css } from 'styled-components';

const sizes = {
  ps: {
    max: 320,
    min: null,
  },
  pn: {
    max: 598,
    min: 321,
  },
  ph: {
    max: 599,
    min: null,
  },
  tp: {
    max: null,
    min: 600,
  },
  tl: {
    max: null,
    min: 900,
  },
  d: {
    max: null,
    min: 1200,
  },
  dl: {
    max: null,
    min: 1800,
  },
};

// / Iterate through the sizes and create a media template
const media = Object.keys(sizes).reduce((acc, label) => {
  const device = sizes[label];

  if (device.max && device.min) {
    acc[label] = (...args) => css`
      @media all and (min-width: ${device.min}px) and (max-width: ${device.max}px) {
        ${css(...args)}
      }
    `;
  } else if (device.min) {
    acc[label] = (...args) => css`
      @media all and (min-width: ${device.min}px) {
        ${css(...args)}
      }
    `;
  } else if (device.max) {
    acc[label] = (...args) => css`
      @media all and (max-width: ${device.max}px) {
        ${css(...args)}
      }
    `;
  }
  return acc;
}, {});

export default media;
