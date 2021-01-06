import React, { useEffect, useState } from 'react';
import './Journal.css';
import JournalCard from './JournalCard';
import MoodChart from './MoodChart';
import Moods from './Moods';
import axios from 'axios';
import {
    Container,
    Row,
    Col,
    Button
} from 'react-bootstrap'
import { create } from 'domain';

interface Props {
    name: string;
    user_id: string;
}

export function Journal(props: Props) {

    const { name, user_id } = props;

    const [checkins, SetCheckins] = useState([]);

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_URL}/checkin`,
                {
                    headers: { 'x-auth-token': `${localStorage.usertoken}` }
                })
            .then(res => {
                SetCheckins(res.data);
                console.log(res);
            })
            .catch(err => {
                // TODO: add error handling
                console.log(err);
            });
    }, []);

    const displayCheckins = () => {

        if(checkins.length === 0) {
            return (
                <div className="title" style={{ color: "#646569" }}>Welcome! Create your first check-in.</div>
            )
        }

        let prevDate: Date;
        return checkins.map((curCheckins, index) => {
            const { createdAt, mood, activities, title, notes } = curCheckins;
            
            let timeOnly = true;
            let date = new Date(createdAt)
            if(prevDate && prevDate !== new Date(createdAt)) {
                timeOnly = false;
            }
            prevDate = date
            
            return (
                <JournalCard
                    // TODO: Replace with read data for cur card
                    date={date}
                    mood={mood}
                    activities={activities}
                    title={title}
                    notes={notes}

                    timeOnly={timeOnly}
                />
            );

    });
}

return (
    <div>

        <div className="dark">
            <Container>
                <Row>
                    <Col>
                        <div className="title">{name}'s Journal</div>
                    </Col>
                </Row>
            </Container>
        </div>

        <div className="journal-card-group">

            {/* Mood Chart */}
            <MoodChart></MoodChart>

            <Button href="/journal/create" variant="flat">Check-In</Button>

            {/* TODO: Iterate over cards from API and after 7th show button for full calendar */}
            {displayCheckins()}
        </div>
    </div >
);

}