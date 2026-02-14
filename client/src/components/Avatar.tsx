type AvatarProps = {
  name: string;
};

function Avatar({ name }: AvatarProps) {
  const initials = name
    .trim()
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");

  return (
    <div className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center text-sm font-semibold">
      {initials}
    </div>
  );
}

export default Avatar;
