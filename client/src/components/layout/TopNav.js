import React, { Component } from "react";
// Utilities
import { NavLink as RouteLink } from "react-router-dom";

// Components
import {
  Navbar,
  NavItem,
  NavbarBrand,
  Nav,
  NavbarToggler,
  NavLink,
  Collapse,
  Container
} from "reactstrap";

class TopNav extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <Navbar color="dark" dark expand="sm">
        <Container>
          <NavbarBrand tag={RouteLink} exact to="/">
            Wallet
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem className="mx-3">
                <NavLink tag={RouteLink} exact to="/">
                  Settings
                </NavLink>
              </NavItem>
              <NavItem className="mx-3">
                <NavLink tag={RouteLink} exact to="/">
                  Profile
                </NavLink>
              </NavItem>
              <NavItem className="mx-3">
                <NavLink tag={RouteLink} exact to="/">
                  Logout
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    );
  }
}

export default TopNav;
