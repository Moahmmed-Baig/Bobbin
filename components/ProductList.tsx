import { getProducts } from "@/lib/actions/actions";
import ProductCard from "./ProductCard";


const ProductList = async () => {
    const products = await getProducts();

    return (
        <div className="flex flex-col items-center gap-10 py-8 px-5 ">
            <p className="text-heading1-bold">Products</p>
            {!products || products.length === 0 ? (
                <p className="text-body-bold">No Products found</p>
            ) : (
                <div className="flex flex-wrap mx-20 gap-16">
                    {products.map((product: ProductType) => (
                        <ProductCard key={products._id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
};

export const dynamic = "force-dynamic";


export default ProductList;

