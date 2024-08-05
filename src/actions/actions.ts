"use server";

import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";


/**
 * A function to require authentication for the user.
 *
 * @return {Promise<boolean>} A promise that resolves to true if authenticated, false otherwise.
 */
export async function requireAuthentication(): Promise<boolean> {
  try {
    const { isAuthenticated } = getKindeServerSession();
    if (!(await isAuthenticated())) {
      redirect("/api/auth/login");
    }
    return true;
  } catch (error) {
    console.error("Error during authentication:", error);
    return false;
  }
}

/**
 * Creates a new post in the database with the given form data.
 *
 * @param {FormData} formData - The form data containing the title and body of the post.
 * @return {Promise<void>} A promise that resolves when the post is successfully created.
 * @throws {Error} If the user is not authenticated, it redirects to the login page.
 */
export async function createPost(formData: FormData): Promise<void> {
  await requireAuthentication();

  const title = formData.get("title") as string;
  const body = formData.get("body") as string;

  // update database
  await prisma.post.create({
    data: {
      title,
      body,
    },
  });

  // revalidate
  revalidatePath("/posts");
}


/**
 * Deletes a post from the database.
 *
 * @param {number} postId - The ID of the post to be deleted.
 * @return {Promise<void>} A promise that resolves when the post is successfully deleted.
 * @throws {Error} If the user is not authenticated, it redirects to the login page.
 * @throws {Error} If there is an error deleting the post, it throws an error.
 */
export async function deletePost(postId: number): Promise<void> {
  await requireAuthentication();

  // update database
  try {
    await prisma.post.delete({
      where: {
        id: postId,
      },
    });

    console.log('Post deleted successfully');
  } catch (error) {
    console.error('Error deleting post:', error);
    throw new Error('Failed to delete post');
  } finally {
    await prisma.$disconnect();
  }
}

interface Post {
  id: number;
  title: string;
  body: string;
  createdAt: Date;
}

/**
 * Retrieves a post by its ID.
 *
 * @param {string} id - The ID of the post to retrieve.
 * @return {Promise<Post>} A Promise that resolves to the retrieved post.
 * @throws {Error} If the post with the specified ID is not found.
 */
export async function getPostById(id: string): Promise<Post> {
  try {
    const post = await prisma.post.findUnique({
      where: { id: parseInt(id, 10) },
    });

    if (!post) {
      throw new Error(`Failed to fetch post with ID ${id}`);
    }

    return post;
  } catch (error) {
    console.error('Error fetching post:', error);
    throw error;
  }
}
