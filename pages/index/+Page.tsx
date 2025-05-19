import React from "react";
import styled from "styled-components";
import { Counter } from "./Counter.js";

const Wrapper = styled.div`
  background: red;
`;

export default function Page() {
  return (
    <Wrapper>
      <h1>My Vike app</h1>
      This page is:
      <ul>
        <li>Rendered to HTML.</li>
        <li>
          Interactive. <Counter />
        </li>
      </ul>
    </Wrapper>
  );
}
