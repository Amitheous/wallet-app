import React, { Component } from "react";
// Utilities
import { NavLink as RouteLink } from "react-router-dom";

// Components
import {
  Navbar,
  NavItem,
  Nav,
  NavbarToggler,
  NavLink,
  Collapse,
  Container
} from "reactstrap";

class BotNav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    };
  }
  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };
  render() {
    return (
      <Navbar color="info" dark expand="sm">
        <Container>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="mx-auto" navbar>
              <NavItem className="mx-3">
                <NavLink tag={RouteLink} exact to="/">
                  Overview
                </NavLink>
              </NavItem>
              <NavItem className="mx-3">
                <NavLink tag={RouteLink} exact to="/">
                  Income
                </NavLink>
              </NavItem>
              <NavItem className="mx-3">
                <NavLink tag={RouteLink} exact to="/">
                  Expenses
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    );
  }
}

export default BotNav;
