import { useState, useEffect } from "react";

const SearchComponent = ({ initialProducts }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [maxProducts, setMaxProducts] = useState(initialProducts);

  // Always search from the original product list
  const searchProducts = (query) => {
    if (!query) {
      return initialProducts; // Reset to all products if query is empty
    }

    const lowerCaseQuery = query.toString().toLowerCase();

    return initialProducts.filter((product) => {
      return (
        product.name?.toLowerCase().includes(lowerCaseQuery) ||
        product.productCode?.toString().includes(lowerCaseQuery) ||
        product.size?.toLowerCase() === lowerCaseQuery ||
        product.color?.toLowerCase().includes(lowerCaseQuery) ||
        product.price?.toString().includes(lowerCaseQuery)
      );
    });
  };

  // Handle search input
  const handleSearch = (query) => {
    setSearchQuery(query); // Update the input value
    const filteredProducts = searchProducts(query); // Filter from original list
    setMaxProducts(filteredProducts); // Update product display
  };

  return (
    <div>
      <input
        type="text"
        className="form-control w-30 mx-3 mt-2"
        placeholder="Search"
        value={searchQuery} // Controlled input
        onChange={(e) => handleSearch(e.target.value)} // Sync input and filter
      />
      <ul>
        {maxProducts.map((product) => (
          <li key={product.productCode}>{product.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchComponent;
