// @ts-nocheck
import React from "react";


import { Outlet, Link } from "react-router-dom";
import { signOutUser } from "../../utils/firebase/firebase";

import { ReactComponent as CrownLogo } from "../../assets/crown.svg";
import "./navigation.styles.scss";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux-store/user/user.selector";
import { selectIsCartOpen } from "../../redux-store/cart/cart.selector";

const Navigation = (props) => {
  const  currentUser  = useSelector(selectUser);
  const isCartOpen  = useSelector(selectIsCartOpen);
  return (
    <>
      <nav className="navigation">
        <Link className="logo-container" to="/">
          <CrownLogo className="logo"></CrownLogo>
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            SHOP
          </Link>
          {currentUser ? (
            <span className="nav-link" onClick={signOutUser}>
              SIGN OUT
            </span>
          ) : (
            <Link className="nav-link" to="/auth">
              SIGN IN
            </Link>
          )}
          <CartIcon />
          {isCartOpen && <CartDropdown />}
        </div>
      </nav>
      <Outlet />
    </>
  );
};
export default Navigation;
