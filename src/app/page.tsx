import Image from "next/image";
import { PostCard, Categories, PostWidget, Posts} from "@/constant";
import { Post } from "@/types/Types";
// import Posts from "@/components/Posts";


// {posts}:{posts: Post[]}


export default function Home() {
  return (
   <main className="container mx-auto px-4">
    <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
    <div className="lg:col-span-8 col-span-1">
  
    <Posts/>
    </div>
    <div className="lg:col-span-4 col-span-1">
      <div className="relative lg:sticky top-8">
        <PostWidget/>
        <Categories/>
      </div>
    </div>
    </div>
   </main>
  );
}


// export async function getStaticProps(): Promise<{ props: { posts: Post[] } }>  {
//   const posts = await getPosts(); // Assuming getPosts() returns an array of posts
//   return {
//     props: {
//       posts
//     }
//   };
// }

