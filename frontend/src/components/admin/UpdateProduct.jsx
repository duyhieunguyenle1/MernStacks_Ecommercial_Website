import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";

import { updateProduct, getProductDetails, clearErrors } from "../../actions/productActions";
import MetaData from "../layouts/MetaData";
import Loader from "../layouts/Loader";
import Sidebar from './Sidebar';
import { UPDATE_PRODUCT_RESET } from '../../constants/productConstants';

const UpdateProduct = () => {
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('')
    const [stock, setStock] = useState(0)
    const [seller, setSeller] = useState('')
    const [images, setImages] = useState([])
    const [oldImages, setOldImages] = useState([])
    const [imagesPreview, setImagesPreview] = useState([])

    const categories = [
        'Electronics',
        'Cameras',
        'Laptops',
        'Accessories',
        'Headphones',
        'Food',
        'Books',
        'Clothes/Shoes',
        'Beauty/Health',
        'Sports',
        'Outdoor',
        'Home'
    ]

    const alert = useAlert()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { id } = useParams()

    const { loading: loadingProduct, error, product } = useSelector(state => state.productDetails)
    const { loading, error: updateError, isUpdated } = useSelector(state => state.product)

    useEffect(() => {
        if (!product) {
            dispatch(getProductDetails(id))
        }

        // Set prev data
        if (product && product?._id === id) {
            setName(product.name);
            setPrice(product.price);
            setDescription(product.description);
            setCategory(product.category);
            setStock(product.stock);
            setSeller(product.seller);
            setOldImages(product.images)
        }

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (updateError) {
            alert.error(updateError);
            dispatch(clearErrors())
        }

        if (isUpdated) {
            navigate('/admin/products')
            alert.success('Product updated successfully')
            dispatch({ type: UPDATE_PRODUCT_RESET })
        }

    }, [dispatch, alert, error, isUpdated, updateError, id, loadingProduct])

    const submitHandler = (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.set('name', name);
        formData.set('price', price);
        formData.set('description', description);
        formData.set('category', category);
        formData.set('stock', stock);
        formData.set('seller', seller);

        images.forEach(image => {
            formData.append('images', image)
        })

        dispatch(updateProduct(id, formData))
    }

    const onChangeHandler = e => {
        const files = Array.from(e.target.files)

        setImagesPreview([])
        setImages([])
        setOldImages([])

        files.forEach(file => {
            const reader = new FileReader()

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview(oldImage => [...oldImage, reader.result])
                    setImages(oldImage => [...oldImage, reader.result])
                }
            }

            reader.readAsDataURL(file)
        })

    }

    return (
        <>
            <MetaData title={'Update Products'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                {loadingProduct ? <Loader /> : (
                    <div className="col-12 col-md-10">
                        <div className="wrapper my-5">
                            <div className="container w-50">

                                <form className="shadow-lg" encType='multipart/form-data' onSubmit={submitHandler}>
                                    <h1 className="mb-4">Update Product</h1>

                                    <div className="mb-3">
                                        <label htmlFor="name_field">Name</label>
                                        <input
                                            type="text"
                                            id="name_field"
                                            className="form-control"
                                            required
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="price_field">Price</label>
                                        <input
                                            type="text"
                                            id="price_field"
                                            className="form-control"
                                            required
                                            value={price}
                                            onChange={(e) => setPrice(e.target.value)}
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="description_field">Description</label>
                                        <textarea className="form-control" id="description_field" rows="8" value={description}
                                            onChange={(e) => setDescription(e.target.value)}></textarea>
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="category_field">Category</label>
                                        <select className="form-control" id="category_field" value={category}
                                            onChange={(e) => setCategory(e.target.value)}
                                        >
                                            {categories.map(categ => (
                                                <option key={categ} value={categ}>{categ}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="stock_field">Stock</label>
                                        <input
                                            type="number"
                                            id="stock_field"
                                            className="form-control"
                                            required
                                            value={stock}
                                            onChange={(e) => setStock(e.target.value)}
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="seller_field">Seller Name</label>
                                        <input
                                            type="text"
                                            id="seller_field"
                                            className="form-control"
                                            required
                                            value={seller}
                                            onChange={(e) => setSeller(e.target.value)}
                                        />
                                    </div>

                                    <div className='mb-3'>
                                        <label>Images</label>

                                        <div className='custom-file'>
                                            <input
                                                type='file'
                                                name='product_images'
                                                className='custom-file-input'
                                                accept='images/*'
                                                id='customFile'
                                                multiple
                                                onChange={onChangeHandler}
                                            />
                                            <label className='custom-file-label' htmlFor='customFile'>
                                                Choose Images
                                                <span className='custom-file-label-tags'>Browse</span>
                                            </label>
                                        </div>
                                    </div>

                                    {oldImages && oldImages.map(img => (
                                        <img src={img.url} key={img} alt="Old Images" className="mt-3 me-2" width={'55'} height={'52'} />
                                    ))}

                                    {imagesPreview && imagesPreview.map(img => (
                                        <img src={img} key={img} alt="Images Preview" className="mt-3 me-2" width={'55'} height={'52'} />
                                    ))}

                                    <button
                                        id="login_button"
                                        type="submit"
                                        className="btn w-100 py-3 mt-3"
                                        disabled={loading ? true : false}
                                    >
                                        UPDATE
                                    </button>

                                </form>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default UpdateProduct