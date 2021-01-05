import React from 'react';
import './Journal.css';
import JournalCard from './JournalCard';
import MoodChart from './MoodChart';
import Moods from './Moods';

import {
    Container,
    Row,
    Col,
    Button
} from 'react-bootstrap'

interface Props {
    name: string;
    user_id: string;
}

export function Journal(props: Props) {

    const { name, user_id } = props;

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
                <JournalCard
                    // TODO: Replace with read data for cur card
                    date={new Date()}
                    mood={Moods.Awesome}
                    activities={["family", "friends", "work"]}
                    title="Did homework all day"
                    notes="Spent half my day coding and the other half chilling"
                />

                <JournalCard
                    // TODO: Replace with read data for cur card
                    date={new Date()}
                    mood={Moods.Good}
                    activities={["shopping", "money", "work"]}
                    title="Got a new bag"
                    notes="blah blah"
                />
            </div>
        </div >
    );

}