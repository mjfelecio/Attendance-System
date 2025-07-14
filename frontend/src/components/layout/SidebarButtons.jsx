import { VStack, Button, Text, Icon, Box } from "@chakra-ui/react";
import { FaTachometerAlt, FaUserGraduate, FaCalendarAlt, FaListAlt, FaCog, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../features/auth/provider/AuthProvider";

const SideBarButtons = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { icon: FaTachometerAlt, label: 'Dashboard', path: '/Dashboard' },
    { icon: FaCalendarAlt, label: 'Calendar', path: '/CalendarPage' },
    { icon: FaListAlt, label: 'Manage List', path: '/ManageList' },
    { icon: FaCog, label: 'Settings', path: '/Settings' },
  ];

  return (
    <Box h="100%" display="flex" flexDirection="column">
      <Text fontSize="xl" fontWeight="bold" mb={6} px={4} pt={4}>
        Navigation
      </Text>

      <VStack spacing={2} align="stretch" flex="1" px={2}>
        {navItems.map((item) => (
          <Button
            key={item.path}
            leftIcon={<Icon as={item.icon} />}
            justifyContent="flex-start"
            variant="ghost"
            color="white"
            _hover={{
              bg: 'blue.700',
              transform: 'translateX(4px)',
            }}
            _active={{
              bg: 'blue.600',
            }}
            onClick={() => navigate(item.path)}
            py={6}
            px={4}
            borderRadius="md"
          >
            {item.label}
          </Button>
        ))}
      </VStack>

      <Box px={2} py={4}>
        <Button
          leftIcon={<Icon as={FaSignOutAlt} />}
          justifyContent="flex-start"
          variant="ghost"
          color="white"
          _hover={{
            bg: 'red.600',
            transform: 'translateX(4px)',
          }}
          _active={{
            bg: 'red.700',
          }}
          onClick={handleLogout}
          w="100%"
          py={6}
          px={4}
          borderRadius="md"
        >
          Log Out
        </Button>
      </Box>
    </Box>
  );
};

export default SideBarButtons;
