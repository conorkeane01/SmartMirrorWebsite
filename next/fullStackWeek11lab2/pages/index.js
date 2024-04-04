import NoteList from '../components/notes/NoteList'
import { useContext } from "react";
import GlobalContext from "./store/globalContext"
import React from 'react';
/*
import NoteList from '../components/notes/NoteList'
import { useContext } from "react";
import GlobalContext from "./store/globalContext"
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createRoot } from 'react-dom/client';
import {
    createBrowserRouter,
    RouterProvider,
    Route,
    Link,
    Outlet,
} from "react-router-dom"
import Home from "../routes/Home";
import About from "../routes/About";
import Weather from "../routes/Weather";
import Navbar from "../components/Navbar";
import ErrorPage from '../routes/ErrorPage';
import Sleep from '../routes/Sleep';
//import "./App.css";

const AppLayout = () => {
    return (
        <>
        <Navbar />
        <Outlet />
        </>
    )
}

const router = createBrowserRouter([
    {
        element: <AppLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/home",
                element: <Home />
            },
            {
                path: "/about",
                element: <About />
            },
            {
                path: "/weather",
                element: <Weather />
            },
            {
                path: "/sleep",
                element: <Sleep />
            },
        ],
    },
]);

createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />
);

function HomePage() {
    const globalCtx = useContext(GlobalContext)

    if (globalCtx.theGlobalObject.dataLoaded == true) {
        return <NoteList notes={globalCtx.theGlobalObject.notings} />
    }
    return <div>Loading data from database, please wait . . . </div>
}

export default HomePage;
*/

/*
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createRoot } from 'react-dom/client';
import {
    createBrowserRouter,
    RouterProvider,
    Route,
    Link,
    Outlet,
} from "react-router-dom"
import Home from "./routes/Home";
import About from "./routes/About";
import Weather from "./routes/Weather";
import Navbar from './components/Navbar';
import ErrorPage from './routes/ErrorPage';
import Sleep from './routes/Sleep';
import "./App.css";

const AppLayout = () => {
    return (
        <>
        <Navbar />
        <Outlet />
        </>
    )
}

const router = createBrowserRouter([
    {
        element: <AppLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/home",
                element: <Home />
            },
            {
                path: "/about",
                element: <About />
            },
            {
                path: "/weather",
                element: <Weather />
            },
            {
                path: "/sleep",
                element: <Sleep />
            },
        ],
    },
]);

createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />
);

*/



function HomePage() {
    const globalCtx = useContext(GlobalContext)

    if (globalCtx.theGlobalObject.dataLoaded == true) {
        return <NoteList notes={globalCtx.theGlobalObject.notings} />
    }
    return <div>Loading data from database, please wait . . . </div>
}

export default HomePage;

