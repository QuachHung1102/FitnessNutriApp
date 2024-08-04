import React from 'react';
import {Svg, Path, SvgXml} from 'react-native-svg';

const PrevSvg = () => {
  const svgXml = `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none">
      <g clip-path="url(#clip0_2906_2828)">
        <path
          d="M11.742 16.5H30V19.5H11.742L19.788 27.546L17.667 29.667L6 18L17.667 6.33301L19.788 8.45401L11.742 16.5Z"
          fill="#F7F8F8"
        />
      </g>
      <defs>
        <clipPath id="clip0_2906_2828">
          <rect width="36" height="36" fill="white" />
        </clipPath>
      </defs>
    </svg>
  `;

  return <SvgXml xml={svgXml} />;
};

export default PrevSvg;
