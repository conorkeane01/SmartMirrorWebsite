
import MainNavigation from './MainNavigation';
import styles from './Layout.module.css';

const Layout = ({ children }) => {
  return (
    <div className={styles.layout}>
      <MainNavigation />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
