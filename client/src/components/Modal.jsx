import PropTypes from 'prop-types';
import { PiXCircleDuotone } from "react-icons/pi";
import Button from "./Button";

const Modal = ({ onClose, children, showCloseButton = true }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="rounded-[4px] w-[450px] p-3 dark:bg-vault-dark bg-vault-light">
        {children}
        {showCloseButton && (
          <Button
            onClick={onClose}
            label="Close"
            icon={PiXCircleDuotone}
          />
        )}
      </div>
    </div>
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  showCloseButton: PropTypes.bool, // Add prop type for showCloseButton
};

export default Modal;
