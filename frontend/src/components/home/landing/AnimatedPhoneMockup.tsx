import React, { useEffect } from 'react';
import '../home.css'

import {
    Button,
} from 'react-bootstrap'

import ClayIphone from '../../../images/clay-iphone-title.png';
import ClayIphoneSmall from '../../../images/clay-iphone-title-small.png';


import {
    motion,
    useViewportScroll,
    useTransform
} from "framer-motion"


function AnimatedPhoneMockup() {

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
            <>
                <div className="animated-mockup-big">
                    <div style={{ textAlign: "center" }} className="title landing-title">Tailored just for you</div>
                    <div style={{ textAlign: "center" }} className="title landing-sub-title">Tag your check-ins with customizable tags.</div>

                    <motion.div
                        style={{ rotate: RotateRange, scale: yRange }}
                        transition={{ duration: 0.5 }}
                    >


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

                <div className="animated-mockup-small">
                    <div style={{ textAlign: "center" }} className="title landing-title">Tailored just for you</div>
                    <div style={{ textAlign: "center" }} className="title landing-sub-title">Tag your check-ins with customizable tags.</div>
                    <img style={{ scale: "1.4", margin: "150px 0px 40px 0px", width: "100%", transform: "scale(2.4)" }} src={ClayIphoneSmall} />

                </div>

            </>
        )
    }

    return (
        <div>

            {ScrollIphone()}

        </div >
    );
}

export default AnimatedPhoneMockup;