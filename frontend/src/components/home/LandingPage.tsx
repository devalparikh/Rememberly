import React, { useEffect, useState } from 'react';
import './home.css'

import {
    Container,
    Row,
    Col,
    Button,
} from 'react-bootstrap'
import HandMockUp from '../../images/hand_mockup.png';
import HandMockUpJournal from '../../images/hand_mockup_journal.png';
import ClayIphone from '../../images/clay-iphone.png';

import {
    motion,
    useViewportScroll,
    useSpring,
    useTransform
} from "framer-motion"


function LandingPage() {

    const { scrollYProgress } = useViewportScroll();

    const yRange = useTransform(scrollYProgress, [0.3, 0.8], [1.2, 0.8]);
    const RotateRange = useTransform(scrollYProgress, [0, 0.8], [-10, 0]);

    const yRange_button1 = useTransform(scrollYProgress, [0.5, 0.8], [4.8, 0.8]);
    const RotateRange_button1 = useTransform(scrollYProgress, [0.5, 0.7], [20, 0]);

    const yRange_button2 = useTransform(scrollYProgress, [0.5, 0.6], [3.8, 0.8]);
    const RotateRange_button2 = useTransform(scrollYProgress, [0.5, 0.6], [-20, 0]);

    const yRange_button3 = useTransform(scrollYProgress, [0.5, 0.7], [1.8, 0.8]);
    const RotateRange_button3 = useTransform(scrollYProgress, [0.5, 0.6], [10, 0]);

    useEffect(() => yRange.onChange(() => [yRange]));

    const ScrollIphone = () => {
        return (
            <div style={{ backgroundColor: "#c8d1db", overflow: "hidden" }}>
                <div style={{ textAlign: "center" }} className="title landing-title">Tailored just for you</div>
                <div style={{ textAlign: "center" }} className="title landing-sub-title">Tag your check-ins with customizable tags.</div>

                <motion.div
                    style={{ rotate: RotateRange, scale: yRange }}
                    transition={{ duration: 0.5 }}
                >
                    <div style={{ textAlign: "center", margin: "15% 0 0 42%", position: "absolute" }} className="title landing-title">Activities</div>

                    <motion.div style={{
                        scale: "0.8",
                        margin: "30% 0 0 46%",
                        position: "absolute"
                    }}>
                        <Button style={{ backgroundColor: "#c4c2f1" }} variant="flat">exercise</Button>
                    </motion.div>
                    
                    <motion.div style={{
                        scale: "0.8",
                        margin: "43% 0 0 40%",
                        position: "absolute"
                    }}>
                        <Button style={{ backgroundColor: "#c4c2f1" }} variant="flat">exercise</Button>
                    </motion.div>

                    <motion.div style={{
                        rotate: RotateRange_button2,
                        scale: yRange_button2,
                        position: "absolute",
                        margin: "23% 0 0 38%"
                    }}>
                        <Button variant="flat">friends</Button>
                    </motion.div>


                    <motion.div style={{
                        rotate: RotateRange_button3,
                        scale: yRange_button3,
                        position: "absolute",
                        margin: "36% 0 0 53%"
                    }}>
                        <Button variant="flat">travel</Button>
                    </motion.div>

                    <motion.div style={{
                        rotate: RotateRange_button1,
                        scale: yRange_button1,
                        position: "absolute",
                        margin: "50% 0 0 50%"
                    }}>
                        <Button variant="flat">exercise</Button>
                    </motion.div>




                    <img style={{ margin: "50px 0px 40px 0px", width: "100%" }} src={ClayIphone} />

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
                            <Button href="/register" variant="custom" style={{ marginLeft: "0px" }}>Get Started</Button>

                        </Col>
                        <Col>
                            <img className="landing-mockup" style={{ margin: "100px -200px 0px 0px" }} height="800" src={HandMockUpJournal} />
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

                            <img style={{ marginTop: "100px" }} height="500" src={HandMockUp} />
                        </Col>
                        <Col>
                            <div className="title landing-title">Start your journey today</div>
                            <div className="title landing-sub-title">Sign up today for free.</div>
                            <Button href="/register" variant="flat">Get Started</Button>

                        </Col>

                    </Row>

                </Container>
            </div>
        </div >
    );
}

export default LandingPage;