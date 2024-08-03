import prisma from "@/lib/db";
import Link from "next/link";
import { format } from "date-fns";
import { CalendarDaysIcon } from '@heroicons/react/24/solid'

export default async function PostsList({ limit }: { limit?: number } = {}) {
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: 'desc'
    },
    take: limit // Limit the results
  });

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id} className="mb-5 flex flex-col justify-center">
          <Link href={`/posts/${post.id}`}>{post.title}</Link>
          <small className="text-gray-500 flex items-center justify-center gap-1">
            <CalendarDaysIcon className="w-5 h-5 text-gray-500" />
            <div className="italic">
              {format(new Date(post.createdAt), 'MMMM d, yyyy')}
            </div>
          </small>
        </li>
      ))}
    </ul>
  );
}
