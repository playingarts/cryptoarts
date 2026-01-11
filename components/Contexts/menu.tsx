import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";
import dynamic from "next/dynamic";
import MenuPortal from "../Header/MainMenu/MenuPortal";
import ErrorBoundary from "../ErrorBoundary";

// Lazy load MainMenu
const MainMenu = dynamic(() => import("../Header/MainMenu"), { ssr: false });

interface MenuContextValue {
  showMenu: boolean;
  setShowMenu: (show: boolean) => void;
  openMenu: () => void;
  closeMenu: () => void;
}

const MenuContext = createContext<MenuContextValue | null>(null);

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error("useMenu must be used within a MenuProvider");
  }
  return context;
};

/**
 * MenuProvider - Keeps the menu mounted at app level to persist across navigations
 */
export const MenuProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = useCallback(() => setShowMenu(true), []);
  const closeMenu = useCallback(() => setShowMenu(false), []);

  return (
    <MenuContext.Provider value={{ showMenu, setShowMenu, openMenu, closeMenu }}>
      {children}
      <MenuPortal show={showMenu}>
        <ErrorBoundary fallback={null}>
          <MainMenu setShow={setShowMenu} show={showMenu} />
        </ErrorBoundary>
      </MenuPortal>
    </MenuContext.Provider>
  );
};
