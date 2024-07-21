import prisma from "@/lib/db";
import { notFound } from "next/navigation";
import { format } from 'date-fns';
import Link from 'next/link';

export default async function Page({ params }: { params: { id: string } }) {
  const post = await prisma.post.findUnique({
    where: {
      id: parseInt(params.id),
    },
    select: {
      id: true,
      title: true,
      body: true,
      createdAt: true,
    },
  });

  if (!post) {
    notFound();
  }

  const formattedDate = format(new Date(post.createdAt), 'MMMM d, yyyy');

  return (
    <main className="px-7 pt-24 text-center">
      <div className="mb-6 text-left">
        <Link href="/posts" className="text-gray-500 hover:text-zinc-900">
          ← Back to Posts
        </Link>
      </div>

      <h1 className="text-5xl font-semibold mb-7">{post.title}</h1>
      <p className="text-sm text-gray-500 mb-4">Created on {formattedDate}</p>
      <p className="max-w-[700px] mx-auto">{post.body}</p>
    </main>
  );
}
