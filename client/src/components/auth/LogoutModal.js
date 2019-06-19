import React, { Component, Fragment } from "react";
import { NavLink } from "reactstrap";
import { connect } from "react-redux";
import { logout } from "../../store/actions/authActions";

class LogoutModal extends Component {
  render() {
    return (
      <Fragment>
        <NavLink onClick={this.props.logout} href="#">
          Log out
        </NavLink>
      </Fragment>
    );
  }
}

export default connect(
  null,
  { logout }
)(LogoutModal);
