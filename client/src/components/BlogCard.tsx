import Avatar from "./Avatar";
import { Link } from "react-router-dom";

type User = {
  id: number;
  username?: string | null;
  email: string;
};

type Blog = {
  id: number;
  title: string;
  content: string;
  published: boolean;
  authorId: number;
  author: User;
};

interface BlogCardProps {
  blog: Blog;
}

function BlogCard({ blog }: BlogCardProps) {
  const authorName = blog.author.username || blog.author.email;

  return (
    <div className="w-full border-b border-slate-200 py-6">
      {/* Top Row */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Avatar name={authorName} />
          <p className="text-sm font-medium text-slate-800">{authorName}</p>
        </div>

        <div className="flex items-center gap-3 text-sm text-slate-500">
          {/* {blog.published && (
            <span className="flex items-center gap-1">
              ⭐ <span>Member-only</span>
            </span>
          )} */}

          <button className="text-xl text-slate-500 hover:text-slate-800">
            ⋯
          </button>
        </div>
      </div>

      {/* Content Row */}
      <div className="mt-4 flex justify-between gap-6">
        {/* Left Side */}
        <div className="flex-1">
          <Link to={`/blog/${blog.id}`}>
            <h2 className="text-3xl font-extrabold text-slate-900 leading-snug hover:underline">
              {blog.title}
            </h2>
          </Link>

          <p className="mt-2 text-lg text-slate-600 line-clamp-2">
            {blog.content}
          </p>

          {/* Bottom Row */}
          <div className="mt-4 flex items-center gap-6 text-sm text-slate-500">
            <span>Jan 19</span>
            <span className="flex items-center gap-1">👁 2.6K</span>
            <span className="flex items-center gap-1">💬 69</span>
          </div>
        </div>

        {/* Right Side Image Placeholder */}
        {/* <div className="hidden sm:flex w-44 h-28 rounded-md bg-slate-100 items-center justify-center text-slate-400 text-sm">
          Image
        </div> */}
      </div>
    </div>
  );
}

export default BlogCard;
