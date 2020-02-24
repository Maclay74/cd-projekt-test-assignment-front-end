import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from 'react-redux'
import LogInPage from "./LogIn";

const Router = ({ user }) => {

    return (
        <Route path={"/auth"} >
            {user.isAuthorized && <Redirect to={{pathname: "/tweets"}} />}
            {!user.isAuthorized && <LogInPage />}
        </Route>
    )
}

const mapStateToProps = state => ({
    user: state.user
})

export default connect(mapStateToProps)(Router);
