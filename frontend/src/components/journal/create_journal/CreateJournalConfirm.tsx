import React, { useState, useEffect } from 'react';
import './CreateJournal.css';
import { Button } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

import { iCheckin } from '../../../App';

interface Props {
    name: string;
    custom_activities: [];
    newCheckin: iCheckin;
    setCheckin: (updatedCheckin: iCheckin) => void;

}

interface ParamTypes {
    mood: string;
    selectedActivities: string;
}

export function CreateJournalConfirm(props: Props) {

    const { mood, selectedActivities } = useParams<ParamTypes>();
    const { name, custom_activities, newCheckin, setCheckin } = props;

    const [activities, SetActivities] = useState(["sports", "lifting", "writing", "drawing", "family", "friends"]);

    useEffect(() => {
        // TOOD: API call to get most recent activities
        // Combine defualt activities with custom user activities
        SetActivities(activities.concat(custom_activities));

    }, []);

    const displayActivities = () => {

        return activities.map((curActivity, index) => {
            if (selectedActivities.split(",").map(Number)[index]) {
                return (
                    <label>
                        <input
                            type="checkbox"
                            name="activity"
                            value={index}
                            disabled
                        />
                        <div className="activity-bubble btn-custom">
                            {curActivity}
                        </div>
                    </label>
                );

            }
            return (
                <div></div>
            );

        });
    }

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
                        <Button href={`/journal/create/mood/${mood}/activities/${selectedActivities}`} variant="custom">Back</Button>
                    </div>

                    <div className="exit-btn-area">
                        <Button href="/journal" variant="custom">Exit</Button>
                    </div>

                </div>
                <div className="title-create">Looks great so far!<br /> Tell me more about it.</div>

                <div className="title-confirm">Activities</div>
                <div className="activity-selection scrollable">
                    {displayActivities()}
                </div>



                <Button href="/journal" variant="custom">Continue</Button>

            </motion.div>
        </div>

    );
}