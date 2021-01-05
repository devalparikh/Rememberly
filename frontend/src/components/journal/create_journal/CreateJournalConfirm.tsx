import React, { useState } from 'react';
import './CreateJournal.css';
import { Button } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

import { iCheckin } from '../../../App';

interface Props {
    name: string;
    newCheckin: iCheckin;
}

interface ParamTypes {
    mood: string;
    selectedActivities: string;
}

export function CreateJournalConfirm(props: Props) {

    const { mood, selectedActivities } = useParams<ParamTypes>();
    const { name, newCheckin } = props;


    // Animate next page slide
    let slideDirection = "100%";
    // If coming from future page, animate prev page slide
    if (String(document.referrer).includes("TODO: replace with next page")) {
        slideDirection = "-100%"
    }


    return (
        <div className="bg">
            <motion.div
                initial={{ x: slideDirection }}
                animate={{ x: 0 }}
                exit={{ x: slideDirection, }}
                transition={{
                    type: "tween",
                    ease: "anticipate",
                    duration: 0.5
                }}
            >
                <div className="navigation-btn-area">

                    <div className="back-btn-area">
                        <Button href={document.referrer} variant="custom">Back</Button>
                    </div>

                    <div className="exit-btn-area">
                        <Button href="/journal" variant="custom">Exit</Button>
                    </div>

                </div>
                <div className="title-create">Nice!</div>




                <Button href="/journal" variant="custom">Continue</Button>

            </motion.div>
        </div>

    );
}