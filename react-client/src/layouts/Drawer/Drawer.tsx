import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import logo from "@/assets/pngs/logo.png";
import ThemeToggle from "@/components/ThemeToggle";
import { navLinks } from "@/features/navigation";

import * as styles from "./Drawer.styles";

export function Drawer() {
  const [hoverLocked, setHoverLocked] = useState(false);
  const drawerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = drawerRef.current;
    if (!node) {
      return;
    }
    const unlockHover = () => {
      setHoverLocked(false);
    };
    node.addEventListener("pointerleave", unlockHover);
    return () => {
      node.removeEventListener("pointerleave", unlockHover);
    };
  }, []);

  return (
    <aside ref={drawerRef} className={styles.drawer}>
      <div className={styles.drawerCard({ hoverLocked })}>
        <Link to="/" className={styles.logoLink} onClick={() => setHoverLocked(true)}>
          <span className={styles.logoImageBox}>
            <img src={logo} alt="" className={styles.logoImage} />
          </span>
          <span className={styles.logoText}>
            <span className={styles.logoAccent}>C</span>ari
            <span className={styles.logoAccent}>B</span>an
          </span>
        </Link>
        <nav className={styles.navLinks} aria-label="メインナビゲーション">
          {navLinks.map((link) => {
            const IconComponent = link.icon;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={styles.navLink}
                onClick={() => setHoverLocked(true)}
              >
                <div className={styles.navLinkContent}>
                  <span className={styles.navIconBox}>
                    <IconComponent className={styles.navIcon} />
                  </span>
                  <span className={styles.navText}>{link.label}</span>
                </div>
              </Link>
            );
          })}
        </nav>
        <div className={styles.themeToggleContainer}>
          <ThemeToggle />
        </div>
      </div>
    </aside>
  );
}
