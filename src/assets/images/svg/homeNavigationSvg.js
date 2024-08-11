import React from 'react';
import { SvgXml } from 'react-native-svg';
import { useTheme } from '../../../core/dopebase';

const homeNavigationSvg = (activeBtn) => {
  const { theme, appearance } = useTheme();
  const colorSet = theme.colors[appearance];
  let svgXml;
  if (activeBtn == 1) {
    svgXml = `
    <svg xmlns="http://www.w3.org/2000/svg" width="33" height="32" viewBox="0 0 33 32" fill="none">
  <path d="M25.1007 26.6667C26.3243 26.6667 27.3819 25.8301 27.5461 24.6176C27.7022 23.4651 27.8494 21.8798 27.8494 20C27.8494 16 28.0739 13.5579 23.8494 9.33337C21.9009 7.38491 19.7247 5.89202 18.2527 4.98788C17.1799 4.32891 15.8522 4.32891 14.7794 4.98787C13.3075 5.89202 11.1312 7.38491 9.18273 9.33337C4.9582 13.5579 5.18274 16 5.18274 20C5.18274 21.8798 5.32996 23.4651 5.48604 24.6176C5.65026 25.8301 6.70782 26.6667 7.93147 26.6667H25.1007Z" stroke="${colorSet.primaryButtonTabActive}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;
  } else {
    svgXml = `<svg xmlns="http://www.w3.org/2000/svg" width="27" height="26"  viewBox="0 0 33 32" fill="none">
  <g opacity="0.5">
    <path d="M25.1007 26.6667C26.3243 26.6667 27.3819 25.8301 27.5461 24.6176C27.7022 23.4651 27.8494 21.8798 27.8494 20C27.8494 16 28.0739 13.5579 23.8494 9.33337C21.9009 7.38491 19.7247 5.89202 18.2527 4.98788C17.1799 4.32891 15.8522 4.32891 14.7794 4.98787C13.3075 5.89202 11.1312 7.38491 9.18273 9.33337C4.9582 13.5579 5.18274 16 5.18274 20C5.18274 21.8798 5.32996 23.4651 5.48604 24.6176C5.65026 25.8301 6.70782 26.6667 7.93147 26.6667H25.1007Z" stroke="${colorSet.primaryButtonTabNonActive}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
</svg>`
  }

  return <SvgXml xml={svgXml} />;
};

export default homeNavigationSvg;