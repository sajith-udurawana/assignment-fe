import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";

function Navbar({ title }) {
  return (
    <React.Fragment>
      <nav className="navbar navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand text-decoration-none" to="/">
            {title}
          </Link>
        </div>
      </nav>
    </React.Fragment>
  );
}

Navbar.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  id: PropTypes.number,
};

export default Navbar;
