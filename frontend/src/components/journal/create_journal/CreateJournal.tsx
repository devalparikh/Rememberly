import React, { useState } from 'react';
import './CreateJournal.css';

import { Button } from 'react-bootstrap';
import { motion } from "framer-motion";


interface Props {
    name: string;
}

interface iCheckin {
    user_id: string,
    title: string,
    mood: number,
    notes: string,
    
    // Selected Activities
    activities: [], 
    selected_activities: [];

}

const pageVariants = {
    initial: {

        scale: 5,
    },
    in: {

        scale: 1,
    },
    out: {
        scale: 5,
    }
};

const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5
};


export function CreateJournal(props: Props) {

    const { name } = props;
    
    const newCheckin: iCheckin = {
        user_id: "",
        title: "",
        mood: 0,
        notes: "",
        activities: [],
        selected_activities: [],
    }
    const [checkin, SetCheckin] = useState<iCheckin>(newCheckin);

    return (
        <div className="bg">
            <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
            >
                <div className="exit-btn-area">
                    <Button href="/journal" variant="custom">Exit</Button>
                </div>
                <div className="title-create">Hey, {name}. Ready for your daily check-in?</div>
                <div className="continue-btn-area">
                    <Button href="/journal/create/mood" variant="custom">Continue</Button>
                </div>

            </motion.div>
        </div>
    );

}
