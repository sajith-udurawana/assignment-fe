import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";

/**
 * Navbar Function
 * Description: This function defines a navigation bar component.
 * It renders a navigation bar with a title as a link to the home page.
 *
 * Props:
 * - title: The title to be displayed in the navigation bar.
 */
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
};

export default Navbar;
