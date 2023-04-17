import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getCategories, getSearch, getWebsites } from "./services/apiServices";
import FilterSection from "./SecondaryComponents/FilterSection";
import SearchSection from "./SecondaryComponents/SearchSection";
import ResultsSection from "./SecondaryComponents/ResultsSection";

const App = () => {
  const [categories, setCategories] = useState([]);
  const [websites, setWebsites] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [selectedWebsite, setSelectedWebsite] = useState("Todos");
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchData, setSearchData] = useState<any[]>([]);
  const [total, setTotal] = useState(1);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(24);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const categoriesData = await getCategories();
      const websitesData = await getWebsites();
      const { data, total } = await getSearch(
        selectedCategory,
        selectedWebsite,
        searchValue,
        page,
        limit
        );
      setSearchData(data);
      setTotal(total);
      setCategories(categoriesData);
      setWebsites(websitesData);
      setLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchSearchData = async () => {
      setLoading(true);
      const { data, total } = await getSearch(selectedCategory, selectedWebsite, searchValue, page);
      setSearchData(Array.isArray(data) ? data : []);
      setTotal(Number(total));
      setLoading(false);
    };
  
    fetchSearchData();
  }, [selectedCategory, selectedWebsite, page]);

  const handlePageChange = async (newPage: number) => {
    setPage(Number(newPage));
  };

  const handleSearch = async () => {
    setLoading(true);
    const { data, total } = await getSearch(selectedCategory, selectedWebsite, searchValue, page, limit);
    setSearchData(Array.isArray(data) ? data : []);
    setTotal(Number(total));
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
      <FilterSection
        categories={categories}
        websites={websites}
        selectedCategory={selectedCategory}
        selectedWebsite={selectedWebsite}
        handleCategoryChange={handleCategoryChange}
        handleWebsiteChange={handleWebsiteChange}
      />
      <SearchSection
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        handleSearch={handleSearch}
      />
      <ResultsSection
        loading={loading}
        searchData={searchData}
        page={page}
        total={total}
        limit={limit}
        handlePageChange={handlePageChange}
      />
    </Box>
  );
};

export default App;
