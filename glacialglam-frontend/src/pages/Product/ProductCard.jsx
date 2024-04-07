/* eslint-disable react/prop-types */

const ProductCard = ({ product }) => {
  return (
    <div className="border border-gray-300 rounded-md p-4">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-32 object-cover mb-4"
      />
      <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
      <p className="text-gray-600 mb-2">{product.description}</p>
      <p className="text-gray-800 font-semibold">${product.price}</p>
    </div>
  );
};

export default ProductCard;
