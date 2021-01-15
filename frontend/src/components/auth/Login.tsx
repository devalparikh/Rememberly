import React, { useState } from 'react';
import {
    Container,
    Row,
    Col,
    Button
} from 'react-bootstrap'
import axios from 'axios';
import { useForm, SubmitHandler } from "react-hook-form";
import './Auth.css';

interface Props {
};

interface Inputs {
    username: string;
    password: string;
}

export function Login(props: Props) {

    const { } = props;

    const [error, SetError] = useState("");
    const { register, handleSubmit, errors } = useForm<Inputs>();

    const login_api_call: SubmitHandler<Inputs> = data => {

        axios
            .post(`${process.env.REACT_APP_URL}/auth/login`, {
                username: data.username,
                password: data.password
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

            <div className="card-group" style={{ marginBottom: "30px" }}>
                <form className="card" onSubmit={handleSubmit(login_api_call)}>
                    <div className="auth-title">Username</div>
                    <input
                        className="auth-input"
                        name="username"
                        type="username"
                        placeholder="Enter Username"
                        ref={register({ required: true })}
                    ></input>
                    {errors.username && <p className="error-color">Username is required</p>}



                    <div className="auth-title">Password</div>
                    <input
                        className="auth-input"
                        name="password"
                        type="password"
                        placeholder="Enter Password"
                        ref={register({ required: true })}
                    ></input>
                    {errors.password && <p className="error-color">Password is required</p>}

                    <Button type="submit" variant="flat">Login</Button>
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