import React from "react";
import * as FaIcons from "react-icons/fa"
import * as AiIcons from "react-icons/ai"
import * as IoIcons from "react-icons/io"

export const SidebarData = [
    {
        title: "Home",
        path: "/Home",
        icons: <AiIcons.AiFillHome />,
        cName: "nav-text",
    },
    {
        title: "About",
        path: "/About",
        icons: <FaIcons.FaInfo/>,
        cName: "nav-text",
    },
    {
        title: "Weather",
        path: "/Weather",
        icons: <FaIcons.FaCertificate />,
        cName: "nav-text",
    },
    {
        title: "Sleep",
        path: "/Sleep",
        icons: <FaIcons.FaBed />,
        cName: "nav-text",
    },
    {
        title: "Video",
        path: "/Video",
        icons: <FaIcons.FaCamera />,
        cName: "nav-text",
    },
    {
        title: "Support",
        path: "/Support",
        icons: <IoIcons.IoMdHelpCircle />,
        cName: "nav-text",
    },
];