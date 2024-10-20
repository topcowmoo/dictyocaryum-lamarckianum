import PropTypes from "prop-types";

function AuthLayout({ children }) {
  return <div>{children}</div>;
}

AuthLayout.propTypes = {
  children: PropTypes.node.isRequired, 
};

export default AuthLayout;
