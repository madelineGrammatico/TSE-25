import { ColorValues, theme } from "@/theme/theme"
import { Category } from "@/types/Category"
import { MultiValue } from "react-select"

export const GetOptionsCategories = (
  categories: MultiValue<Category>) => {
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

  