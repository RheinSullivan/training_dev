"use client";
import { SyntheticEvent, useState } from "react";
import type { Brand } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";

const AddProduct = ({ brands }: { brands: Brand[] }) => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [brand, setBrand] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    await axios.post("/api/product", {
      title: title,
      price: Number(price),
      brandId: Number(brand),
    });
    setTitle("");
    setPrice("");
    setBrand("");
    router.refresh();
    setIsOpen(false);
  };

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button onClick={handleModal} className="btn bg-green-600 text-black hover:bg-white hover:text-green-600">
        Add New
      </button>
      <div className={isOpen ? "modal modal-open" : "modal"}>
        <div className="modal-box">
          <h2 className="font-bold text-lg">Add Product</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-control w-full">
              <label className="label font-bold">Product Name</label>
              <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder="Product Name" className="input input-bordered" />
            </div>
            <div className="form-control w-full">
              <label className="label font-bold">Price Product</label>
              <input value={price} onChange={(e) => setPrice(e.target.value)} type="text" placeholder="Price Product" className="input input-bordered" />
            </div>
            <div className="form-control w-full">
              <label className="label font-bold">Brand Product</label>
              <select className="select select-bordered" value={brand} onChange={(e) => setBrand(e.target.value)}>
                <option value="" disabled>
                  Select a Brand
                </option>
                {brands.map((brand) => (
                  <option value={Number(brand.id)} key={brand.id}>
                    {brand.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="modal-action">
              <button type="button" onClick={handleModal} className="btn">
                Close
              </button>
              <button type="submit" className="btn btn-primary">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
