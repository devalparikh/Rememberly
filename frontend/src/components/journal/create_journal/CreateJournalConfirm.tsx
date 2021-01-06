import React, { useState, useEffect } from 'react';
import './CreateJournal.css';
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
    Container,
    Row,
    Col,
    Button
} from 'react-bootstrap'
import axios from 'axios';
import { iCheckin } from '../../../App';

interface Props {
    user_id: string;
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
    const { user_id, name, custom_activities, newCheckin, setCheckin } = props;

    const [activities, SetActivities] = useState(["sports", "lifting", "writing", "drawing", "family", "friends"]);
    const [title, SetTitle] = useState("");
    const [notes, SetNotes] = useState("");


    useEffect(() => {
        // TOOD: API call to get most recent activities
        // Combine defualt activities with custom user activities
        SetActivities([...activities, ...custom_activities]);
    }, [custom_activities]);

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

    const submitCheckin = () => {
        let selectedActivitiesNames = [];

        for (let i = 0; i < selectedActivities.length; i++) {
            if (selectedActivities.split(",").map(Number)[i]) {
                selectedActivitiesNames.push(activities[i]);
            }
        }

        axios
            .post(`${process.env.REACT_APP_URL}/checkin`,
                {
                    user_id: user_id,
                    title: title,
                    mood: mood,
                    activities: selectedActivitiesNames,
                    notes: notes,
                },
                {
                    headers: { 'x-auth-token': `${localStorage.usertoken}` }
                })
            .then(res => {
                console.log(res);
                // @ts-ignore
                window.location = '/journal';
            })
            .catch(err => {
                // TODO: handle errors
                console.log(err.response.data.msg);
            });
    }

    // Animate next page slide
    let slideDirection = "100%";
    // If coming from future page, animate prev page slide
    if (String(document.referrer).includes("TODO: replace with next page")) {
        slideDirection = "-100%"
    }
    const moodEmojis = ["😕", "😐", "🙂", "😀", "😁"]

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

                <Container>
                    <Row xs={1} md={2}>
                        <Col>
                            <div className="title-confirm">Mood</div>
                            <div className="title-mood">

                                {
                                    // @ts-ignore
                                    moodEmojis[mood]
                                }
                            </div>
                        </Col>
                        <Col>
                            <div className="title-confirm">Activities</div>
                            <div className="activity-selection scrollable">
                                {displayActivities()}
                            </div>
                        </Col>
                    </Row>
                </Container>

                <div>
                    <input className="input-confirm" style={{ marginTop: "60px" }} placeholder="Enter title" value={title} onChange={(event) => SetTitle(event.target.value)}></input>
                </div>

                <div>
                    <textarea className="input-notes-confirm input-confirm" placeholder="Enter Notes" value={notes} onChange={(event) => SetNotes(event.target.value)}></textarea>
                </div>

                <Button variant="custom" onClick={submitCheckin}>Complete Check-in</Button>

            </motion.div>
        </div>

    );
}