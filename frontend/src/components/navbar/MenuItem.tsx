import * as React from "react";
import { motion } from "framer-motion";
import { link } from "fs";

const variants = {
    open: {
        y: 0,
        opacity: 1,
        transition: {
            y: { stiffness: 1000, velocity: -100 }
        }
    },
    closed: {
        y: 50,
        opacity: 0,
        transition: {
            y: { stiffness: 1000 }
        },
        zIndex: -2
    }
};

const colors = ["#FF008C", "#D309E1", "#9C1AFF", "#7700FF", "#4400FF"];

let navLinks = ["Home", "About", "Login", "Register"]

if(localStorage.usertoken) {
    navLinks = ["Home", "Journal", "Profile", "Logout"]
}


export const MenuItem = ({ i }: { i: any}) => {
    // const IconStyle = { border: `2px solid ${colors[i]}` };
    const TextStyle = { color: `${colors[i]}`, fontSize: 50, fontWeight: 800 };
    return (
        <motion.li
            className="nav-li"
            variants={variants}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
        >
            {/* <div className="icon-placeholder" style={IconStyle} /> */}
            <div className="text-placeholder">
                <a style={TextStyle} href={"/"+String(navLinks[i]).toLowerCase()}>{navLinks[i]}</a>
            </div>
        </motion.li>
    );
};
