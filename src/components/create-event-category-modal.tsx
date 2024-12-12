"use client"

import { Fragment, PropsWithChildren, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Modal from "@/components/ui/modal"
import { client } from "@/lib/client"
import { CATEGORY_NAME_VALIDATOR } from "@/lib/validators/category-validator"
import { cn } from "@/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"

const EVENT_CATEGORY_VALIDATOR = z.object({
  name: CATEGORY_NAME_VALIDATOR,
  color: z
    .string()
    .min(1, "Color is required.")
    .regex(/^#[0-9A-F]{6}/i, "Invalid Color format."),
  emoji: z.string().emoji("Invalid emoji.").optional(),
})

type EventCategoryForm = z.infer<typeof EVENT_CATEGORY_VALIDATOR>

const COLOR_OPTIONS = [
  "#FF6B6B", // bg-[#FF6B6B] ring-[#FF6B6B] Bright Red
  "#4ECDC4", // bg-[#4ECDC4] ring-[#4ECDC4] Teal
  "#45B7D1", // bg-[#45B7D1] ring-[#45B7D1] Sky Blue
  "#FFA07A", // bg-[#FFA07A] ring-[#FFA07A] Light Salmon
  "#98D8C8", // bg-[#98D8C8] ring-[#98D8C8] Seafoam Green
  "#FDCB6E", // bg-[#FDCB6E] ring-[#FDCB6E] Mustard Yellow
  "#6C5CE7", // bg-[#6C5CE7] ring-[#6C5CE7] Soft Purple
  "#FF85A2", // bg-[#FF85A2] ring-[#FF85A2] Pink
  "#2ECC71", // bg-[#2ECC71] ring-[#2ECC71] Emerald Green
  "#E17055", // bg-[#E17055] ring-[#E17055] Terracotta
]

const EMOJI_OPTIONS = [
  { emoji: "💰", label: "Money (Sale)" },
  { emoji: "👤", label: "User (Sign-up)" },
  { emoji: "🎉", label: "Celebration" },
  { emoji: "📅", label: "Calendar" },
  { emoji: "🚀", label: "Launch" },
  { emoji: "📢", label: "Announcement" },
  { emoji: "🎓", label: "Graduation" },
  { emoji: "🏆", label: "Achievement" },
  { emoji: "💡", label: "Idea" },
  { emoji: "🔔", label: "Notification" },
]

interface CreateEventCategoryModalProps extends PropsWithChildren {
  containerClassName?: string
}

const CreateEventCategoryModal = ({
  children,
  containerClassName,
}: CreateEventCategoryModalProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const queryClient = useQueryClient()

  const { mutate: createEventCategory, isPending: isCreateEventCategory } =
    useMutation({
      mutationFn: async (data: EventCategoryForm) => {
        await client.category.createEventCategory.$post(data)
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["user-event-categories"] })
        setIsOpen(false)
        reset()
      },
    })

  const {
    watch,
    setValue,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EventCategoryForm>({
    resolver: zodResolver(EVENT_CATEGORY_VALIDATOR),
  })

  const color = watch("color")
  const selectedEmoji = watch("emoji")

  const onSubmit = (data: EventCategoryForm) => createEventCategory(data)

  return (
    <Fragment>
      <div className={containerClassName} onClick={() => setIsOpen(true)}>
        {children}
      </div>

      <Modal
        className="max-w-xl p-8"
        showModal={isOpen}
        setShowModal={setIsOpen}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <h2 className="text-lg/7 font-medium tracking-tight text-gray-950">
              New Event Category
            </h2>
            <p className="text-sm/6 text-gray-600">
              Create a new category to organize your events
            </p>
          </div>

          <div className="space-y-5">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                autoFocus
                id="name"
                {...register("name")}
                placeholder="e.g. user-signup"
                className="w-full"
              />
              {errors.name ? (
                <p className="mt-1 text-sm text-red-500">
                  {errors.name.message}
                </p>
              ) : null}
            </div>

            <div>
              <Label>Color</Label>
              <div className="flex flex-wrap gap-3">
                {COLOR_OPTIONS.map((preMadeColor) => (
                  <button
                    key={preMadeColor}
                    type="button"
                    className={cn(
                      `bg-[${preMadeColor}]`,
                      "size-10 rounded-full ring-2 ring-offset-2 transition-all",
                      color === preMadeColor
                        ? "scale-110 ring-brand-700"
                        : "ring-transparent hover:scale-105"
                    )}
                    onClick={() => setValue("color", preMadeColor)}
                  />
                ))}
              </div>
              {errors.color ? (
                <p className="mt-1 text-sm text-red-500">
                  {errors.color.message}
                </p>
              ) : null}
            </div>

            <div>
              <Label>Emoji</Label>
              <div className="flex flex-wrap gap-3">
                {EMOJI_OPTIONS.map(({ emoji, label }) => (
                  <button
                    key={emoji}
                    type="button"
                    className={cn(
                      "flex size-10 items-center justify-center rounded-md text-xl transition-all",
                      selectedEmoji === emoji
                        ? "scale-110 bg-brand-100 ring-2 ring-brand-700"
                        : "bg-brand-100 hover:bg-brand-200"
                    )}
                    onClick={() => setValue("emoji", emoji)}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
              {errors.emoji ? (
                <p className="mt-1 text-sm text-red-500">
                  {errors.emoji.message}
                </p>
              ) : null}
            </div>
          </div>

          <div className="flex justify-end space-x-3 border-t pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>

            <Button type="submit" disabled={isCreateEventCategory}>
              {isCreateEventCategory ? "Creating..." : "Create category"}
            </Button>
          </div>
        </form>
      </Modal>
    </Fragment>
  )
}

export default CreateEventCategoryModal
