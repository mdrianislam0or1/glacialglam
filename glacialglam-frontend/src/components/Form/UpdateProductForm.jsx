/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import Success from '../../ui/Success';
import Error from '../../ui/Error';
import TextInput from '../../ui/TextInput';
import TagsInput from '../../ui/TagsInput';
import TextArea from '../../ui/TextArea';
import { useUpdateProductMutation } from '../../features/product/productApi';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { toast } from "react-toastify";
import { useSelector } from 'react-redux';
import axios from 'axios';

const UpdateProductForm = ({ product }) => {
  const { productId } = useParams();
  const { token, user } = useSelector((state) => state.auth) || {};

  const [updateProductMutation, { isError, isLoading, isSuccess }] = useUpdateProductMutation(JSON.stringify(productId));

  const { createdBy: { _id: initialCreatedBy },
    name: initialName,
    image: initialImage,
    brand: initialBrand,
    categoryId: initialCategoryId,
    price: initialPrice,
    description: initialDescription,
    tags: initialTags,
    manufacturingDate: initialManufacturingDate,
    expireDate: initialExpireDate,
    countInStock: initialCountInStock,
    details: initialDetails,
  } = product;

  const [name, setName] = useState(initialName);
  const [image, setImage] = useState(initialImage);
  const [brand, setBrand] = useState(initialBrand);
  const [categoryId, setCategoryId] = useState(initialCategoryId);
  const [price, setPrice] = useState(initialPrice);
  const [description, setDescription] = useState(initialDescription);
  const [tags, setTags] = useState(initialTags);
  const [manufacturingDate, setManufacturingDate] = useState(initialManufacturingDate);
  const [expireDate, setExpireDate] = useState(initialExpireDate);
  const [countInStock, setCountInStock] = useState(initialCountInStock);
  const [details, setDetails] = useState(initialDetails);
  const [createdBy, setCreatedBy] = useState(initialCreatedBy);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await updateProductMutation({
  //       productId,
  //       name,
  //       image,
  //       brand,
  //       categoryId,
  //       price,
  //       description,
  //       tags,
  //       manufacturingDate,
  //       expireDate,
  //       countInStock,
  //       details,
  //       createdBy,
  //     });

  //     if (response.error) {
  //       console.error("Error updating product:", response.error);
  //     } else {
  //       console.log("Product updated:", response.data);
  //     }
  //   } catch (error) {
  //     console.error("Error updating product:", error);
  //   }
  // };



const handleSubmit = async (e) => {
  e.preventDefault();
  
  try {
    // Upload image to ImgBB
    const imgbbResponse = await uploadImageToImgBB(image);

    // Check if the image upload to ImgBB was successful
    if (imgbbResponse && imgbbResponse.success) {
      // Use the ImgBB URL in your updateProductMutation
      const response = await updateProductMutation({
        productId,
        name,
        image: imgbbResponse.data.url, // Use ImgBB URL here
        brand,
        categoryId,
        price,
        description,
        tags,
        manufacturingDate,
        expireDate,
        countInStock,
        details,
        createdBy,
      });

      if (response.error) {
        console.error("Error updating product:", response.error);
      } else {
        console.log("Product updated:", response.data);
      }
    } else {
      console.error("Error uploading image to ImgBB");
    }
  } catch (error) {
    console.error("Error updating product:", error);
  }
};

const uploadImageToImgBB = async (imageFile) => {
  try {
    const formData = new FormData();
    formData.append('image', imageFile);

    const imgbbResponse = await axios.post('https://api.imgbb.com/1/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      params: {
        key: '1649fb6f862db7406016a17722160f94', // Replace with your ImgBB API key
      },
    });

    return imgbbResponse.data;
  } catch (error) {
    console.error("Error uploading image to ImgBB:", error);
    return null;
  }
};


  
  return (
    <div>
      <form method="POST" onSubmit={handleSubmit}>
        <div className="shadow overflow-hidden sm:rounded-md">
          <div className="px-4 py-5 sm:p-6">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <TextInput
                  title="Product Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
             

              <div className="col-span-6 sm:col-span-3">
    <TextInput
      title="Image"
      type="file"
      onChange={(e) => setImage(e.target.files[0])} 
    />
  </div>
              <div className="col-span-6 sm:col-span-3">
                <TextInput
                  title="Brand"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <TextInput
                  title="Category ID"
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <TextInput
                  title="Price"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <TextInput
                  title="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="col-span-6">
                <TagsInput
                  title="Tags"
                  tags={tags}
                  value={tags}
                  onChange={(newTags) => setTags(newTags)}
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <TextInput
                  title="Manufacturing Date"
                  type="date"
                  value={manufacturingDate}
                  onChange={(e) => setManufacturingDate(e.target.value)}
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <TextInput
                  title="Expire Date"
                  type="date"
                  value={expireDate}
                  onChange={(e) => setExpireDate(e.target.value)}
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <TextInput
                  title="Count In Stock"
                  value={countInStock}
                  onChange={(e) => setCountInStock(Number(e.target.value))}
                />
              </div>
              <div className="col-span-6">
                <TextInput
                  title="Level"
                  value={details.level}
                  onChange={(e) =>
                    setDetails({ ...details, level: e.target.value })
                  }
                />
              </div>
              <div className="col-span-6">
                <TextArea
                  title="Description"
                  value={details.description}
                  onChange={(e) =>
                    setDetails({ ...details, description: e.target.value })
                  }
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <TextInput
                  title="Created By"
                  value={createdBy}
                  onChange={(e) => setCreatedBy(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="px-4 py-3  text-right sm:px-6">
            <button
              type="submit"
              className="bg-indigo-500 text-white px-4 py-2 rounded mt-4"
              disabled={isLoading}
            >
              {isLoading ? "Submitting..." : "Submit"}
            </button>
          </div>

          {isSuccess && toast.success('Update successfull') &&
           <Success message="Product was updated successfully" />}
          {isError && <Error message="There was an error updating the product!" />}
        </div>
      </form>
    </div>
  );
}

export default UpdateProductForm;
