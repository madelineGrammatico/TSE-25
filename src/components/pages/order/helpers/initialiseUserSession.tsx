import { getMenu } from "@/api/product"
import { getLocalStorage } from "@/utils/window"
import { getCategories } from "@/api/categories"

const intialiseMenu = async (
  username: any,
  setMenu: any
) => {
  const menuReceived = await getMenu(username)
  setMenu(menuReceived)
}

const intialiseBasket = (
  username: any,
  setBasket: any
) => {
  const basketReceived = getLocalStorage(username) // localStorage est synchrone, pas besoin de "await".
  if (basketReceived) setBasket(basketReceived as any)
}

const intialiseCategories = async (
  username: any,
  setCategories: any
) => {
  //@ts-ignore
  const categoriesReceived = await getCategories(username)
  setCategories(categoriesReceived as any)
}


export const initialiseUserSession = async (
  username: any,
  setMenu: any,
  setBasket: any,
  setCategories: any,

) => {
  await intialiseMenu(username, setMenu)
  await intialiseCategories(username, setCategories)
  intialiseBasket(username, setBasket)
}