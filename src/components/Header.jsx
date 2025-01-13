import { Play } from "lucide-react";

const Header = () => {
  const defaultButtonStyle = "rounded-md px-5 py-1.5 text-sm text-white"

  return (
    <header className="border-b-2 border-zinc-200 bg-white">
      <div className="container mx-auto px-2 py-6">
        <nav className="flex justify-between items-center">
          <img src="/openagi.svg" alt="Ai Planet" />
          <div className="flex items-center gap-2">
            <button className={`${defaultButtonStyle} bg-zinc-400 hover:bg-zinc-500/80`}>Deploy</button>
            <button className={`${defaultButtonStyle} bg-green-700 hover:bg-green-800 flex items-center gap-1`}>
              <Play size={14} /> Run
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;