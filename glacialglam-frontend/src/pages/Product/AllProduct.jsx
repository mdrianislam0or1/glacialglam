import { useState } from 'react';
import { useGetFilterProductsQuery } from '../../features/product/productApi';

const AllProduct = () => {
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [level, setLevel] = useState('');
  // Add state variables for other search criteria as needed

  const handleSearch = () => {
    // Fetch products based on search criteria
    // Pass search criteria as object to useGetFilterProductsQuery hook
  };

  const { data, error, isLoading } = useGetFilterProductsQuery({
    minPrice,
    maxPrice,
    level,
    // Add other search criteria here
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <div>
        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
        <input
          type="text"
          placeholder="Level"
          value={level}
          onChange={(e) => setLevel(e.target.value)}
        />
        {/* Add input fields for other search criteria */}
        <button onClick={handleSearch}>Search</button>
      </div>
      <div>
        {data?.products.map((product) => (
          <div key={product._id}>
            <h3>{product.name}</h3>
            <p>Price: {product.price}</p>
            {/* Display other product details as needed */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProduct;
