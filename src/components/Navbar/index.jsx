import React from "react";
import PropTypes from "prop-types";

function Navbar({title}) {
    return <React.Fragment>
        <nav className="navbar navbar-dark bg-dark">
            <div className="container">
                <span className="navbar-brand">{title}</span>
            </div>
        </nav>
    </React.Fragment>
}

Navbar.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    id: PropTypes.number,
};


export default Navbar