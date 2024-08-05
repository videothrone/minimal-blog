"use client";

import { useParams } from 'next/navigation';

export default function EditPostPage() {
  const params = useParams() as { id: string };
  const id = params.id;

  return (
    <div>
      <h1>Edit Post {id}</h1>
    </div>
  );
}
