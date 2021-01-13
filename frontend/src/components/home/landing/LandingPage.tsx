import React, { useEffect, useState } from 'react';
import '../home.css'

import {
    Container,
    Row,
    Col,
    Button,
} from 'react-bootstrap'
import HandMockUp from '../../../images/hand_mockup.png';
import HandMockUpJournal from '../../../images/hand_mockup_journal.png';
import AnimatedPhoneMockup from './AnimatedPhoneMockup'



function LandingPage() {

    return (
        <div>


            <div className="dark">
                <Container>
                    <Row>
                        <Col>
                            <div className="title" style={{ fontSize: "50px" }}>Rememberly</div>
                        </Col>
                    </Row>
                </Container>
            </div>

            <div style={{ backgroundColor: "#aeace4" }}>
                <Container>
                    <Row style={{ padding: "0px 0px 0px 20px" }}>
                        <Col>
                            <div className="title landing-title">Self reflect and keep things in check</div>
                            <div className="title landing-sub-title">Boost awareness, relieve stress, achieve your goals.</div>
                            <Button href="/journal" variant="custom" style={{ marginLeft: "0px" }}>Get Started</Button>

                        </Col>
                        <Col>
                            <img className="landing-mockup" style={{ margin: "100px -200px 0px 0px" }} height="800" src={HandMockUpJournal} />
                        </Col>
                    </Row>

                </Container>
            </div>
            <div>
                {AnimatedPhoneMockup()}

            </div>
            <div style={{ backgroundColor: "#f1f3f4" }}>
                <Container>
                    <Row style={{ padding: "0px 0px 0px 20px" }}>
                        <Col>

                            <img style={{ marginTop: "100px" }} height="500" src={HandMockUp} />
                        </Col>
                        <Col>
                            <div className="title landing-title">Start your journey today</div>
                            <div className="title landing-sub-title">Sign up today for free.</div>
                            <Button href="/journal" variant="flat">Get Started</Button>

                        </Col>

                    </Row>

                </Container>
            </div>
        </div >
    );
}

export default LandingPage;