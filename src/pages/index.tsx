import Image from "next/image";
import { Inter } from "next/font/google";
import { getPosts } from "@/lib/api/posts";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { extractDescriptionAndContent } from "@/lib/post";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const getServerSideProps: GetServerSideProps<{
  posts: any;
}> = async () => {
  const posts = await getPosts();
  return { props: { posts } };
};

export default function Home({
  posts,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  if (!posts || posts.length === 0) {
    return <div>No posts</div>;
  }

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <h1 className="text-lg mb-8">Blog Posts</h1>
      <div className="flex gap-4 flex-col">
        {/* // TODO: */}
        {posts.map((post: any) => {
          const { descriptionString } = extractDescriptionAndContent(
            post.bodyHTML
          );

          return (
            <Link href={`/blog/${post.number}`} key={post.number}>
              <article className="border-2 border-red-500">
                <h2 className="text-md mb-2">{post.title}</h2>
                <p>{descriptionString}</p>
              </article>
            </Link>
          );
        })}
      </div>
      {/* <article className="post">
        <h1 className="text-5xl font-bold mb-4">{post.title}</h1>
        <p>{descriptionString}</p>
        <div className="h-4 bg-red-500 w-full"></div>
        <div
          dangerouslySetInnerHTML={{
            __html: contentHTML,
          }}
        ></div>
      </article> */}
    </main>
  );
}
