import PropTypes from 'prop-types';
import { PiXCircleDuotone } from "react-icons/pi";
import Button from "./Button";

const Modal = ({ onClose, children, showCloseButton = true }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-sidebar-light dark:bg-sidebar-dark rounded-[4px] shadow-xl max-w-[90%] w-[600px]">
        {children}
        {showCloseButton && (
          <div className="flex justify-end mt-4">
            <Button
              onClick={onClose}
              label="Close"
              icon={PiXCircleDuotone}
              className="dark:bg-buttonbgc-dark bg-buttonbgc-light dark:text-buttonti-dark text-buttonti-light"
            />
          </div>
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
