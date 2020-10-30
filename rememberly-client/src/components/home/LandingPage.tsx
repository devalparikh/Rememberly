import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import {
    Container,
    Row,
    Col
} from 'react-bootstrap'

function LandingPage() {
    return (
        <div>


            <div className="dark">
                <Container>
                    <Row>
                        <Col>
                            <div className="title">Rememberly</div>
                        </Col>
                    </Row>
                </Container>
            </div>

            <div className="card-btn-group">

            </div>
        </div >
    );
}

export default LandingPage;