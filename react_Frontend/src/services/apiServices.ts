import apiClient from "./axiosClient";

export const getCategories = async () => {
  const response = await apiClient.get("/categories");
  return response.data;
};

export const getWebsites = async () => {
  const response = await apiClient.get("/websites");
  return response.data;
};

export const getSearch = async (
  category?: string,
  website?: string,
  searchValue?: string,
  page?: number,
  limit?: number
) => {
  try {
    let queryString = "";

    if (category && category !== "Todos") {
      queryString += `category=${encodeURIComponent(category)}&`;
    }

    if (website && website !== "Todos") {
      queryString += `website=${encodeURIComponent(website)}&`;
    }

    if (searchValue) {
      queryString += `search=${encodeURIComponent(searchValue)}&`;
    }

    if (page) {
      queryString += `page=${encodeURIComponent(page)}&`;
    }

    if (limit) {
      queryString += `limit=${encodeURIComponent(limit)}&`;
    }

    queryString = queryString.slice(0, -1);

    const response = await apiClient.get(`/search?${queryString}`);
    const data = response.data;
    return data

  } catch (error) {
    console.error("Error fetching search data:", error);
    throw error;
  }
};

