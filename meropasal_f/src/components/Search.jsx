import axios from "axios"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import Card from "./Card"

const Search = () => {
    const [product, setProduct] = useState([])
    const location = useLocation()
    console.log(location)

    useEffect(() => {
        axios.get(`http://localhost:8000/search/product?search=${location.state.searchparameter}`)
            .then(res => setProduct(res.data))
            .catch(err => console.log(err))
    }, [location.state.searchparameter]) //not product : will send infinite requests
    return (
        <>
            {product.map((item, index) => (
                <Card item={item} key={index} />
            ))}
        </>
    )
}

export default Search