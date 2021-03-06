import React, { useState } from 'react';
import './CreateJournal.css';
import { Button } from 'react-bootstrap';
import RangeSlider from 'react-bootstrap-range-slider';
import Moods from '../Moods';
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";

interface Props {
}

interface ParamTypes {
    mood: string;
}


export function CreateJournalMood(props: Props) {

    const { mood } = useParams<ParamTypes>();

    const [val, setVal] = useState(parseInt(mood) || 0);

    const handleChange = () => (event: any) => {
        setVal(event.target.value);
    };

    const moodSliderLabel = () => {
        return Moods[val];
    };

    const numOfMoods = Object.keys(Moods).length / 2;
    const moodEmojis = ["😕", "😐", "🙂", "😀", "😁"]

    // Animate next page slide
    let slideDirection = "100%";
    // If coming from future page, animate prev page slide
    if (String(document.referrer).includes("activities")) {
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
                        <Button href="/journal/create" variant="custom">Back</Button>
                    </div>

                    <div className="exit-btn-area">
                        <Button href="/journal" variant="custom">Exit</Button>
                    </div>

                </div>
                <div className="title-create">How are you today?</div>
                <div className="continue-btn-area">
                </div>


                <div className="title-mood">{moodEmojis[val]}</div>
                <div className="title-mood">{Moods[val]}</div>

                <div className="mood-slider">
                    <RangeSlider
                        value={val}
                        max={numOfMoods - 1}
                        size="lg"
                        variant="light"
                        tooltipLabel={moodSliderLabel}
                        onChange={handleChange()}
                    />

                </div>

                <Button href={`/journal/create/mood/${val}/activities/none`} variant="custom">Continue</Button>

            </motion.div>
        </div>

    );

}
