import { useDispatch, useSelector } from 'react-redux';
import { clearSelectedProduct, createProductAsync, fetchProductByIdAsync, updateProductAsync,deleteProductAsync
} from '../../redux/productSlice';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Modal from '../resuablecomponent/Modal';
import * as Yup from 'yup';
import { useFormik } from 'formik';

export default function ProductionFrom() {


  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Product name is required'),
    description: Yup.string().required('Description is required'),
    price: Yup.number().required('Price is required'),
    discountPercentage: Yup.number().required('DiscountPercentage is required'),
    thumbnail: Yup.string().required('Thumbnail is required'),
    stock: Yup.number().required('Stock is required'),
    image1: Yup.string().required('Image1 is required'),
    image2: Yup.string().required('Image2 is required'),
    image3: Yup.string().required('Image3 is required'),
    brand: Yup.string().required('Brand is required'),
    category: Yup.string().required('Category is required'),
    highlight1: Yup.string().required('Highlight1 is required'),
    highlight2: Yup.string().required('Highlight2 is required'),
    highlight3: Yup.string().required('Highlight3 is required'),
    highlight4: Yup.string().required('highlight4 is required'),
    sizes: Yup.array(),
    colors: Yup.array()
  });


  const colorsArray = [
    {
      name: 'White',
      class: 'bg-white',
      selectedClass: 'ring-gray-400',
      id: 'white',
    },
    {
      name: 'Gray',
      class: 'bg-gray-200',
      selectedClass: 'ring-gray-400',
      id: 'gray',
    },
    {
      name: 'Black',
      class: 'bg-gray-900',
      selectedClass: 'ring-gray-900',
      id: 'black',
    },
  ];

  const sizesArray = [
    { name: 'XXS', inStock: true, id: 'xxs' },
    { name: 'XS', inStock: true, id: 'xs' },
    { name: 'S', inStock: true, id: 's' },
    { name: 'M', inStock: true, id: 'm' },
    { name: 'L', inStock: true, id: 'l' },
    { name: 'XL', inStock: true, id: 'xl' },
    { name: '2XL', inStock: true, id: '2xl' },
    { name: '3XL', inStock: true, id: '3xl' },
  ];

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      price: null,
      discountPercentage: null,
      thumbnail: '',
      stock: null,
      image1: '',
      image2: '',
      image3: '',
      brand: '',
      category: '',
      highlight1: '',
      highlight2: '',
      highlight3: '',
      highlight4: '',
      sizes: [],
      colors: []
    },
    validationSchema,
    onSubmit: async (values) => {

      console.log(values);
      const product = { ...values };
      product.images = [
        product.image1,
        product.image2,
        product.image3,
        product.thumbnail,
      ];
      product.highlights = [
        product.highlight1,
        product.highlight2,
        product.highlight3,
        product.highlight4,
      ];
      product.rating = 0;
      if (product.colors) {
        product.colors = product.colors.map((color) =>
          colorsArray.find((clr) => clr.id === color)
        );
      }
      if (product.sizes) {
        product.sizes = product.sizes.map((size) =>
          sizesArray.find((sz) => sz.id === size)
        );
      }

      delete product['image1'];
      delete product['image2'];
      delete product['image3'];
      product.price = +product.price;
      product.stock = +product.stock;
      product.discountPercentage = +product.discountPercentage;
      console.log(product);
      if (params.id) {
        product.id = params.id;
        product.rating = selectedProduct.rating || 0;
        dispatch(updateProductAsync(product));
        // alert.success('Product Updated');

        formik.handleReset();
      } else {
        dispatch(createProductAsync(product));
        // alert.success('Product Created');
        formik.handleReset();
      }

    }
  })
  const brands = useSelector((state) => state.product.brands);
  const categories = useSelector((state) => state.product.categories);
  const dispatch = useDispatch();
  const params = useParams();

  const selectedProduct = useSelector((state) => state.product.selectedProduct);
  console.log(params, "paramsid");
  const [openModal, setOpenModal] = useState(null);




  useEffect(() => {
    if (params.id) {
      dispatch(fetchProductByIdAsync(params.id));
    } else {
      dispatch(clearSelectedProduct());
    }
  }, [params.id, dispatch]);

  useEffect(() => {
    if (selectedProduct && params.id) {

      formik.setValues({
        title: selectedProduct.title,
        description: selectedProduct.description,
        price: selectedProduct.price,
        discountPercentage: selectedProduct.discountPercentage,
        thumbnail: selectedProduct.thumbnail,
        stock: selectedProduct.stock,
        image1: selectedProduct.images[0],
        image2: selectedProduct.images[1],
        image3: selectedProduct.images[3],
        brand: selectedProduct.brand,
        category: selectedProduct.category,
        highlight1: selectedProduct.highlights[0],
        highlight2: selectedProduct.highlights[1],
        highlight3: selectedProduct.highlights[2],
        highlight4: selectedProduct.highlights[3],
        sizes: selectedProduct.sizesArray || [],
        colors: selectedProduct.colorsArray || []
      });
    }
  }, [selectedProduct, params.id]);

  const handleDelete = () => {
    const product = { ...selectedProduct };
    dispatch(deleteProductAsync(product));
  };

  return (
    <>
      <form

        onSubmit={formik.handleSubmit}

      >
        <div className="space-y-12 bg-white p-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              {params.id ? 'Edit Product' : 'Add Product'}
            </h2>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              {selectedProduct && selectedProduct.deleted && (
                <h2 className="text-red-500 sm:col-span-6">
                  This product is deleted
                </h2>
              )}

              <div className="sm:col-span-6">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Product Name
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                    <input
                      type="text"
                      value={formik.values.title}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      id="title"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                   
                  </div>
                  {formik.touched.title && formik.errors.title ? (
                      <p className="mt-2 text-sm text-red-500">{formik.errors.title}</p>
                    ) : null}
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Description
                </label>
                <div className="mt-2">
                  <textarea
                    id="description"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    rows={3}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={''}
                  />
                  {formik.touched.description && formik.errors.description ? (
                    <p className="mt-2 text-sm text-red-500">{formik.errors.description}</p>
                  ) : null}
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Write a few sentences about product.
                </p>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="brand"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Brand
                </label>
                <div className="mt-2">
                  <select
                    id='brand'
                    value={formik.values.brand}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}

                  >
                    <option value="">--choose brand--</option>
                    {brands.map((brand) => (
                      <option key={brand.value} value={brand.value}>
                        {brand.label}
                      </option>
                    ))}
                  </select>
                  {formik.touched.brand && formik.errors.brand ? (
                    <p className="mt-2 text-sm text-red-500">{formik.errors.brand}</p>
                  ) : null}
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="colors"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Colors
                </label>
                <div className="mt-2 flex items-center flex-wrap">
                  {colorsArray.map((color) => (
                    <div className='flex items-center mx-1'>
                    
                      <input
                        id='colors'
                        type="checkbox"
                        onChange={(e) => {
                          const value = e.target.checked ? [...formik.values.colors, color.id] : formik.values.colors.filter((c) => c !== color.id);
                          formik.setFieldValue('colors', value);
                        }}
                        onBlur={formik.handleBlur}
                        key={color.id}
                        checked={formik.values.colors.some((obj) => obj === color.id)}
                      />{' '}
                      <div className='mx-1'>{color.name}</div>
                    </div>
                  ))}
                  {formik.touched.colors && formik.errors.colors ? (
                    <p className="mt-2 text-sm text-red-500">{formik.errors.colors}</p>
                  ) : null}

                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="sizes"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Sizes
                </label>
                <div className="mt-2 flex items-center flex-wrap">
                  {sizesArray.map((size) => (
                    <div className='flex items-center mx-1'>
                      <input
                        id='sizes'
                        type="checkbox"
                        onChange={(e) => {
                          const value = e.target.checked ? [...formik.values.sizes, size.id] : formik.values.sizes.filter((c) => c !== size.id);
                          formik.setFieldValue('sizes', value);
                        }}

                        key={size.id}
                        value={size.id}
                        checked={ formik.values.sizes.some((obj) => obj === size.id)}
                      />{' '}
                     <div className='mx-1'>{size.name}</div> 
                    </div>
                  ))}
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="category"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Category
                </label>
                <div className="mt-2">
                  <select
                   id='category'
                    value={formik.values.category}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}

                  >
                    <option value="">--choose category--</option>
                    {categories.map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                  {formik.touched.category && formik.errors.category ? (
                    <p className="mt-2 text-sm text-red-500">{formik.errors.category}</p>
                  ) : null}
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="price"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Price
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                    <input
                      type="number"
                      value={formik.values.price}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      id="price"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                   
                  </div>
                  {formik.touched.price && formik.errors.price ? (
                      <p className="mt-2 text-sm text-red-500">{formik.errors.price}</p>
                    ) : null}
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="discountPercentage"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Discount Percentage
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                    <input
                      type="number"
                      value={formik.values.discountPercentage}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      id="discountPercentage"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                   
                  </div>
                  {formik.touched.discountPercentage && formik.errors.discountPercentage ? (
                      <p className="mt-2 text-sm text-red-500">{formik.errors.discountPercentage}</p>
                    ) : null}
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="stock"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Stock
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                    <input
                      type="number"
                      value={formik.values.stock}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      id="stock"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                    
                  </div>
                  {formik.touched.stock && formik.errors.stock ? (
                      <p className="mt-2 text-sm text-red-500">{formik.errors.stock}</p>
                    ) : null}
                </div>
              </div>

              <div className="sm:col-span-6">
                <label
                  htmlFor="thumbnail"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Thumbnail
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                    <input
                      type="text"
                      value={formik.values.thumbnail}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      id="thumbnail"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                    
                  </div>
                  {formik.touched.thumbnail && formik.errors.thumbnail ? (
                      <p className="mt-2 text-sm text-red-500">{formik.errors.thumbnail}</p>
                    ) : null}
                </div>
              </div>

              <div className="sm:col-span-6">
                <label
                  htmlFor="image1"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Image 1
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                    <input
                      type="text"
                      value={formik.values.image1}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}

                      id="image1"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                    
                  </div>
                  {formik.touched.image1 && formik.errors.image1 ? (
                      <p className="mt-2 text-sm text-red-500">{formik.errors.image1}</p>
                    ) : null}
                </div>
              </div>

              <div className="sm:col-span-6">
                <label
                  htmlFor="image2"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Image 2
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                    <input
                      type="text"
                      value={formik.values.image2}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      id="image2"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                   
                  </div>
                  {formik.touched.image2 && formik.errors.image2 ? (
                      <p className="mt-2 text-sm text-red-500">{formik.errors.image2}</p>
                    ) : null}
                </div>
              </div>

              <div className="sm:col-span-6">
                <label
                  htmlFor="image2"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Image 3
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                    <input
                      type="text"
                      value={formik.values.image3}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      id="image3"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  
                  </div>
                  {formik.touched.image3 && formik.errors.image3 ? (
                      <p className="mt-2 text-sm text-red-500">{formik.errors.image3}</p>
                    ) : null}
                </div>
              </div>

              <div className="sm:col-span-6">
                <label
                  htmlFor="highlight1"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Highlight 1
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                    <input
                      type="text"
                      value={formik.values.highlight1}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      id="highlight1"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                    
                  </div>
                  {formik.touched.highlight1 && formik.errors.highlight1 ? (
                      <p className="mt-2 text-sm text-red-500">{formik.errors.highlight1}</p>
                    ) : null}
                </div>
              </div>
              <div className="sm:col-span-6">
                <label
                  htmlFor="highlight2"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Highlight 2
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                    <input
                      type="text"
                      value={formik.values.highlight2}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      id="highlight2"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  
                  </div>
                  {formik.touched.highlight2 && formik.errors.highlight2 ? (
                      <p className="mt-2 text-sm text-red-500">{formik.errors.highlight2}</p>
                    ) : null}
                </div>
              </div>
              <div className="sm:col-span-6">
                <label
                  htmlFor="highlight3"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Highlight 3
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                    <input
                      type="text"
                      value={formik.values.highlight3}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      id="highlight3"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                   
                  </div>
                  {formik.touched.highlight3 && formik.errors.highlight3 ? (
                      <p className="mt-2 text-sm text-red-500">{formik.errors.highlight3}</p>
                    ) : null}
                </div>
              </div>
              <div className="sm:col-span-6">
                <label
                  htmlFor="highlight4"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Highlight 4
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                    <input
                      type="text"
                      value={formik.values.highlight4}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      id="highlight4"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                   
                  </div>
                  {formik.touched.highlight4 && formik.errors.highlight4 ? (
                      <p className="mt-2 text-sm text-red-500">{formik.errors.highlight4}</p>
                    ) : null}
                </div>
              </div>
            </div>
          </div>

          {/* <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Extra{' '}
            </h2>

            <div className="mt-10 space-y-10">
              <fieldset>
                <legend className="text-sm font-semibold leading-6 text-gray-900">
                  By Email
                </legend>
                <div className="mt-6 space-y-6">
                  <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input
                        id="comments"
                        name="comments"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                    </div>
                    <div className="text-sm leading-6">
                      <label
                        htmlFor="comments"
                        className="font-medium text-gray-900"
                      >
                        Comments
                      </label>
                      <p className="text-gray-500">
                        Get notified when someones posts a comment on a posting.
                      </p>
                    </div>
                  </div>
                  <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input
                        id="candidates"
                        name="candidates"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                    </div>
                    <div className="text-sm leading-6">
                      <label
                        htmlFor="candidates"
                        className="font-medium text-gray-900"
                      >
                        Candidates
                      </label>
                      <p className="text-gray-500">
                        Get notified when a candidate applies for a job.
                      </p>
                    </div>
                  </div>
                  <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input
                        id="offers"
                        name="offers"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                    </div>
                    <div className="text-sm leading-6">
                      <label
                        htmlFor="offers"
                        className="font-medium text-gray-900"
                      >
                        Offers
                      </label>
                      <p className="text-gray-500">
                        Get notified when a candidate accepts or rejects an
                        offer.
                      </p>
                    </div>
                  </div>
                </div>
              </fieldset>
            </div>
          </div> */}
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            onClick={formik.handleReset}
            className="text-sm rounded-md font-semibold bg-white p-2 leading-6 text-gray-900"
          >
          Reset
          </button>

          {selectedProduct && !selectedProduct.deleted && (
          <button
            onClick={(e) => {
              e.preventDefault();
              setOpenModal(true);
            }}
            className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Delete
          </button>
        )}

          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
      {selectedProduct && (
        <Modal
          title={`Delete ${selectedProduct.title}`}
          message="Are you sure you want to delete this Product ?"
          dangerOption="Delete"
          cancelOption="Cancel"
          dangerAction={handleDelete}
          cancelAction={() => setOpenModal(null)}
          showModal={openModal}
        ></Modal>
      )}
    </>
  )
};
