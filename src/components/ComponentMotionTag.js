import React from 'react';
import { motion } from "framer-motion";

const ComponentMotionTag = ({ children, ...props }) => (
        <motion.div {...props} initial={{ x: '-100vw' }}
                animate={{ x: 0 }}
                exit={{ x: '100vw',
                        transition: { ease: "easeInOut", type: 'tween', mass: 0.4, damping: 7 }
                }}>
                        {children}
        </motion.div>
);

export default React.memo(ComponentMotionTag);