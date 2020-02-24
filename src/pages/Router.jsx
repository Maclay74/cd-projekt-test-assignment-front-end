import React, {useEffect, useState} from 'react';
import { useDispatch } from "react-redux";
import { connect } from 'react-redux'
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import { Layout } from 'antd';
import AuthRouter from "./auth/Router";
import TweetsRouter from "./tweets/Router";
import HeaderContainer from "../containers/Header";
import HeaderComponent from "../components/header/header";
import styles from './main.module.scss'


const AppRouter = ({user}) => {

    const [init, setInit] = useState(false)
    const dispatch = useDispatch();
    const token = localStorage.getItem('token')

    useEffect(() => {
        if (token) {
            dispatch({
                type: 'USER/SIGN_IN',
                payload: token
            })
        }
        setInit(true)
    }, [token, dispatch])

    return (
        <Router>

            <HeaderContainer>
                {props => <HeaderComponent {...props}/>}
            </HeaderContainer>

            <Layout>
                <Layout.Content className={styles.layoutContent}>

                    {init && <React.Fragment>

                        <Route path={'/'} exact>
                            <Redirect to={{pathname: "/tweets"}}/>
                        </Route>

                        <AuthRouter/>
                        <TweetsRouter/>
                    </React.Fragment>}

                </Layout.Content>
            </Layout>
        </Router>
    )
}

const mapStateToProps = state => ({
    user: state.user,
})

export default connect(mapStateToProps)(AppRouter);
