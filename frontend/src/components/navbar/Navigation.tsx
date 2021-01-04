import * as React from "react";
import { motion } from "framer-motion";
import { MenuItem } from "./MenuItem";

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
    zIndex: 1
  },
  closed: {
    transition: { zIndex: 0, staggerChildren: 0.01, staggerDirection: -1 },
    
  }
};

export const Navigation = () => (
  <motion.ul className="nav-ul" variants={variants}>
    {itemIds.map(i => (
      <MenuItem i={i} key={i} />
    ))}
  </motion.ul>
);

const itemIds = [0, 1, 2, 3, 4];

