import { useState } from "react";

function EditorTools() {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative flex items-center z-50"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {/* Plus Button */}
      <button className="w-10 h-10 rounded-full border border-slate-400 flex items-center justify-center text-2xl text-slate-600 hover:bg-slate-100">
        +
      </button>

      {/* Toolbar */}
      {open && (
        <div className="absolute left-14 top-1 flex items-center gap-3 bg-white px-4 py-2 rounded-full border border-slate-200 shadow-lg z-50">
          <button className="w-10 h-10 rounded-full border-2 border-green-600 flex items-center justify-center text-green-600 hover:bg-green-50">
            🖼️
          </button>

          <button className="w-10 h-10 rounded-full border-2 border-green-600 flex items-center justify-center text-green-600 hover:bg-green-50">
            ⬆️
          </button>

          <button className="w-10 h-10 rounded-full border-2 border-green-600 flex items-center justify-center text-green-600 hover:bg-green-50">
            ▶️
          </button>

          <button className="w-10 h-10 rounded-full border-2 border-green-600 flex items-center justify-center text-green-600 hover:bg-green-50">
            {"</>"}
          </button>

          <button className="w-10 h-10 rounded-full border-2 border-green-600 flex items-center justify-center text-green-600 hover:bg-green-50">
            {"{}"}
          </button>

          <button className="w-10 h-10 rounded-full border-2 border-green-600 flex items-center justify-center text-green-600 hover:bg-green-50">
            …
          </button>
        </div>
      )}
    </div>
  );
}

export default EditorTools;
