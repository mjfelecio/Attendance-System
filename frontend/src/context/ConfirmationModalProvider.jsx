import { createContext, useState, useCallback } from "react";
import { ConfirmationModal } from "../components/common/ConfirmationModal";
import PropTypes from "prop-types";

export const ConfirmationModalContext = createContext();

export const ConfirmationModalProvider = ({ children }) => {
  const [confirmationModalState, setConfirmationModalState] = useState({
    open: false,
    title: null,
    message: "",
  });

  const [resolver, setResolver] = useState(null);

  const showConfirmationModal = useCallback((title, message) => {
    setConfirmationModalState({ open: true, title, message });

    return new Promise((resolve) => {
      setResolver(() => resolve); // store resolver
    });
  }, []);

  const handleClose = () => {
    setConfirmationModalState((prev) => ({ ...prev, open: false }));
  };

  const handleConfirm = () => {
    if (resolver) resolver(true);
    handleClose();
  };

  const handleCancel = () => {
    if (resolver) resolver(false);
    handleClose();
  };

  return (
    <ConfirmationModalContext.Provider value={{ showConfirmationModal }}>
      {children}
      <ConfirmationModal
        open={confirmationModalState.open}
        title={confirmationModalState.title}
        message={confirmationModalState.message}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </ConfirmationModalContext.Provider>
  );
};

ConfirmationModalProvider.propTypes = {
	children: PropTypes.node
}