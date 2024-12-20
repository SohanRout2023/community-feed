import Link from "next/link";
import styles from "./NavBar.module.css";

const NavBar = () => {
  return (
    <nav className={styles.navbar}>
      <Link href="/" passHref>
        Home
      </Link>
      <Link href="/postpage" passHref>
        Post Page
      </Link>
      <Link href="/userprofile" passHref>
        User Profile
      </Link>
    </nav>
  );
};

export default NavBar;
