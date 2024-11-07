import PropTypes from 'prop-types';

function Button({ icon: Icon, label, onClick, className, type = "button", iconSize }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-x-2 
        rounded-[4px] h-12 w-36 text-lg 
        dark:bg-buttonbgc-dark bg-buttonbgc-light 
        dark:text-buttonti-dark text-buttonti-light
        transition-transform duration-150 transform active:scale-95 
        ${className}`}
    >
       {Icon && <Icon size={iconSize} />}
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
  type: PropTypes.string,
  iconSize: PropTypes.number,
};

export default Button;
