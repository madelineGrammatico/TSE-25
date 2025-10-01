import { useOrderContext } from "@/context/OrderContext"
import { EMPTY_PRODUCT } from "@/constants/product"
import { useSuccessMessage } from "@/hooks/useSuccessMessage"
import { replaceFrenchCommaWithDot } from "@/utils/maths"
import Form from "../Form/Form"
import SubmitButton from "./SubmitButton"
import { useParams } from "react-router-dom"
import { Product } from "@/types/Product"

export default function AddForm() {
  // state
  const { handleAdd, newProduct, setNewProduct, categories } = useOrderContext()
  const { isSubmitted, displaySuccessMessage } = useSuccessMessage()

  const { username } = useParams()

  // comportements
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log("handle submit",)
    if (!username) return
    const newProductToAdd = {
      ...newProduct,
      id: crypto.randomUUID(),
      price: replaceFrenchCommaWithDot(newProduct.price),
      categories: categories.filter((category) => { 
        // console.log("filter :", category.value === newProduct.categories?.values )
        if(!category.value) return false
        return newProduct.categories?.includes(category.value)
        // return  === newProduct.categories?.values 
      })
    } as Product
    console.log("filter :", )
    console.log("newProductToAdd :", newProductToAdd.categories)
    handleAdd(newProductToAdd, username)
    setNewProduct(EMPTY_PRODUCT)

    displaySuccessMessage()
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target
    console.log("onChange", name, value)
    setNewProduct({ ...newProduct, [name]: value })
    console.log("onChange NewProduct :", newProduct)
  }

  // affichage
  return (
    <Form product={newProduct} onSubmit={handleSubmit} onChange={handleChange}>
      <SubmitButton isSubmitted={isSubmitted} />
    </Form>
  )
}
