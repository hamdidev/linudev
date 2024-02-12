import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CallToAction from "../components/CallToAction";
import PostCard from "../components/PostCard";
const Home = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    try {
      const fetchPosts = async () => {
        const res = await fetch(`/api/post/getposts?limit=9`);
        const data = await res.json();
        if (res.ok) {
          setPosts(data.posts);
        }
      };

      fetchPosts();
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <div className="min-h-screen">
      <div className="flex flex-col gap-6 px-3 p-28 max-w-6xl mx-auto">
        <h1 className="text-3xl lg:text-6xl font-bold">Welcome to my Blog</h1>
        <p className="text-sm sm:text-sm text-gray-500">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda,
          hic possimus! Officiis nesciunt nihil vero qui ipsum nostrum ducimus
          saepe magni assumenda eaque? Provident beatae soluta fugit corporis
          nobis sequi voluptates quam sit modi. At ipsam nulla animi sed
          maiores. A, rerum distinctio voluptate hic dolorum nostrum id vel
          exercitationem!
        </p>
      </div>

      <div className="flex flex-col max-w-6xl mx-auto gap-8 py-7 ">
        {posts && posts.length > 0 && (
          <div className="flex flex-col gap-6 p-3">
            <h2 className="text-center text-2xl font-semibold">Recent Posts</h2>
            <div className="flex flex-wrap gap-4">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          </div>
        )}
        <Link
          to="/search"
          className="text-lg  text-teal-500 hover:underline text-center"
        >
          View all posts
        </Link>
      </div>
      <div className="p-3 bg-amber-100 dark:bg-slate-500">
        <CallToAction />
      </div>
    </div>
  );
};

export default Home;
