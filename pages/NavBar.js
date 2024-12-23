import Link from "next/link";
import styles from "./NavBar.module.css";

const NavBar = () => {
  return (
    <nav className={styles.navbar}>
      <Link href="/" passHref>
        Home
      </Link>

    </nav>
  );
};

export default NavBar;
