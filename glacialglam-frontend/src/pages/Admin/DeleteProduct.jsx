/* eslint-disable no-unused-vars */
import axios from "axios";
import { useGetAdminAllProductQuery } from "../../features/product/productApi";

const DeleteProduct = () => {
  const { data, isError, isLoading, isSuccess, refetch } = useGetAdminAllProductQuery();

  const adminAllProduct = data?.data;

  console.log(adminAllProduct);

  const handleDelete = async (productId) => {
    try {
      const res = await axios.delete(
        `http://localhost:5000/api/products/${productId}`,

        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${JSON.parse(localStorage.getItem("auth"))?.token
              }`,
          },
        }
      );
      console.log(res.data);
      await refetch();
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <div className=" min-h-screen">
      <div className="border-b border-gray-300 py-4 ">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            {/* head */}
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-100 border-b">
                  Select
                </th>
                <th className="px-6 py-3 bg-gray-100 border-b">Name</th>
                <th className="px-6 py-3 bg-gray-100 border-b">Description</th>
                <th className="px-6 py-3 bg-gray-100 border-b">Image</th>
                <th className="px-6 py-3 bg-gray-100 border-b">Price</th>
                <th className="px-6 py-3 bg-gray-100 border-b">Count in Stock</th>
                <th className="px-6 py-3 bg-gray-100 border-b">Created At</th>
                <th className="px-6 py-3 bg-gray-100 border-b">Updated At</th>
                <th className="px-6 py-3 bg-gray-100 border-b">
                  Details
                </th>
                <th className="px-6 py-3 bg-gray-100 border-b">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {/* rows */}
              {adminAllProduct?.map((product) => (
                <tr key={product._id}>
                  <th>
                    <label>
                      <input type="checkbox" className="checkbox" />
                    </label>
                  </th>

                  <td className="px-6 py-4 whitespace-nowrap">{product.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">

                    {product.description.length > 50 ?
                      product.description.substring(0, 30) + "..." :
                      product.description
                    }
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">${product.price}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{product.countInStock}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{product.createdAt}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{product.updatedAt}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="btn btn-ghost btn-xs">Details</button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="btn btn-ghost btn-xs">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>


          </table>
        </div>
      </div>
    </div>
  );
};

export default DeleteProduct;
