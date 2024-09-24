export const metadata = {
  title: "Training Dev | Rhein Sullivan",
};

const ProductLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="p-10">
      {children}
      <figure>Rhein Sullivan</figure>
    </div>
  );
};

export default ProductLayout;
