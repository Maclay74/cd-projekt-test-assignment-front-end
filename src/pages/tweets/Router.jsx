import React from "react";
import { Route } from "react-router-dom";
import { connect } from 'react-redux'
import TweetsTable from "./Table";

const Router = ({ user }) => {

    return (
        <Route path={"/tweets"} >
            <TweetsTable showAdminPanel={user.isAuthorized} />
        </Route>
    )
}

const mapStateToProps = state => ({
    user: state.user
})

export default connect(mapStateToProps)(Router);
