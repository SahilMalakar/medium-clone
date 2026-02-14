import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavbarComponet from "../components/NavbarComponent";
import Avatar from "../components/Avatar";
import { BACKEND_URL } from "../config";

type Author = {
  id: number;
  email: string;
  username?: string | null;
};

type Blog = {
  id: number;
  title: string;
  content: string;
  published: boolean;
  author: Author;
};

function UserBlogPage() {
  const { id } = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    setBlog(null);

    async function fetchBlog() {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/v1/users/blog/${id}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("Token"),
          },
        });

        setBlog(res.data.blog);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchBlog();
  }, [id]);

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar always visible */}
      <NavbarComponet
        user={{
          username: blog?.author.username || "User",
          email: blog?.author.email || "user@gmail.com",
        }}
      />

      <div className="max-w-3xl mx-auto px-6 py-10">
        {loading ? (
          <p className="text-slate-500">Loading blog...</p>
        ) : !blog ? (
          <p className="text-slate-500">Blog not found</p>
        ) : (
          <>
            {/* Title */}
            <h1 className="text-5xl font-extrabold text-slate-900 leading-tight">
              {blog.title}
            </h1>

            {/* Author */}
            <div className="mt-6 flex items-center gap-3">
              <Avatar name={blog.author.username || blog.author.email} />

              <div>
                <p className="text-sm font-semibold text-slate-800">
                  {blog.author.username || blog.author.email}
                </p>
                <p className="text-sm text-slate-500">
                  Sep 14, 2025 · 19 min read
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="mt-6 border-b border-slate-200"></div>

            {/* Content */}
            <div className="mt-8 text-lg leading-relaxed text-slate-800 whitespace-pre-line">
              {blog.content}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default UserBlogPage;
