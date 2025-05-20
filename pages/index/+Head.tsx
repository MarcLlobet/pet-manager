import React from "react";
import ReactDOMServer from "react-dom/server";

import logoUrl from "/logo.svg";
import { ServerStyleSheet } from "styled-components";
import { usePageContext } from "vike-react/usePageContext";

export const Head = () => {
  const pageContext = usePageContext();
  const { Page } = pageContext ?? {};
  const sheet = new ServerStyleSheet();

  if (!Page) return null;

  const pageStyles = sheet.collectStyles(<Page />);

  try {
    ReactDOMServer.renderToString(pageStyles);
  } catch {
    return null;
  }

  const styleElements = sheet.getStyleElement() ?? [];

  return (
    <>
      <link rel="icon" href={logoUrl}></link>

      {styleElements.map((styleElement) => (
        <style key={styleElement.key} {...styleElement.props} />
      ))}
    </>
  );
};
