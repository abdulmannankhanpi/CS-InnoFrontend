import { useRef, useState } from "react";
import {Container, Nav, Navbar} from "react-bootstrap";
import { IoCloseOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { TbWorldSearch } from "react-icons/tb";

import "./Header.css";

function Header() {
  const navRef = useRef<HTMLDivElement | null>(null);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);

  const handleNavClick = () => {
    setIsCollapsed(true);
  };

  return (
    <Navbar
      ref={navRef}
      collapseOnSelect
      expand="lg"
      fixed="top"
      className="bg-body-tertiary navbar"
      expanded={!isCollapsed}
    >
      <Container>
        <Navbar.Brand
          className="d-flex align-items-center gap-1"
          as={NavLink}
          to="/"
        >
          <TbWorldSearch />
          Innoscripta News
        </Navbar.Brand>
        {isCollapsed && (
          <Navbar.Toggle
            className="border-0"
            aria-controls="basic-navbar-nav"
            onClick={() => setIsCollapsed(!isCollapsed)}
          />
        )}

        {!isCollapsed && (
          <IoCloseOutline
            size={40}
            className="close-btn"
            onClick={() => setIsCollapsed(!isCollapsed)}
          />
        )}
        <Navbar.Collapse id="responsive-navbar-nav" onClick={handleNavClick}>
          <Nav className="me-auto"></Nav>
          <Nav>
            <Nav.Link as={NavLink} to="/" onClick={handleNavClick}>
			Global Feed
            </Nav.Link>
            <Nav.Link as={NavLink} to="/personalize" onClick={handleNavClick}>
              My Feed
            </Nav.Link>
            <Nav.Link as={NavLink} to="/about-us" onClick={handleNavClick}>
              About us
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
