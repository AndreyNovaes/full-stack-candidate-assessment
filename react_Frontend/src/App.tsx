import { Box, Text as ChakraText, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import DropdownMenu from "./components/DropDownMenu";
import ColorModeSwitcher from "./components/LightDarkMode";
import Loading from "./components/Loading";
import ProductCard from "./components/ProductCard";
import SearchBox from "./components/SearchBox";
import { getCategories, getSearch, getWebsites } from "./services/apiServices";

const App = () => {
  const [categories, setCategories] = useState([]);
  const [websites, setWebsites] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [selectedWebsite, setSelectedWebsite] = useState("Todos");
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchData, setSearchData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const categoriesData = await getCategories();
      const websitesData = await getWebsites();
      const searchData = await getSearch(selectedCategory, selectedWebsite, searchValue);
      setSearchData(searchData);
      setCategories(categoriesData);
      setWebsites(websitesData);
      setLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchSearchData = async () => {
      setLoading(true);
      const searchData = await getSearch(selectedCategory, selectedWebsite, searchValue);
      setSearchData(searchData);
      setLoading(false);
    };
  
    fetchSearchData();
  }, [selectedCategory, selectedWebsite]);
  
  const handleSearch = async () => {
    setLoading(true);
    const searchData = await getSearch(selectedCategory, selectedWebsite, searchValue);
    setSearchData(searchData);
    setLoading(false);
  };
  

  const handleWebsiteChange = async (value: string) => {
    setSelectedWebsite(value);
  };

  const handleCategoryChange = async (value:string) => {
    setSelectedCategory(value);
  };


  return (
    <Box>
      <Flex
        marginTop={12}
        direction={{ base: "column", md: "row" }}
        justifyContent="center"
        alignItems="center"
        wrap={{ base: "wrap", md: "nowrap" }}
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
        <Box mx={{ base: 0, md: 4 }} my={{ base: 2, md: 0 }} />
        <ColorModeSwitcher />
      </Flex>
      <Flex alignItems="center" justifyContent="center" marginTop={12}>
        <SearchBox
          value={searchValue}
          onChange={setSearchValue}
          onSearch={handleSearch}
        />
      </Flex>
      <Box marginTop={12} textAlign="center">
  {loading ? (
    <Loading />
  ) : (
    <>
      <ChakraText>{searchData.length} resultados</ChakraText>
      <Flex wrap="wrap" justifyContent="center">
        {searchData.map(({ id, category, description, price, image, link, website }, index) => (
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
        ))}
      </Flex>
    </>
  )}
</Box>

    </Box>
  );
};

export default App;
