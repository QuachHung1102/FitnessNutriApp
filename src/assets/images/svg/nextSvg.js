import React from 'react';
import {SvgXml} from 'react-native-svg';

const NextSvg = () => {
  const svgXml = `
    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none">
  <path d="M24.258 19.5L6 19.5L6 16.5L24.258 16.5L16.212 8.45399L18.333 6.33299L30 18L18.333 29.667L16.212 27.546L24.258 19.5Z" fill="#F7F8F8"/>
</svg>
  `;

  return <SvgXml xml={svgXml} />;
};

export default NextSvg;
