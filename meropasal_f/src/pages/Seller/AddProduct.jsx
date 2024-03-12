import axios from "axios"
import { useEffect, useState } from "react"

const AddProduct = () => {
    const sellerdata = JSON.parse(localStorage.getItem('user')) || {}

    const [categories, SetCategories] = useState('')
    const [error, setErrors] = useState('')


    const [product_name, SetProductName] = useState('')
    const [seller, SetSeller] = useState(sellerdata?.user?.id)
    const [selectedCategory, setSelectedCategory] = useState('');
    const [description, SetDescription] = useState('')
    const [price, SetPrice] = useState(0)
    const [stock, SetStock] = useState(0)
    const [product_image, SetProductImage] = useState(null)

    console.log(sellerdata)

    useEffect(() => {
        if (!categories) {  //checks if there are categories and if not then only sends a request to server
            axios.get('http://localhost:8000/api/viewcategory/')
                .then(res => {
                    const categoryArray = Object.values(res?.data); // Convert response object to array
                    SetCategories(categoryArray);

                })
                .catch(err => console.log(err))
        }
    }, [categories])

    const validatedata = () => {
        if(sellerdata===null){
            setErrors('you are not logged in.')
        }
        if (price === 0) {
            setErrors('price cannot be 0')
        }
        if (stock === 0) {
            setErrors('Stock must be greater than 0')
        }
    }

    const SubmitHandler = async (e) => {
        e.preventDefault()
        validatedata()  //call the function
        if (Object.keys(error).length === 0) {
            try {
                const formdata = new FormData()
                formdata.append('product_name', product_name)
                formdata.append('seller', seller)
                formdata.append('category', selectedCategory)
                formdata.append('description', description)
                formdata.append('price', price)
                formdata.append('stock', stock)
                formdata.append('product_image', product_image)

                const response = await axios.post(`http://localhost:8000/product/${sellerdata.user.id}/`, formdata, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Token ${sellerdata.token}`
                    }
                })
                SetProductName('')
                SetSeller('')
                setSelectedCategory('')
                SetDescription('')
                SetPrice(0)
                SetStock(0)
                SetProductImage(null)
                console.log(response.data)
                window.location.reload() //for some reason it was sending empty object for seller, this seems to have fixed it. I don't know why I did this and how its fixing the issue lol.

            } catch (err) {
                console.log(err)
            }
        }

        return

    }

    return (
        <>
            <div>
                <p>{error}</p>
                <form onSubmit={SubmitHandler} className="form">
                    <div>
                        <label htmlFor="name">Product Name</label>
                        <input type="text" id="name" value={product_name} onChange={e => SetProductName(e.target.value)} required />
                    </div>

                    <div>
                        <label htmlFor="category">Category:</label>

                        {categories.length > 0 ? (
                            <select value={selectedCategory} onChange={event => setSelectedCategory(event.target.value)} required>
                                <option value="">Select a category</option>
                                {categories.map((categoryObj, index) => (
                                    <option key={index} value={categoryObj.category}>
                                        {categoryObj.category}
                                    </option>
                                ))}
                            </select>
                        ) : (
                            <p>Loading categories...</p>
                        )}

                    </div>
                    <div>
                        <label htmlFor="description">Description</label>
                        <textarea id="description" cols="10" rows="5" value={description} onChange={e => SetDescription(e.target.value)} required></textarea>
                    </div>
                    <div>
                        <label htmlFor="price">Price</label>
                        <input type="number" id="price" onChange={e => SetPrice(e.target.value)} value={price} required />
                    </div>
                    <div>
                        <label htmlFor="stock">Stock</label>
                        <input type="number" id="stock" value={stock} onChange={e => SetStock(e.target.value)} required />
                    </div>
                    <div>
                        <label htmlFor="image">Product Image</label>
                        <input type="file" id="image" onChange={e => SetProductImage(e.target.files[0])} required />
                    </div>
                    <button className="flex-shrink-0  bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded">Add Product</button>
                </form>
            </div>

        </>
    )
}

export default AddProduct