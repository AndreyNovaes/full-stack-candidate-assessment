import { Flex } from '@chakra-ui/react';
import SearchBox from '../components/SearchBox';

interface SearchSectionProps {
  searchValue: string;
  setSearchValue: (value: string) => void;
  handleSearch: () => void;
}

const SearchSection = ({ searchValue, setSearchValue, handleSearch } : SearchSectionProps) => {
  return (
    <Flex alignItems="center" justifyContent="center" marginTop={12}>
      <SearchBox value={searchValue} onChange={setSearchValue} onSearch={handleSearch} />
    </Flex>
  );
};

export default SearchSection;
