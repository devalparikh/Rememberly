import React from 'react';
import './Memory.css';

// Icons "Icon made by Freepik from www.flaticon.com"
import SuitcaseIcon from '../../images/suitcase.svg'
import JournalIcon from '../../images/journal-book.svg'
import WaterIcon from '../../images/water.svg'
import HotelKeyIcon from '../../images/hotel-key.svg'


import {
    Container,
    Row,
    Col
} from 'react-bootstrap'

function Memory() {
    return (
        <div>

            <div className="dark">
                <Container>
                    <Row>
                        <Col>
                            <div className="title">New Memory</div>
                        </Col>
                    </Row>
                </Container>
            </div>

            <div className="card-btn-group">
                <Container>
                    <div className="title">Track</div>
                    <Row xs={1} md={2}>
                        <Col>
                            <a href="/habits">
                                <div className="card-btn dark">
                                    <img src={WaterIcon} alt="Habits"></img>
                                Habits
                            </div>
                            </a>
                        </Col>
                        <Col>
                            <a href="/journal">
                                <div className="card-btn dark">
                                    <img src={JournalIcon} alt="Journal"></img>
                                Journal
                            </div>
                            </a>
                        </Col>
                        <Col>
                            <a href="/travel">
                                <div className="card-btn dark">
                                    <img src={SuitcaseIcon} alt="Travel"></img>
                                Travel
                            </div>
                            </a>
                        </Col>
                        <Col>
                            <a href="/settings">
                                <div className="card-btn dark">
                                    <img src={HotelKeyIcon} alt="Settings"></img>
                                Settings
                            </div>
                            </a>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div >
    );
}

export default Memory;