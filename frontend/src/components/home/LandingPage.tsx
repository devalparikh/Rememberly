import React from 'react';
import './home.css'

import {
    Container,
    Row,
    Col,
    Button,
} from 'react-bootstrap'
import HandMockUp from '../../images/hand_mockup.png';

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

            <div className="landing-bg">
                <Container>
                    <Row style={{ padding: "0px 0px 0px 20px" }}>
                        <Col>
                            <div className="title landing-title">Self reflect and keep things in check</div>
                            <div className="title landing-sub-title">Boost awareness, relieve stress, achieve your goals.</div>
                            <Button variant="custom">Get Started</Button>

                        </Col>
                        <Col>

                            <img style={{ marginTop:"100px" }} height="500" src={HandMockUp} />
                        </Col>
                    </Row>

                </Container>
            </div>
        </div >
    );
}

export default LandingPage;