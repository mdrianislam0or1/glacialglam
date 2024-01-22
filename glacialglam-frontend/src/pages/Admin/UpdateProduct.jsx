import { useParams } from "react-router-dom";
import Error from "../../ui/Error";
import UpdateProductForm from "../../components/Form/UpdateProductForm";
import Spinner from "../../ui/Spinner";
import { useGetProductQuery } from "../../features/product/productApi";

const UpdateProduct = () => {
    const { productId } = useParams();
    const { data, isLoading, isError } = useGetProductQuery(productId);
     console.log(data?.data?.product);
  let content = null;

  if (isLoading) {
    content = <Spinner/>;
  }
  if (!isLoading && isError) {
    content = <Error message="There was an error!" />;
  }
  if (!isLoading && !isError && data?.data?.product?._id) {
    content = <UpdateProductForm product={data?.data?.product} />;
  }

    return (
        <div className="max-w-7xl mx-auto px-5 lg:px-0">
        <div className="w-full">
          <div className="px-4 sm:px-0 pb-4">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Edit video
            </h3>
            <p className="mt-1 text-sm text-gray-600">
              Please fillup the form to edit video
            </p>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">{content}</div>
        </div>
      </div>
  )
}

export default UpdateProduct