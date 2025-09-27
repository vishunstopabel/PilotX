import { FcGoogle } from "react-icons/fc";

interface LogoProps {
  width?: number;
  height?: number;
  size?: number;
  className?: string;
  showText?: boolean;
}

function Logo({
  width = 1,
  height = 1,
  size = 30,
  className = "",
  showText = true,
}: LogoProps) {
  return (
    <div
      className={`flex items-center text-neutral-900 dark:text-neutral-100 ${className}`}
      style={{ minWidth: `${width}rem`, minHeight: `${height}rem` }}
    >
      {/* Google "G" Logo */}
      <FcGoogle
        size={size} // dynamically use the size prop
        className="flex-shrink-0"
        aria-label="GoPilot Logo"
      />

      {showText && (
        <p className="ml-2 text-lg font-semibold mt-1 select-none">
          GoPilot
        </p>
      )}
    </div>
  );
}

export default Logo;
