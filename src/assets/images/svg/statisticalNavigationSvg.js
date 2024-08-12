import React from 'react';
import { SvgXml } from 'react-native-svg';
import { useTheme } from '../../../core/dopebase';

const statisticalNavigationSvg = (activeBtn) => {
  const { theme, appearance } = useTheme();
  const colorSet = theme.colors[appearance];
  let svgXml;
  if (activeBtn == 1) {
    svgXml = `<svg xmlns="http://www.w3.org/2000/svg" width="33" height="32" viewBox="0 0 32 32" fill="none">
  <path d="M21.3334 21.3334V16.0001M16 21.3334V10.6667M10.6667 21.3334V18.6667M4.66669 16.0001C4.66669 7.33341 7.33335 4.66675 16 4.66675C24.6667 4.66675 27.3334 7.33341 27.3334 16.0001C27.3334 24.6667 24.6667 27.3334 16 27.3334C7.33335 27.3334 4.66669 24.6667 4.66669 16.0001Z" stroke="${colorSet.primaryButtonTabActive}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
  } else {
    svgXml = `<svg xmlns="http://www.w3.org/2000/svg" width="27" height="26" viewBox="0 0 32 32" fill="none">
  <path d="M21.3334 21.3334V16.0001M16 21.3334V10.6667M10.6667 21.3334V18.6667M4.66669 16.0001C4.66669 7.33341 7.33335 4.66675 16 4.66675C24.6667 4.66675 27.3334 7.33341 27.3334 16.0001C27.3334 24.6667 24.6667 27.3334 16 27.3334C7.33335 27.3334 4.66669 24.6667 4.66669 16.0001Z" stroke="${colorSet.primaryButtonTabNonActive}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" opacity="0.5"/>
</svg>`
  }

  return <SvgXml xml={svgXml} />;
};

export default statisticalNavigationSvg;