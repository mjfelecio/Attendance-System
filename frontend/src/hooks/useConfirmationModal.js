import { useContext } from "react";
import { ConfirmationModalContext } from "../context/ConfirmationModalProvider";

export const useConfirmationModal = () => useContext(ConfirmationModalContext);
