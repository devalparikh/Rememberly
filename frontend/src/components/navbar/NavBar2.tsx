import * as React from "react";
import { useRef } from "react";
import { motion, useCycle } from "framer-motion";
import { useDimensions } from "./use-dimensions";
import { MenuToggle } from "./MenuToggle";
import { Navigation } from "./Navigation";
import './NavBar2.css';


const sidebar = {
    open: (height = 1000) => ({
        clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
        transition: {
            type: "spring",
            stiffness: 20,
            restDelta: 2
        }
    }),
    closed: {
        clipPath: "circle(30px at 40px 41px)",
        transition: {
            delay: 0.06,
            type: "spring",
            stiffness: 400,
            damping: 40,
        },
    }
};

export const NavBar2 = () => {
    const [isOpen, toggleOpen] = useCycle(false, true);
    const containerRef = useRef(null);
    // const { height } = useDimensions(containerRef);

    // Force disable navigation buttons when closed
    let menuStyleClass = isOpen ? "" : "nav-disabled-buttons";

    return (
        <motion.nav
            className={menuStyleClass}
            initial={false}
            animate={isOpen ? "open" : "closed"}
            // custom={height}
            ref={containerRef}
        >
            <motion.div className="nav-background nav-disabled" variants={sidebar} />
            <Navigation />
            <MenuToggle toggle={() => toggleOpen()} />
        </motion.nav>
    );
};

export default NavBar2;

