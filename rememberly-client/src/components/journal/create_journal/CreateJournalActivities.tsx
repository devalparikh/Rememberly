import React from 'react';
import './CreateJournal.css';
import { Button } from 'react-bootstrap';
import RangeSlider from 'react-bootstrap-range-slider';
import Moods from '../Moods';
import { motion } from "framer-motion";

interface Props {
}

interface State {

}

class CreatejournalActivities extends React.Component<Props, State> {
    state: State = {}

    render() {

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
                            <Button href="/journal/create/mood" variant="custom">Back</Button>
                        </div>

                        <div className="exit-btn-area">
                            <Button href="/journal" variant="custom">Exit</Button>
                        </div>

                    </div>
                    <div className="title-create">Nice! What activities are making you feel that way?</div>
                    <div className="continue-btn-area">
                    </div>


                    <Button href="/journal/create/activities" variant="custom">Continue</Button>

                </motion.div>
            </div>

        );
    }
}

export default CreatejournalActivities;