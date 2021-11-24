let lastScrollTop: number;

import { Dispatch, SetStateAction } from "react";

export const SubmenuRoller = ({
  setshowSubMenu,
}: {
  setshowSubMenu: Dispatch<SetStateAction<boolean>>;
}) => {
  const st = window.pageYOffset || document.documentElement.scrollTop;

  if (st > lastScrollTop && st) {
    setshowSubMenu(false);
  } else if (st) {
    setshowSubMenu(true);
  }
  lastScrollTop = st;
};
