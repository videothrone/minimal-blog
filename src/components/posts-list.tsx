import prisma from "@/lib/db";
import Link from "next/link";
import { format } from "date-fns";
import { CalendarDaysIcon, PencilSquareIcon } from '@heroicons/react/24/solid';
import { requireAuthentication } from "@/actions/actions";

export default async function PostsList({ limit }: { limit?: number } = {}) {
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: 'desc'
    },
    take: limit
  });

  const isAuthenticated = await requireAuthentication();

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id} className="mb-5 flex flex-col justify-center">
          <div className="flex justify-center gap-2">
            <Link href={`/posts/${post.id}`}>{post.title}</Link>
            {isAuthenticated && (
              <Link href={`/posts/${post.id}/edit`}>
                <PencilSquareIcon className="w-5 h-5 text-blue-500" />
              </Link>
            )}
          </div>
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
