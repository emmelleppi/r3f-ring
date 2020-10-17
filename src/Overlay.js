import React from "react";
import "styled-components/macro";

export default function Overlay() {
  return (
    <div
      css={`
        pointer-events: none;
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
      `}
    >
      <div
        css={`
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        `}
      >
        <div
          css={`
            text-align: center;
            color: #ffffff;
          `}
        >
          <div
            css={`
              white-space: pre;
              margin-bottom: 2.5rem;
              font-size: 3rem;
              line-height: 4rem;
              font-weight: 600;
              letter-spacing: 1rem;
              white-space: inherit;
              font-family: Cormorant Garamond;
              
              @media screen and (min-width: 426px) {
                font-weight: 400;
                line-height: 5rem;
                font-size: 6rem;
                letter-spacing: 1.5rem;
              }
            `}
          >
            DISTORTED VERTICES
          </div>
          <div
            css={`
              font-size: 2rem;
              font-family: Liu Jian Mao Cao;
              @media screen and (min-width: 426px) {
                font-size: 4.5rem;
              }
            `}
          >
            on a beautiful golden torus
          </div>
        </div>
      </div>
    </div>
  );
}
