import React from "react";

import LogInContainer from "../../containers/LogIn";
import LogInComponent from "../../components/auth/LogInForm";

const LogIn = props => {
    return (
        <LogInContainer>
            {props => <LogInComponent {...props} />}
        </LogInContainer>
    )
}

export default LogIn;
