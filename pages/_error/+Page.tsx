import React from "react";
import styled from "styled-components";
import { usePageContext } from "vike-react/usePageContext";

const Wrapper = styled.main`
  width: 100%;
`;

export default function Page() {
  const { is404 } = usePageContext() ?? {};
  if (is404) {
    return (
      <Wrapper>
        <h1>404 Page Not Found</h1>
        <p>This page could not be found.</p>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <h1>500 Internal Server Error</h1>
      <p>Something went wrong.</p>
    </Wrapper>
  );
}
