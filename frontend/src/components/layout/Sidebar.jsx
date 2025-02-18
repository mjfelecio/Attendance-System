import { motion } from "framer-motion";
import SButtons from "./SidebarButtons";
import { Box } from "@chakra-ui/react";
import PropTypes from "prop-types";

const MotionBox = motion(Box);

const Sidebar = ({ isOpen }) => {
  return (
    <MotionBox
      w="250px"
      bg="blue.900"
      color="white"
      gap={4}
      h="100%"
      position="absolute"
      left="0"
      top="0"
      initial={{ x: "-100%" }}
      animate={{ x: isOpen ? "0%" : "-100%" }}
      exit={{ x: "-100%" }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 18,
      }}
    >
      <SButtons />
    </MotionBox>
  );
};

Sidebar.propTypes = {
	isOpen: PropTypes.bool
}

export default Sidebar;
