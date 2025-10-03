import { ColorValues, theme } from "@/theme/theme"
import { Category } from "@/types/Category"
import { Product } from "@/types/Product"

export const GetOptionsCategories = (
  categories: Category[]) => {
    return categories.map((category)=> {
      if (category.color === "") category.color = theme.colors.primary
      return {
          ...category,
          color: category.color as ColorValues,
          value: (category.value || "") ,
          label: (category.label || ""),
      }
  })
}

export const filterNewProductCategories = (
  newProduct: Product,
  categories:Category[]
) => {
    if (!newProduct.categories) return []
    const values = newProduct.categories.map((category) => category.value)
    return categories.filter((category)=> values.includes(category.value))
  }

  