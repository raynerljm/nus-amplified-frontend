import { Inter } from "next/font/google";
import { getPosts } from "@/lib/api/posts";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { extractPostContent } from "@/lib/post";
import Link from "next/link";
import { isoStringToDMY } from "@/lib/dates";
import { Issue } from "@/lib/types/issues";

const inter = Inter({ subsets: ["latin"] });

export const getServerSideProps: GetServerSideProps<{
  posts: Issue[];
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
      className={`flex min-h-screen flex-col bg-gradient-to-b from-black to-[#2C1630] p-24 ${inter.className}`}
    >
      <h1 className="text-4xl text-[#BC41D0] mb-24">Blog.</h1>
      <div className="flex gap-10 flex-col px-12 py-14 bg-[#171717] bg-opacity-70 rounded-3xl">
        {/* // TODO: types */}
        {posts.map((post) => {
          const { title, description, imageSrc } = extractPostContent(post);

          return (
            <Link href={`/blog/${post.number}`} key={post.number}>
              <article className="p-12 grid grid-cols-12 gap-12 rounded-3xl bg-[#010101] bg-opacity-30">
                <div className=" col-span-5 w-full bg-gray-600 grid place-items-center">
                  <img src={imageSrc} />
                </div>
                <div className="col-span-7 w-full">
                  <h2 className="text-3xl text-[#BC41D0] mb-5">{title}</h2>
                  <p className="text-xl mb-5">
                    {isoStringToDMY(post.created_at)}
                  </p>
                  <p className="text-xl">{description}</p>
                </div>
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
