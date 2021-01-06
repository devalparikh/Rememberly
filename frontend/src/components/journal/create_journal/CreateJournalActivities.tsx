import React, { useState, useEffect } from 'react';
import './CreateJournal.css';
import { Button } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

interface Props {
    custom_activities: [];
}

interface ParamTypes {
    mood: string;
    selectedActivities: string;
}

export function CreateJournalActivities(props: Props) {

    const { mood, selectedActivities } = useParams<ParamTypes>();
    const { custom_activities } = props;

    const [activities, SetActivities] = useState(["sports", "lifting", "writing", "drawing", "family", "friends"]);
    const [curSelectedActivities, SetCurSelectedActivities] = useState([0, 0, 0, 0, 0, 0]);

    const [somethingelse, SetSomethingElse] = useState(false);
    const [newActivity, SetNewActivity] = useState("");

    useEffect(() => {
        // TOOD: API call to get most recent activities
        // Combine defualt activities with custom user activities
        SetActivities(activities.concat(custom_activities));

        if (selectedActivities && selectedActivities !== "none") {

            console.log(selectedActivities.split(","));
            // @ts-ignore
            SetCurSelectedActivities(selectedActivities.split(",").map(Number));
        } else {

            const customActivitesSelection = new Array(custom_activities.length).fill(0);
            // @ts-ignore
            SetCurSelectedActivities(curSelectedActivities.concat(customActivitesSelection));
        }
    }, []);

    // Animate next page slide
    let slideDirection = "100%";
    // If coming from future page, animate prev page slide
    if (String(document.referrer).includes("confirm")) {
        slideDirection = "-100%"
    }

    const handleActivitySelect = (index: any) => {
        let new_curSelectedActivities = [...curSelectedActivities]; // copy 
        new_curSelectedActivities[index] ^= 1; // toggle bit flip
        SetCurSelectedActivities(new_curSelectedActivities);
    }

    const displayActivities = () => {

        return activities.map((curActivity, index) => {
            return (
                <label>
                    <input
                        type="checkbox"
                        name="activity"
                        value={index}
                        checked={Boolean(curSelectedActivities[index])}
                        onChange={() => handleActivitySelect(index)}
                    />
                    <div className="activity-bubble btn-custom">
                        {curActivity}
                    </div>
                </label>

            );
        });
    }

    const addNewActivity = () => {
        if (activities.includes(newActivity.toLowerCase())) {
            // TODO: add error handling message
        } else {
            // TODO: API call add new activity
            SetActivities(defaultActivities => [...defaultActivities, newActivity.toLowerCase()]);
            SetNewActivity("");

            SetCurSelectedActivities([...curSelectedActivities, 1]);
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
                        <Button href={`/journal/create/mood/${mood}/`} variant="custom">Back</Button>
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


                <Button href={`/journal/create/mood/${mood}/activities/${curSelectedActivities.join()}/confirm`} variant="custom">Continue</Button>

            </motion.div>
        </div>

    );
}