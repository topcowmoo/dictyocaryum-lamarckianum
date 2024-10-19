import PropTypes from 'prop-types';

function Button({ icon: Icon, label, onClick, className }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-x-2 
        rounded-[4px] h-12 w-36 text-lg 
        dark:bg-buttonbgc-dark bg-buttonbgc-light 
        dark:text-buttonti-dark text-buttonti-light 
        ${className}`}
    >
      {Icon && <Icon aria-hidden="true" className="h-5 w-5" />}
      <span className="truncate">{label}</span>
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
