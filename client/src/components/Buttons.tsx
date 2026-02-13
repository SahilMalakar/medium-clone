interface ButtonProps {
  text: string;
  onClick?: () => void;
  type?: "button" | "submit";
}

function Button({ text, onClick, type = "button" }: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="w-full bg-slate-800 text-white py-2 rounded-lg hover:bg-slate-900 transition"
    >
      {text}
    </button>
  );
}

export default Button;
