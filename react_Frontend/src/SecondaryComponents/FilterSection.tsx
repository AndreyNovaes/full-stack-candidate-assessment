import { Box, Flex } from '@chakra-ui/react';
import DropdownMenu from '../components/DropDownMenu';
import ColorModeSwitcher from '../components/LightDarkMode';

// need type organization, can be reutilized
interface FilterSectionProps {
  categories: string[];
  websites: string[];
  selectedCategory: string;
  selectedWebsite: string;
  handleCategoryChange: (newCategory: string) => void;
  handleWebsiteChange: (newWebsite: string) => void;
}

const FilterSection = ({ categories, websites, selectedCategory, selectedWebsite, handleCategoryChange, handleWebsiteChange } : FilterSectionProps) => {
  return (
    <Flex
      marginTop={12}
      direction={{ base: 'column', md: 'row' }}
      justifyContent="center"
      alignItems="center"
      wrap={{ base: 'wrap', md: 'nowrap' }}
    >
      <DropdownMenu
        title="Categoria"
        options={categories}
        selected={selectedCategory}
        onChange={handleCategoryChange}
      />
      <Box mx={{ base: 0, md: 4 }} my={{ base: 2, md: 0 }} />
      <DropdownMenu
        title="Website"
        options={websites}
        selected={selectedWebsite}
        onChange={handleWebsiteChange}
      />
      <ColorModeSwitcher />
    </Flex>
  );
};

export default FilterSection;
