import React, { useEffect, useState } from 'react';
import './home.css'

import {
    Container,
    Row,
    Col,
    Button,
} from 'react-bootstrap'
import HandMockUp from '../../images/hand_mockup.png';
import ClayIphone from '../../images/clay-iphone.png';
import {
    motion,
    useViewportScroll,
    useSpring,
    useTransform
} from "framer-motion"


function LandingPage() {

    const { scrollYProgress } = useViewportScroll();

    const yRange = useTransform(scrollYProgress, [0.3, 1], [1.2, 0.8]);
    const RotateRange = useTransform(scrollYProgress, [0, 1], [-10, 0]);

    const yRange_button1 = useTransform(scrollYProgress, [0.5, 0.8], [0.8, 2.8]);
    const RotateRange_button1 = useTransform(scrollYProgress, [0.5, 0.8], [0, 20]);

    const yRange_button2 = useTransform(scrollYProgress, [0.5, 0.8], [0.8, 1.8]);
    const RotateRange_button2 = useTransform(scrollYProgress, [0.5, 0.8], [0, -20]);

    useEffect(() => yRange.onChange(() => [yRange]));

    const ScrollIphone = () => {
        return (
            <div style={{ backgroundColor: "#c8d1db", overflow: "hidden" }}>
                <motion.div
                    style={{ rotate: RotateRange, scale: yRange }}
                    transition={{ duration: 0.5 }}
                >
                    <motion.div style={{
                        rotate: RotateRange_button1,
                        scale: yRange_button1,
                        position: "absolute",
                        margin: "40% 0 0 50%"
                    }}>
                        <Button variant="flat">fun</Button>
                    </motion.div>

                    <motion.div style={{
                        rotate: RotateRange_button2,
                        scale: yRange_button2,
                        position: "absolute",
                        margin: "20% 0 0 38%"
                    }}>
                        <Button variant="flat">thankful</Button>
                    </motion.div>

                    <img style={{ margin: "40px 0px 40px 0px", width: "100%" }} src={ClayIphone} />

                </motion.div>
            </div>

        )
    }

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
                            <Button variant="custom">Get Started</Button>

                        </Col>
                        <Col>

                            <img style={{ marginTop: "100px" }} height="500" src={HandMockUp} />
                        </Col>
                    </Row>

                </Container>
            </div>
            <div>
                {ScrollIphone()}

            </div>
            <div style={{ backgroundColor: "#f1f3f4" }}>
                <Container>
                    <Row style={{ padding: "0px 0px 0px 20px" }}>
                        <Col>
                            <div className="title landing-title">Self reflect and keep things in check</div>
                            <div className="title landing-sub-title">Boost awareness, relieve stress, achieve your goals.</div>
                            <Button variant="flat">Get Started</Button>

                        </Col>
                        <Col>

                            <img style={{ marginTop: "100px" }} height="500" src={HandMockUp} />
                        </Col>
                    </Row>

                </Container>
            </div>
        </div >
    );
}

export default LandingPage;