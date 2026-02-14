import { useEffect, useState } from "react";
import BlogList from "../components/BlogList";
import axios from "axios";
import { BACKEND_URL } from "../config";
import BlogSkeleton from "../components/LoadingBlogSkeleton";
import Navbar from "./Navbar";

function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/v1/users/blog/bulk`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("Token"),
          },
        });

        setBlogs(res.data.blog);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-6">
        <BlogSkeleton />
        <BlogSkeleton />
        <BlogSkeleton />
        <BlogSkeleton />
      </div>
    );
  }
  return (
    <>
      <Navbar/>
      <div className="max-w-5xl mx-auto px-6">
        {/* BlogList here */}
        <BlogList blogs={blogs} />;
      </div>
    </>
  );
}

export default Blogs;
