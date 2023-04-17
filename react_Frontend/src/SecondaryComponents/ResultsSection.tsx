import React from 'react';
import { Box, Text as ChakraText, Flex } from '@chakra-ui/react';
import ProductCard from '../components/ProductCard';
import Pagination from '../components/Pagination';
import Loading from '../components/Loading';

interface ResultsSectionProps {
  loading: boolean;
  searchData: any[];
  page: number;
  total: number;
  limit: number;
  handlePageChange: (newPage: number) => void;
}

const ResultsSection = ({ loading, searchData, page, total, limit, handlePageChange }: ResultsSectionProps) => {
  return (
    <Box marginTop={12} textAlign="center">
      {loading ? (
        <Loading />
      ) : (
        <>
          <Pagination
            currentPage={page}
            totalPages={Math.ceil(total / limit)}
            onPageChange={handlePageChange}
          />
          <ChakraText fontSize="2xl" fontWeight="bold">
            {page !== undefined && total !== undefined
              ? `Página ${page} de ${Math.ceil(total / limit)}`
              : null}
          </ChakraText>
          <ChakraText fontSize="2xl" fontWeight="bold">
            {total !== undefined &&
              `Mostrando ${limit * page} resultados de um Total de ${total} resultados`}
          </ChakraText>

          <Flex wrap="wrap" justifyContent="center">
            {searchData.map(
              ({ id, category, description, price, image, link, website }, index) => (
                <Box key={index} m={2}>
                  <ProductCard
                    id={id}
                    category={category}
                    description={description}
                    price={price}
                    image={image}
                    link={link}
                    website={website}
                  />
                </Box>
              ),
            )}
          </Flex>
        </>
      )}
    </Box>
  );
};

export default ResultsSection;
