import { useState } from "react";
import Avatar from "../components/Avatar";
import type { blogTypes } from "../schemas";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import EditorTools from "../components/EditorTools";

function Publish() {
  const [postInputs, setPostInputs] = useState<blogTypes>({
    title: "",
    content: "",
  });

  const navigate = useNavigate();

  async function sendRequest() {
    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/v1/users/blog`,
        postInputs,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("Token"),
          },
        },
      );

      const blogId = res.data.blog.id;
      navigate(`/blog/${blogId}`);
    } catch (error) {
      console.log(error);
      alert("Error while publishing blog");
    }
  }

  const user = {
    username: "Sahil",
    email: "sahil@gmail.com",
  };

  const authorName = user.username || user.email;

  return (
    <div className="min-h-screen bg-white">
      {/* Top Navbar */}
      <div className="w-full border-b border-slate-200 px-6 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          {/* Left */}
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-serif font-bold text-black cursor-pointer">
              Medium
            </h1>
            <span className="text-sm text-slate-500">Draft</span>
          </div>

          {/* Right */}
          <div className="flex items-center gap-5">
            <button
              onClick={sendRequest}
              className="bg-green-600 text-white px-4 py-1 rounded-full text-sm font-medium hover:bg-green-700"
            >
              Publish
            </button>

            <button className="text-2xl text-slate-600 hover:text-black">
              ⋯
            </button>

            <button className="text-xl text-slate-600 hover:text-black">
              🔔
            </button>

            <Avatar name={authorName} />
          </div>
        </div>
      </div>

      {/* Editor Section */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="flex gap-6">
          {/* Plus Tools */}
          <div className="pt-4">
            <EditorTools />
          </div>

          {/* Inputs */}
          <div className="flex-1">
            <input
              value={postInputs.title}
              onChange={(e) => {
                setPostInputs((c) => ({
                  ...c,
                  title: e.target.value,
                }));
              }}
              placeholder="Title"
              className="w-full text-6xl font-serif font-bold text-slate-800 placeholder:text-slate-300 outline-none"
            />

            <textarea
              value={postInputs.content}
              onChange={(e) => {
                setPostInputs((c) => ({
                  ...c,
                  content: e.target.value,
                }));
              }}
              placeholder="Tell your story..."
              className="mt-6 w-full min-h-100 text-xl text-slate-700 placeholder:text-slate-400 outline-none resize-none leading-relaxed"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Publish;
