"use client";

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createPost } from "@/actions/actions";

export default function Form() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSuccess(false);

    try {
      const formData = new FormData(event.currentTarget);
      await createPost(formData);
      setSuccess(true);
      formRef.current?.reset();
      setTimeout(() => {
        router.push('/posts');
      }, 2000);
    } catch (err) {
      setError('Failed to create post. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="flex flex-col max-w-[400px] mx-auto gap-2 my-10"
    >
      <input
        type="text"
        name="title"
        placeholder="Title for new post"
        className="border rounded px-3 h-10"
        required
      />
      <textarea
        name="body"
        placeholder="Body content for new post"
        className="border rounded px-3 py-2"
        rows={6}
        required
      />
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">Post created successfully! Redirecting...</p>}
      <button
        type="submit"
        className="h-10 bg-blue-500 px-5 rounded text-white disabled:bg-blue-300"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
}
