export const metadata = {
  title: "Training Dev | Rhein Sullivan",
};

const ProductLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="p-10">
      <figure className="mb-5 font-bold italic">
        <div className="flex">
          <figcaption>
            <h1 className="text-3xl text-[#ff0000]">Rhein Sullivan</h1>
            <p className="text-white text-sm">Test Create, Read, Update, and Delete(CRUD) in Nextjs</p>
          </figcaption>
        </div>
      </figure>
      {children}
    </div>
  );
};

export default ProductLayout;
