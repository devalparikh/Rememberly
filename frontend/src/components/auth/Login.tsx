import React, { useState } from 'react';
import {
    Container,
    Row,
    Col,
    Button
} from 'react-bootstrap'
import axios from 'axios';
import './Auth.css';

interface Props {
};

export function Login(props: Props) {

    const { } = props;

    const [username, SetUsername] = useState("");
    const [password, SetPassword] = useState("");
    const [error, SetError] = useState("");

    const login = (event: any) => {
        event.preventDefault();

        axios
            .post(`${process.env.REACT_APP_URL}/auth/login`, {
                username: username,
                password: password
            })
            .then(res => {
                localStorage.setItem('usertoken', res.data.token);
                // @ts-ignore
                window.location = '/journal';
            })
            .catch(err => {
                localStorage.removeItem("usertoken");
                SetError(err.response.data.msg);
            });
    }

    return (
        <div>
            <div className="dark">
                <Container>
                    <Row>
                        <Col>
                            <div className="title">Login</div>
                        </Col>
                    </Row>
                </Container>
            </div>

            <div className="card-group">
                <form className="card">
                    <div className="auth-title">Username</div>
                    <input className="auth-input" type="username" placeholder="Enter Username" value={username} onChange={(event) => SetUsername(event.target.value)}></input>

                    <div className="auth-title">Password</div>
                    <input className="auth-input" type="password" placeholder="Enter Password" value={password} onChange={(event) => SetPassword(event.target.value)}></input>

                    <Button type="submit" variant="flat" onClick={(event) => login(event)}>Login</Button>
                    <Button href="/register" variant="custom" style={{ marginTop: "0px" }}>Register</Button>

                    {
                        error
                            ?
                            <p className="error-color">{error}</p>
                            :
                            <div></div>
                    }
                </form>
            </div>
        </div>
    );
}