import React from "react";
import { Input, Button, VStack, HStack, useBreakpointValue } from "@chakra-ui/react";

interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ value, onChange, onSearch }) => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return isMobile ? (
    <VStack spacing={2} width="100%">
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Digite sua busca"
        width="100%"
      />
      <Button onClick={onSearch} width="100%">Search</Button>
    </VStack>
  ) : (
    <HStack spacing={4}>
      <Input value={value} onChange={(e) => onChange(e.target.value)} placeholder="Digite sua busca" />
      <Button onClick={onSearch}>Search</Button>
    </HStack>
  );
};

export default SearchBox;
