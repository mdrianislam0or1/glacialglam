// CreateProductForm.jsx
import React, { useState } from "react";
import { useCreateProductMutation } from "../../features/product/productApi";
import TextArea from "../../ui/TextArea";
import TextInput from "../../ui/TextInput";
import TagsInput from "../../ui/TagsInput";
import Success from "../../ui/Success";
import Error from "../../ui/Error";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

export const CreateProductForm = () => {
  const { token, user } = useSelector((state) => state.auth) || {};
  console.log(token);
  const [data, { isError, isLoading, isSuccess }] = useCreateProductMutation();
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("POCO");
  const [categoryId, setCategoryId] = useState("65898812d06d749f5ebb389e");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [manufacturingDate, setManufacturingDate] = useState("2023-01-15");
  const [expireDate, setExpireDate] = useState("2023-06-15");
  const [countInStock, setCountInStock] = useState(0);
  const [details, setDetails] = useState({
    level: "new",
    description: "",
  });
  const [createdBy, setCreatedBy] = useState("658d3f761b8f682e52a90ffa");

  const resetForm = () => {
    setName("");
    setImage("");
    setCategoryId("65898812d06d749f5ebb389e");
    setPrice(0);
    setDescription("");
    setTags([]);
    setManufacturingDate("2023-01-15");
    setExpireDate("2023-06-15");
    setCountInStock(0);
    setDetails({
      level: "new",
      description: "",
    });
    setCreatedBy("65a1637cfd6f336e40257c7f");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await data({
        name,
        image,
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
        console.error("Error adding product:", response.error);
      } else {
        console.log("New product:", response.data);
        resetForm();
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };
  
  return (
    <div className="container mx-auto">
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
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <TextInput
                  title="brand"
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

          {isSuccess && toast.success("Create Product") && <Success message="Product was added successfully" />}
          {isError && toast.error("Error Create Product") && <Error message="There was an error adding Product!" />}
        </div>
      </form>
    </div>
  );
};
