import { Link } from "@tanstack/react-router";
import type { FC } from "react";

import { navLinks } from "../navLinks";

const NavigationLinks: FC = () => {
  return (
    <nav>
      <ul>
        {navLinks.map((link) => {
          const IconComponent = link.icon;
          return (
            <li key={link.to}>
              <Link to={link.to}>
                <IconComponent />
                <span>{link.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default NavigationLinks;
