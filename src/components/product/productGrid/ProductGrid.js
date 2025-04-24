import { StarIcon, } from '@heroicons/react/20/solid';
import { Link } from 'react-router-dom';
import { Grid } from 'react-loader-spinner';
import toast from 'react-hot-toast';
export default function ProductGrid({ products, status }) {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-0 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8">
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {status === 'loading' && (
            <Grid
              height="80"
              width="80"
              color="rgb(79, 70, 229) "
              ariaLabel="grid-loading"
              radius="12.5"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          ) }
          {products.map((product) => (
            <Link to={`/dashboard/product-detail/${product.id}`} key={product.id} onClick={(e) => {
              if (product.stock <= 0) {
                toast.error("Product out of stock");
                e.preventDefault();
              }
            }}>
              <div className="group relative border-solid border-2 p-2 border-gray-200">
                <div className="min-h-60 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-60">
                  <img src={product.thumbnail}  alt={product.title} className="h-full w-full object-cover object-center lg:h-full lg:w-full"/>
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <div href={product.thumbnail} className="relative w-[90%] truncate">
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.title}
                      </div>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      <StarIcon className="w-6 h-6 inline"></StarIcon>
                      <span className=" align-bottom">{product.rating}</span>
                    </p>
                  </div>
                  <div className=' flex-col'>
                    {/* <p className="text-sm block font-medium text-gray-900">
                        ${product.discountPrice}
                      </p> */}
                    <p className="text-sm block line-through font-medium text-gray-400">
                      ₹{product.price}
                    </p>
                    <>
                      {(product.discountPrice) ? (
                        <p className="text-sm block font-medium text-gray-900">
                          ₹{product.discountPrice}{" "}
                        </p>
                      ) : (
                        <p className="text-sm block font-medium text-gray-900">
                          ₹{product.price - (product.price * product.discountPercentage / 100)}{" "}
                        </p>
                      )}
                    </>

                  </div>
                </div>
                {product.deleted && (
                  <div>
                    <p className="text-sm text-red-400">product deleted</p>
                  </div>
                )}
                
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div >
  );
}
