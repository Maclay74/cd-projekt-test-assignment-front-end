import React from "react";
import {Formik} from "formik";
import {Form, Input, SubmitButton} from 'formik-antd'
import { Card, Typography, Alert } from "antd";
import styles from './style.module.scss'

const CredentialsHint = ({login, password}) => (
    <Alert
        message="Looking for the credentials, huh?"
        description={<div>In order to login use <b>{login}</b> as your login and <b>{password}</b> as a password.</div>}
        type="info"
        className={styles.error}
    />
);

const LogInForm = ({initialValues, validationSchema, onSubmit, error}) => {

    const login = 'admin';
    const password = 'password';

    return (
        <Card className={styles.container}>

            <Typography.Title level={3}>Log In</Typography.Title>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
            {() =>
                <Form layout={'vertical'}>
                    <Form.Item name='login' label={'Login'} required>
                        <Input name='login'/>
                    </Form.Item>

                    <Form.Item name='password' label={'Password'} required>
                        <Input.Password name='password' type='password'/>
                    </Form.Item>

                    <SubmitButton>Log In</SubmitButton>

                    {!!error && <Alert  message={error} type="error" showIcon className={styles.error}/> }
                    <CredentialsHint login={login} password={password}/>

                </Form>}
            </Formik>


        </Card>
    )
}

export default LogInForm;
