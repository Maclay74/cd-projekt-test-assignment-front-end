import React from "react";
import { connect } from 'react-redux'
import { actions } from "../store/user";
import { PropTypes } from 'prop-types'
import * as Yup from 'yup'
import { request } from "../services/api";

class LogIn extends React.Component {

    constructor(props) {
        super(props);

        this.initialValues = {
            login: '',
            password: '',
        }

        this.state = {
            error: null,
        }

        this.validationSchema = Yup.object().shape({
            login: Yup.string('Must be string')
                .required('Login is required'),
            password: Yup.string('Must be string')
                .required('Password is required'),
        })

        this.onSubmit = this.onSubmit.bind(this)
    }

    async onSubmit(fields, form) {

        const { signIn } = this.props;

        this.setState({
            error: null
        })

        if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
            // Intentionally slow down application to see async logic
            await new Promise(resolve => setTimeout(resolve, 500))
        }

        request('/auth/log-in', fields, 'post')
            .then(response => signIn(response.data.token))
            .catch(error => {

                if (!error.response) {
                    this.setState({
                        error: 'Unable to connect to the server'
                    })
                    return;
                }

                const { response: { data }} = error;

                for (const field in data.errors) {
                    const [ error ] = data.errors[field]
                    form.setFieldError(field, error)
                }

            })
    }

    render() {
        return this.props.children({
            initialValues: this.initialValues,
            validationSchema: this.validationSchema,
            onSubmit: this.onSubmit,
            error: this.state.error,
        })
    }
}

LogIn.defaultProps = {
    children: () => {},
}

LogIn.propTypes = {
    children: PropTypes.func,
}

export default connect(null, actions)(LogIn);
