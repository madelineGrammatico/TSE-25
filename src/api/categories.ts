import { doc, getDoc, updateDoc } from "firebase/firestore"
import { db } from "./firebase-config"

export const getCategories = async (idUser) => {
  //const docRef = doc(CHEMIN)
  const docRef = doc(db, "users", idUser)

  const docSnapshot = await getDoc(docRef)
  if (docSnapshot.exists()) {
    const { categories } = docSnapshot.data()
    return categories as any
  }
}

export const updateCategoriesInDB = async (userId: any, categoriesUpdated: any) => {
  const docRef = doc(db, "users", userId)

  await updateDoc(docRef, {
    categories: categoriesUpdated,
  })
}
