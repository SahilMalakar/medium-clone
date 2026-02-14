import BlogCard from "./BlogCard";

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

interface BlogListProps {
  blogs: Blog[];
}

function BlogList({ blogs }: BlogListProps) {
  return (
    <div className="max-w-5xl mx-auto px-6">
      {blogs.map((blog) => (
        <BlogCard key={blog.id} blog={blog} />
      ))}
    </div>
  );
}

export default BlogList;
