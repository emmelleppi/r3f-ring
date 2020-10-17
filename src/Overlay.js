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
              font-size: 6rem;
              line-height: 0.6rem;
              letter-spacing: 1.5rem;
              font-family: Cormorant Garamond;
            `}
          >
            DISTORTED VERTICES
          </div>
          <div
            css={`
              font-size: 4.5rem;
              font-family: Liu Jian Mao Cao;
            `}
          >
            on a beautiful golden torus
          </div>
        </div>
      </div>
    </div>
  );
}

export function Socials() {
  return (
    <>
      <div
        css={`
          position: absolute;
          right: 50px;
          top: 50px;
          display: flex;
          gap: 4rem;
          font-size: 1.5rem;
          font-weight: 500;
          font-family: Arial;
          letter-spacing: 0.3rem;
        `}
      >
        <a href="https://twitter.com/pmndrs">Twitter</a>
        <a href="https://github.com/pmndrs">Github</a>
        <a href="https://pmnd.rs/discord">Discord</a>
      </div>
    </>
  );
}
