import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { actions } from "../store/user";

const Header = ({ user, children = () => () => {}, signOut}) => children({
    isAuthorized: user.isAuthorized,
    signOut,
})

const mapStateToProps = state => ({
    user: state.user
})

Header.propTypes = {
    children: PropTypes.func
}

export default connect(mapStateToProps, actions) (Header);