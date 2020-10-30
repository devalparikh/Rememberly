import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Journal.css';
import JournalCard from './JournalCard';
import Moods from './Moods';

import {
    Container,
    Row,
    Col
} from 'react-bootstrap'

interface Props {
}

interface State {
    name: string;
}

class Journal extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            name: 'Deval' // TODO: replace this with API call
        };
    }
    render() {
        return (
            <div>

                <div className="dark">
                    <Container>
                        <Row>
                            <Col>
                                <div className="title">{this.state.name}'s Journal</div>
                            </Col>
                        </Row>
                    </Container>
                </div>

                <div className="journal-card-group">

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
}

export default Journal;