import PropTypes from 'prop-types';

function Button({ icon: Icon, label, onClick, className }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-x-2 rounded-sm px-3.5 py-2.5 text-sm dark:bg-buttonbgc-dark bg-buttonbgc-light dark:text-buttonti-dark text-buttonti-light ${className}`}
    >
      {Icon && <Icon aria-hidden="true" className="-ml-0.5 h-5 w-5" />}
      {label}
    </button>
  );
}

// Define prop types for the Button component
Button.propTypes = {
  icon: PropTypes.elementType,  // Accept an icon as a prop
  label: PropTypes.string.isRequired, // Button label
  onClick: PropTypes.func, // Event handler for the button
  className: PropTypes.string, // Custom styles
};

export default Button;