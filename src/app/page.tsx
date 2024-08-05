import Image from "next/image";
import Link from "next/link";
import { HomeIcon } from '@heroicons/react/24/solid';
import PostsList from "@/components/posts-list";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="flex flex-col gap-3 text-center pt-32 px-5">
      <div className="flex items-center justify-center gap-3">
        <h1 className="text-4xl md:text-5xl font-bold mb-5">
          Welcome to my blog
        </h1>
        <HomeIcon className="w-12 h-12 text-black-300 mb-5" />
      </div>
      <div className="flex justify-center">
        <Image
          src="/images/luke-lung-03UCoidYvXw-unsplash.jpg"
          width={640}
          height={427}
          alt="Image of a typewriter"
          className="max-w-full h-auto"
        />
      </div>
      <p className="max-w-[750px] mx-auto leading-8">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus, a
        natus? Dolores veritatis perferendis non doloribus numquam praesentium
        aliquid tempora qui similique, exercitationem distinctio labore culpa
        nam natus consequuntur rem!
      </p>
      <Link href="/posts" className="mt-5 underline">All posts</Link>
      <Suspense fallback="Loading...">
        <PostsList limit={3} />
      </Suspense>
    </main>
  );
}
