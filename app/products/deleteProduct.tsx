"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

type Product = {
  id: number;
  title: string;
  price: number;
  brandId: number;
};

const DeleteProduct = ({ product }: { product: Product }) => {
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  const handleDelete = async (productId: number) => {
    await axios.delete(`/api/product/${productId}`);
    router.refresh();
    setIsOpen(false);
  };

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button onClick={handleModal} className="btn bg-red-600 btn-sm text-black hover:bg-white hover:text-red-600">
        Delete
      </button>
      <div className={isOpen ? "modal modal-open" : "modal"}>
        <div className="modal-box">
          <h2 className="font-bold text-lg">Are sure to delete {product.title}? </h2>
          <div className="modal-action">
            <button type="button" onClick={handleModal} className="btn">
              No
            </button>
            <button onClick={() => handleDelete(product.id)} type="button" className="btn btn-primary">
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteProduct;
