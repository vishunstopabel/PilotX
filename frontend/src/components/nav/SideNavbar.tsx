import { cn } from "@/lib/utils";
import { useEffect, useState, type ElementType } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import { useAppSelector } from "@/store/hooks";

interface CollapsedProps {
  collapsed: boolean;
}
interface NavItemData {
  name: string;
  icon: ElementType;
  href: string;
}

const SideCollapse = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-5"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" />
      <path d="M9 4v16" />
      <path d="M15 10l-2 2l2 2" />
    </svg>
  );
};

const SideExpand = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-5"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" />
      <path d="M9 4v16" />
      <path d="M14 10l2 2l-2 2" />
    </svg>
  );
};

const AddIcon = () => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M12 7m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
        <path d="M17 16m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
        <path d="M7 16m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
      </svg>
    </>
  );
};

const UserButtonPlaceholder: React.FC<CollapsedProps> = ({ collapsed }) => {
  const user = useAppSelector((state) => state.auth.authData);

  return (
    <div
      className={cn(
        "flex items-center p-3 border-t transition-all duration-300 ease-in-out hover:bg-accent/50 cursor-pointer group",
        collapsed ? "justify-center" : "justify-start"
      )}
    >
      <div className="flex items-center gap-3 w-full overflow-hidden">
        <div
          className={cn(
            "flex-shrink-0 size-10 rounded-full bg-muted overflow-hidden ring-2 ring-transparent transition-all duration-300 group-hover:ring-orange-500/20",
            collapsed && "mx-auto"
          )}
        >
          <img
            src={user?.avatarUrl}
            alt={user?.name}
            className="size-10 rounded-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        </div>

        <div
          className={cn(
            "flex flex-col min-w-0 transition-all duration-300 ease-in-out",
            collapsed
              ? "w-0 opacity-0 translate-x-4"
              : "w-full opacity-100 translate-x-0"
          )}
        >
          <p className="text-sm font-medium text-foreground truncate transition-colors duration-200">
            {user?.name}
          </p>
          <p className="text-xs text-muted-foreground truncate transition-colors duration-200">
            {user?.email.toString()}
          </p>
        </div>
      </div>
    </div>
  );
};

const navItems: NavItemData[] = [
  {
    name: "New Task",
    icon: AddIcon,
    href: "/new",
  },
  {
    name: "Chats",
    icon: () => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M8 9h8" />
        <path d="M8 13h6" />
        <path d="M18 4a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-5l-5 3v-3h-2a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12z" />
      </svg>
    ),
    href: "/chats",
  },
  {
    name: "Connect",
    icon: () => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M10 14a3.5 3.5 0 0 0 5 0l4 -4a3.5 3.5 0 0 0 -5 -5l-.5 .5" />
        <path d="M14 10a3.5 3.5 0 0 0 -5 0l-4 4a3.5 3.5 0 0 0 5 5l.5 -.5" />
      </svg>
    ),
    href: "/connect",
  },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeItem, setActiveItem] = useState<string>(location.pathname);
  const [collapsed, setCollapsed] = useState<boolean>(false);

  useEffect(() => {
    setActiveItem(location.pathname);
  }, [location.pathname]);

  const handleNavigate = (href: string) => {
    navigate(href);
    setActiveItem(href);
  };

  return (
    <aside
      className={cn(
        "flex flex-col border-r bg-background text-foreground transition-all duration-300 ease-in-out h-screen shadow-sm",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2">
        <div
          className={cn(
            "transition-all duration-300 overflow-hidden",
            collapsed ? "w-0 opacity-0" : "w-auto opacity-100"
          )}
        >
          <Logo size={18} showText={true} variant="compact" />
        </div>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            "p-2 rounded-lg transition-all duration-200 hover:bg-accent/80 active:scale-95 cursor-pointer",
            collapsed && "mx-auto"
          )}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <SideExpand /> : <SideCollapse />}
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-2 scrollbar-thin">
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.href;

            return (
              <button
                key={item.href}
                onClick={() => handleNavigate(item.href)}
                className={cn(
                  "flex items-center w-full rounded-lg transition-all duration-200 group active:scale-95",
                  collapsed ? "justify-center p-3" : "justify-start p-3 gap-3",
                  isActive
                    ? "bg-orange-500/80 text-white shadow-lg"
                    : "hover:bg-gray-300/60 text-foreground"
                )}
                aria-label={item.name}
              >
                <div className="flex-shrink-0 size-5">
                  <Icon />
                </div>

                <span
                  className={cn(
                    "text-sm font-medium transition-all duration-300 ease-in-out whitespace-nowrap",
                    collapsed
                      ? "w-0 opacity-0 translate-x-4"
                      : "w-auto opacity-100 translate-x-0"
                  )}
                >
                  {item.name}
                </span>
              </button>
            );
          })}
        </nav>
      </div>

      <div>
        <UserButtonPlaceholder collapsed={collapsed} />
      </div>
    </aside>
  );
}
