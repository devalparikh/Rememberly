import React, { useEffect, useState } from 'react';
import './CreateJournal.css';
import { Button } from 'react-bootstrap';
import RangeSlider from 'react-bootstrap-range-slider';
import Moods from '../Moods';
import { motion } from "framer-motion";

interface Props {
}

export function CreateJournalActivities(props: Props) {

    const [activities, SetActivities] = useState(["sports", "lifting", "writing", "drawing", "family", "friends"]);
    const [somethingelse, SetSomethingElse] = useState(false);
    const [newActivity, SetNewActivity] = useState("");


    useEffect(() => {
        // API call to get user's activites
        // SetActivities(defaultActivities => [...defaultActivities, userActivities ])
    }, []);

    // Animate next page slide
    let slideDirection = "100%";
    // If coming from future page, animate prev page slide
    if (String(document.referrer).includes("TODO: replace with next page")) {
        slideDirection = "-100%"
    }

    const displayActivities = () => {

        return activities.map((curActivity, index) => {
            return (
                <label><input type="checkbox" name="activity" value={index} /><div className="activity-bubble btn-custom">{curActivity}</div></label>

            );
        });
    }

    const addNewActivity = () => {
        if (activities.includes(newActivity.toLowerCase())) {
            // TODO: add error handling message
        } else {
            // API call add new activity
            SetActivities(defaultActivities => [...defaultActivities, newActivity.toLowerCase()]);
            SetNewActivity("");
        }

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
                        <Button href="/journal/create/mood" variant="custom">Back</Button>
                    </div>

                    <div className="exit-btn-area">
                        <Button href="/journal" variant="custom">Exit</Button>
                    </div>

                </div>
                <div className="title-create">Nice! What activities are making you feel that way?</div>
                <div className="activity-selection scrollable">
                    {displayActivities()}
                    <label>
                        <input type="checkbox" onChange={() => SetSomethingElse(!somethingelse)} />
                        <div className="activity-bubble btn-custom">something else?</div>
                    </label>
                </div>
                {
                    somethingelse
                        ?
                        <div>
                            <input className="somethingelse-input" placeholder="Add a new activity" value={newActivity} onChange={(event) => { SetNewActivity(event.target.value) }} />
                            <button className="btn-custom" style={{ fontSize: "30px", padding: "0px 20px 5px 20px" }} onClick={addNewActivity}>+</button>
                        </div>
                        :
                        <div></div>
                }


                <Button href="/journal/create/activities" variant="custom">Continue</Button>

            </motion.div>
        </div>

    );
}