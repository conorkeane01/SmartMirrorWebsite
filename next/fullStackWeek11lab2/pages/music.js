import React, { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./Login";
import Dashboard from "./Dashboard";


function Music() {
    const [code, setCode] = useState(null);

    useEffect(() => {
        const codeFromUrl = new URLSearchParams(window.location.search).get('code');
        setCode(codeFromUrl);
    }, []);

    return code ? <Dashboard code={code} /> : <Login />;
}

export default Music;

