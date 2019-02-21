import React from "react";
import PropTypes from "prop-types";

import "./Header.css";

class Header extends React.Component {
  render() {
    return (
      <div>
        <div className={this.props.className}>{this.props.value}</div>
      </div>
    );
  }
}
Header.propTypes = {
  value: PropTypes.string,
};
export default Header;