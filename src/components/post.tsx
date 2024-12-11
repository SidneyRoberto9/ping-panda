"use client"

import { useState } from "react"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { client } from "../lib/client"

export const RecentPost = () => {
  const [name, setName] = useState<string>("")
  const queryClient = useQueryClient()

  const { data: recentPost, isPending: isLoadingPosts } = useQuery({
    queryKey: ["get-recent-post"],
    queryFn: async () => {
      const res = await client.post.recent.$get()
      return await res.json()
    },
  })

  const createPost = useMutation({
    mutationFn: async ({ name }: { name: string }) => {
      await client.post.create.$post({ name })
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["get-recent-post"] })
      setName("")
    },
  })

  return (
    <div className="w-full max-w-xs">
      {isLoadingPosts ? (
        <p>Loading posts...</p>
      ) : recentPost ? (
        <p className="truncate">Your most recent post: {recentPost.name}</p>
      ) : (
        <p>You have no posts yet.</p>
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault()
          createPost.mutate({ name })
        }}
        className="flex flex-col gap-2"
      >
        <input
          type="text"
          placeholder="Enter a title..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="h-12 w-full rounded-md px-4 py-2 text-black outline outline-2 outline-brand-700"
        />
        <button
          type="submit"
          className="h-12 rounded-md bg-brand-700 px-10 py-3 font-semibold text-brand-50 transition hover:bg-brand-800"
        >
          Submit
        </button>
      </form>
    </div>
  )
}
