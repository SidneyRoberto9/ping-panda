"use client"

import EmptyCategoryState from "@/app/dashboard/category/[name]/empty-category-state"
import { EventCategory } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"

interface CategoryPageContentProps {
  hasEvents: boolean
  category: EventCategory
}

const CategoryPageContent = ({
  hasEvents: initialHasEvents,
  category,
}: CategoryPageContentProps) => {
  const { data: pollingData } = useQuery({
    queryKey: ["category", category.name, "hasEvents"],
    initialData: { hasEvents: initialHasEvents },
  })

  if (!pollingData.hasEvents) {
    return <EmptyCategoryState categoryName={category.name} />
  }

  return <div>CategoryPageContent</div>
}

export default CategoryPageContent
