import { getSortedPostsData } from '@/lib/posts';

export async function GET() {
  const posts = getSortedPostsData();
  return Response.json(posts);
}
