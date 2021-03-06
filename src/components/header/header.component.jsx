import React from 'react';
import {Link} from 'react-router-dom'
import "./header.styles.scss";
import {ReactComponent as Logo} from '../../assets/crown.svg'
import {auth} from '../../firebase/firebase.utils';
import {connect} from 'react-redux';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';

import userEvent from '@testing-library/user-event';

const Header = ({currentUser, hidden}) => (
    <div className="header">
            <Link to="/" className="logo-container" >
                <Logo className="logo" />
            </Link>
            <div className="options">
                <Link className="option" to="/shop">SHOP</Link>
                <Link className="option" to="/Contact">CONTACT</Link>
                {
                    currentUser ? (
                    <div className="option" onClick={() => auth.signOut()}>Sign Out</div>) : (
                    <Link className="option" to="/signin">Sign In</Link>)
                }
                <CartIcon />
            </div>
            {hidden ? null : <CartDropdown />}
    </div>
)

const mapStateToProps = ({user: {currentUser}, cart: {hidden} }) => ({
    currentUser,
    hidden
})

export default connect(mapStateToProps)(Header);