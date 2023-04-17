import { Menu, MenuButton, MenuList, MenuItem, Button, Text } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

interface DropdownProps {
  title: string;
  options: string[];
  selected: string;
  onChange: (value: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ title, options, selected, onChange }) => {
  const handleMenuItemClick = (value: string) => {
    onChange(value);
  };

  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
        <Text>
          {title}: {selected}
        </Text>
      </MenuButton>
      <MenuList>
        <MenuItem onClick={() => handleMenuItemClick("Todos")}>Todos</MenuItem>
        {options.map((option, index) => (
          <MenuItem key={index} onClick={() => handleMenuItemClick(option)}>
            {option}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default Dropdown;
