export const types = {
    SIGN_IN: 'USER/SIGN_IN',
    SIGN_OUT: 'USER/SIGN_OUT',
};

const initialState = {
    token: null,
    isAuthorized: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case types.SIGN_IN:
            return {
                ...state,
                token: action.payload,
                isAuthorized: true,
            };

        case types.SIGN_OUT:
            return {
                ...state,
                token: null,
                isAuthorized: false,
            };

        default:
            return state
    }
}


export const actions = {
    signIn: token => async dispatch => {
        localStorage.setItem('token', token)
        dispatch({
            type: types.SIGN_IN,
            token
        });
    },

    signOut: () => async dispatch => {

        if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
            // Intentionally slow down application to see async logic
            await new Promise(resolve => setTimeout(resolve, 500))
        }

        localStorage.removeItem('token');
        dispatch({
            type: types.SIGN_OUT
        });
    },

};