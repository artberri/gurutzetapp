import {
	createContext,
	ReactNode,
	useCallback,
	useContext,
	useMemo,
} from "react"
import { Either, left, right } from "../cross-cutting/Either"
import { Category } from "../domain/Category"
import { CategoryStorage } from "../domain/CategoryStorage"
import { useService } from "./ServiceUtils"

export const CategoryContext = createContext<{
	getCategory: (id: string) => Either<Error, Category>
}>({
	getCategory: () => left<Category>(new Error("Context not initialized")),
})

export const CategoryProvider = ({ children }: { children: ReactNode }) => {
	const storage = useService(CategoryStorage)
	const categories = useMemo<Category[]>(() => storage.get(), [storage])

	const getCategory = useCallback(
		(id: string) => {
			const category = categories.find((c) => c.id === id)
			return category
				? right(category)
				: left<Category>(new Error("Category not found"))
		},
		[categories]
	)

	const value = useMemo(() => ({ getCategory }), [getCategory])

	return (
		<CategoryContext.Provider value={value}>
			{children}
		</CategoryContext.Provider>
	)
}

export const useCategories = () => useContext(CategoryContext)
