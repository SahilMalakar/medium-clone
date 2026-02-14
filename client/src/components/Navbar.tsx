import { useNavigate } from "react-router-dom";
import Avatar from "./Avatar";
import Input from "./Inputs";

type NavbarProps = {
  user: {
    username?: string | null;
    email: string;
  };
};

function Navbar({ user }: NavbarProps) {
  const navigate = useNavigate();

  const authorName = user.username || user.email;

  return (
    <div className="w-full border-b border-slate-200 bg-white px-6 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-6">
        {/* Left Side */}
        <div className="flex items-center gap-6 flex-1">
          <h1
            className="text-3xl font-serif font-bold text-black cursor-pointer"
            onClick={() => navigate("/blogs")}
          >
            Medium
          </h1>

          {/* Search Input */}
          <div className="w-full max-w-md">
            <Input label="" placeholder="Search..." />
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-6 text-slate-600">
          <button
            onClick={() => navigate("/publish")}
            className="flex items-center gap-2 hover:text-black"
          >
            <span className="text-lg">✏️</span>
            <span className="text-sm font-medium">Write</span>
          </button>

          <button className="text-xl hover:text-black">🔔</button>

          <Avatar name={authorName} />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
