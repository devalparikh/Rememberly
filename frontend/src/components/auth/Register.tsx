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
    email: string
    username: string;
    password: string;
}

export function Register(props: Props) {

    const { } = props;

    const [error, SetError] = useState("");
    const { register, handleSubmit, errors } = useForm<Inputs>();

    const register_api_call: SubmitHandler<Inputs> = (data) => {

        axios
            .post(`${process.env.REACT_APP_URL}/auth/register`, {
                email: data.email,
                username: data.username,
                password: data.password
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

            <div className="card-group" style={{ marginBottom: "30px" }}>
                <form className="card" onSubmit={handleSubmit(register_api_call)}>
                    <div className="auth-title">Email</div>
                    <input
                        className="auth-input"
                        name="email"
                        type="email"
                        placeholder="Enter Email"
                        ref={register({ required: true })}
                    ></input>
                    {errors.email && <p className="error-color">Email is required</p>}

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

                    <Button type="submit" variant="flat">Register</Button>
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