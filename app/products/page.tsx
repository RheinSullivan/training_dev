import { PrismaClient } from "@prisma/client";
import AddProduct from "./addProduct";
import DeleteProduct from "./deleteProduct";
import UpdateProduct from "./updateProduct";

const prisma = new PrismaClient();
const getProducts = async () => {
  const res = await prisma.product.findMany({
    select: {
      id: true,
      title: true,
      price: true,
      brandId: true,
      brand: true,
    },
  });
  return res;
};

const getBrands = async () => {
  const res = await prisma.brand.findMany();
  return res;
};

const Product = async () => {
  const [products, brands] = await Promise.all([getProducts(), getBrands()]);

  return (
    <div className="flex flex-col">
      <table className="table w-full rounded-none text-gray-800 bg-gray-500">
        <thead>
          <tr className="text-white bg-gray-800 uppercase">
            <th>Id</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Brands</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.id}>
              <td>{index + 1}</td>
              <td>{product.title}</td>
              <td>{product.price}</td>
              <td>{product.brand.name}</td>
              <td className="flex justify-center items- space-x-1">
                <UpdateProduct brands={brands} product={product} />
                <DeleteProduct product={product} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex mt-5 justify-end">
        <AddProduct brands={brands} />
      </div>
    </div>
  );
};

export default Product;
