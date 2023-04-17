import React from 'react';
import { Box, Button } from '@chakra-ui/react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrevClick = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <Box my={4}>
      <Button onClick={handlePrevClick} disabled={currentPage === 1} marginRight={2}>
        Página Anterior
      </Button>
      <Button onClick={handleNextClick} disabled={currentPage === totalPages}>
        Próxima Página
      </Button>
    </Box>
  );
};

export default Pagination;
