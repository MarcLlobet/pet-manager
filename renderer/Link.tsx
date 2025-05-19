import React from "react";
import { usePageContext } from "vike-react/usePageContext";
import { navigate } from "vike/client/router";

const handleClick = async (event: React.MouseEvent<HTMLAnchorElement>) => {
  event.preventDefault();
  const anchor = event.target as HTMLAnchorElement;

  const navigationPromise = navigate(anchor.href, {
    overwriteLastHistoryEntry: true,
  });

  await navigationPromise;
};

export function Link({ href, children }: { href: string; children: React.ReactNode }) {
  const { urlPathname } = usePageContext();
  const isActive = href === "/" ? urlPathname === href : urlPathname.startsWith(href);

  return (
    <a href={href} style={{ display: "flex" }} className={isActive ? "is-active" : undefined} onClick={handleClick}>
      {children}
    </a>
  );
}
