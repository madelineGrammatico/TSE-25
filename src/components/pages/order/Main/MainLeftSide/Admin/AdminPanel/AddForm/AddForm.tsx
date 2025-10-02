import { useOrderContext } from "@/context/OrderContext"
import { EMPTY_PRODUCT } from "@/constants/product"
import { useSuccessMessage } from "@/hooks/useSuccessMessage"
import { replaceFrenchCommaWithDot } from "@/utils/maths"
import Form from "../Form/Form"
import SubmitButton from "./SubmitButton"
import { useParams } from "react-router-dom"
// import { Product } from "@/types/Product"

export default function AddForm() {
  // state
  const { handleAdd, newProduct, setNewProduct, categories } = useOrderContext()
  const { isSubmitted, displaySuccessMessage } = useSuccessMessage()

  const { username } = useParams()

  // comportements
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!username) return
    const newProductToAdd = {
      ...newProduct,
      id: crypto.randomUUID(),
      price: replaceFrenchCommaWithDot(newProduct.price),
      categories: filterNewProductCategories()
    }
    handleAdd(newProductToAdd, username)
    setNewProduct(EMPTY_PRODUCT)

    displaySuccessMessage()
  }
  const filterNewProductCategories = () => {
      if (!newProduct.categories) return []
      const values = newProduct.categories.map((category) => category.value)
      return categories.filter((category)=> values.includes(category.value))
    }
  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target
    setNewProduct({ ...newProduct, [name]: value })
  }

  // affichage
  return (
    <Form product={newProduct} onSubmit={handleSubmit} onChange={handleChange}>
      <SubmitButton isSubmitted={isSubmitted} />
    </Form>
  )
}
