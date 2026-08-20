import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * ScrollToTop
 * ---------------------------------------------------------------
 * Drop this once inside <BrowserRouter> in App.jsx (above your
 * <Routes>). It has no visible output — it just watches the route
 * and scrolls the window to the top every time the path changes,
 * so clicking any nav link/route lands the user at the top of the
 * new page instead of keeping the old scroll position.
 * ---------------------------------------------------------------
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
