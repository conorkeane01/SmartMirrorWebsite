import React from "react";
import Layout from "../components/layout/Layout";
import styles from "./Home.module.css";
import MainNavigation from "../components/layout/MainNavigation";

function Home() {
    return (
        <Layout>
            <div className={styles.home}>
                <h1>Welcome</h1>
            </div>
        </Layout>
    );
}

export default Home;

