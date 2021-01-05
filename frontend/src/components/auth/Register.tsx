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

export function Register(props: Props) {

    const { } = props;

    const [email, SetEmail] = useState("");
    const [username, SetUsername] = useState("");
    const [password, SetPassword] = useState("");
    const [error, SetError] = useState("");

    const register = (event: any) => {
        event.preventDefault();

        axios
            .post(`${process.env.REACT_APP_URL}/auth/register`, {
                email: email,
                username: username,
                password: password
            })
            .then(res => {
                localStorage.setItem('usertoken', res.data.token);
                // @ts-ignore
                window.location = '/journal';
            })
            .catch(err => {
                SetError(err.response.data.msg);
            });
    }

    return (
        <div>
            <div className="dark">
                <Container>
                    <Row>
                        <Col>
                            <div className="title">Register</div>
                        </Col>
                    </Row>
                </Container>
            </div>

            <div className="card-group">
                <form className="card">
                    <div className="auth-title">Email</div>
                    <input className="auth-input" type="email" placeholder="Enter Email" value={email} onChange={(event) => SetEmail(event.target.value)}></input>

                    <div className="auth-title">Username</div>
                    <input className="auth-input" type="username" placeholder="Enter Username" value={username} onChange={(event) => SetUsername(event.target.value)}></input>

                    <div className="auth-title">Password</div>
                    <input className="auth-input" type="password" placeholder="Enter Password" value={password} onChange={(event) => SetPassword(event.target.value)}></input>

                    <Button type="submit" variant="flat" onClick={(event) => register(event)}>Register</Button>
                    <Button href="/login" variant="custom" style={{ marginTop: "0px" }}>Login</Button>

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