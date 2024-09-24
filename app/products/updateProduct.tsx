"use client";
import { SyntheticEvent, useState } from "react";
import type { Brand } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";

type Product = {
  id: number;
  title: string;
  price: number;
  brandId: number;
};

const UpdateProduct = ({ brands, product }: { brands: Brand[]; product: Product }) => {
  const [title, setTitle] = useState(product.title);
  const [price, setPrice] = useState(product.price);
  const [brand, setBrand] = useState(product.brandId);
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  const handleUpdate = async (e: SyntheticEvent) => {
    e.preventDefault();
    await axios.patch(`/api/product/${product.id}`, {
      title: title,
      price: Number(price),
      brandId: Number(brand),
    });
    router.refresh();
    setIsOpen(false);
  };

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button onClick={handleModal} className="btn bg-info text-black hover:bg-white hover:text-green-600 btn-sm">
        Edit
      </button>
      <div className={isOpen ? "modal modal-open" : "modal"}>
        <div className="modal-box">
          <h2 className="font-bold text-lg">Update {product.title}</h2>
          <form onSubmit={handleUpdate}>
            <div className="form-control w-full">
              <label className="label font-bold">Product Name</label>
              <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder="Product Name" className="input input-bordered" />
            </div>
            <div className="form-control w-full">
              <label className="label font-bold">Price Product</label>
              <input value={price} onChange={(e) => setPrice(Number(e.target.value))} type="text" placeholder="Price Product" className="input input-bordered" />
            </div>
            <div className="form-control w-full">
              <label className="label font-bold">Brand Product</label>
              <select className="select select-bordered" value={brand} onChange={(e) => setBrand(Number(e.target.value))}>
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

export default UpdateProduct;
