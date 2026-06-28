import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";

function Navbar() {
  return (
    <nav className={styles.nav}>
      <div className={styles.links}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? styles.activeLink : styles.link
          }
        >
          VIN Decoder
        </NavLink>

        <NavLink
          to="/variables"
          className={({ isActive }) =>
            isActive ? styles.activeLink : styles.link
          }
        >
          Vehicle variables
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;