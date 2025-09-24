export const checkIfProductIsClicked = (idProductInMenu: any, idProductClickedOn: any): any => {
  return idProductInMenu === idProductClickedOn
}

export const getProductsToDisplay = (categoryAll: any, products: any, activeCategory: any) => {
  const productsToDisplayed = categoryAll.isActive
    ? products
    : products.filter(({ categories: categoriesFromMenu }) =>
        categoriesFromMenu?.some(
          (categoryFromMenu) => categoryFromMenu.label === activeCategory?.label
        )
      )
  return productsToDisplayed
}
