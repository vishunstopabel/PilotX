import { useState } from "react";
import {
  FiSun,
  FiHome,
  FiBarChart2,
  FiFileText,
  FiSend,
  FiUsers,
  FiSettings,
  FiGitPullRequest,
  FiDisc,
  FiArrowLeft,
  FiChevronLeft,
  FiGrid,
  FiLayout,
  FiPieChart,
  FiCheckSquare,
  FiZap,
  FiTerminal,
  FiTag,
  FiWifi,
  FiCloud,
} from "react-icons/fi";

// ---- Types ----
type NavLink = {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
};

type NavSection = {
  title?: string;
  links: NavLink[];
};

// ---- Data for the expanded panel ----
const panelSections: NavSection[] = [
  {
    title: "WEBSITE 2.0",
    links: [
      { id: "overview", label: "Overview", icon: FiGrid },
      { id: "dashboards", label: "Dashboards", icon: FiLayout, badge: 2 },
      { id: "all-charts", label: "All charts", icon: FiPieChart, badge: 4 },
      { id: "my-tasks", label: "My tasks", icon: FiCheckSquare, badge: 12 },
      { id: "insights", label: "Insights", icon: FiZap },
    ],
  },
  {
    title: "Data Management",
    links: [
      { id: "event-log", label: "Event log", icon: FiTerminal },
      { id: "labels-analytics", label: "Labels & analytics", icon: FiTag },
      { id: "live-data-feed", label: "Live data feed", icon: FiWifi },
    ],
  },
];

// ---- Data for the primary icon bar ----
const primaryNavIcons = [
  { id: "home", icon: FiHome },
  { id: "barchart", icon: FiBarChart2 },
  { id: "file", icon: FiFileText },
  { id: "send", icon: FiSend },
  { id: "users", icon: FiUsers },
  { id: "settings", icon: FiSettings },
  { id: "git", icon: FiGitPullRequest },
];

// ---- Component ----
function DashboardSidebar() {
  const [isPanelOpen, setIsPanelOpen] = useState(true);
  const [activeItem, setActiveItem] = useState("overview");
  const profileImage = "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg";

  return (
    <div className="flex h-screen bg-neutral-950 font-sans">
      {/* Primary Icon Bar */}
      <aside className="flex h-full flex-col items-center justify-between border-r border-neutral-800 p-4">
        {/* Top Icons */}
        <div className="flex flex-col items-center gap-4">
          <button className="rounded-lg bg-orange-400 p-2 text-white">
            <FiSun size={24} />
          </button>
          {primaryNavIcons.map((item) => (
            <button
              key={item.id}
              onClick={() => setIsPanelOpen(true)}
              className="rounded-lg p-2 text-neutral-400 transition-colors hover:bg-neutral-800 hover:text-white"
            >
              <item.icon size={22} />
            </button>
          ))}
        </div>

        {/* Bottom Icons */}
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-red-500" />
            <button className="rounded-lg p-2 text-neutral-400 transition-colors hover:bg-neutral-800 hover:text-white">
              <FiDisc size={22} />
            </button>
          </div>
          <img
            src={profileImage}
            alt="Profile"
            className="size-10 rounded-full border-2 border-neutral-700"
          />
        </div>
      </aside>

      {/* Expanded Content Panel */}
      <div
        className={`h-full bg-neutral-900 text-neutral-200 transition-all duration-300 ease-in-out ${
          isPanelOpen ? "w-72" : "w-0"
        }`}
      >
        <div className="flex h-full flex-col overflow-y-auto p-6">
          {/* Panel Header */}
          <div className="flex min-w-max items-center justify-between pb-8">
            <button className="flex items-center gap-2 text-sm text-neutral-400 transition-colors hover:text-neutral-100">
              <FiArrowLeft />
              <span>All projects</span>
            </button>
            <button
              onClick={() => setIsPanelOpen(false)}
              className="rounded-full p-1 text-neutral-400 transition-colors hover:bg-neutral-800 hover:text-neutral-100"
            >
              <FiChevronLeft size={20} />
            </button>
          </div>

          {/* Navigation Sections */}
          <div className="flex-1">
            {panelSections.map((section) => (
              <div key={section.title || "section"} className="mb-6">
                {section.title === "WEBSITE 2.0" ? (
                  <h2 className="mb-4 min-w-max text-lg font-semibold">
                    {section.title}
                  </h2>
                ) : (
                  <h3 className="mb-2 min-w-max text-xs font-semibold uppercase tracking-wider text-neutral-500">
                    {section.title}
                  </h3>
                )}
                <ul className="flex flex-col gap-1">
                  {section.links.map((link) => (
                    <li key={link.id}>
                      <button
                        onClick={() => setActiveItem(link.id)}
                        className={`flex min-w-max w-full items-center justify-between rounded-md p-2 text-sm font-medium transition-colors ${
                          activeItem === link.id
                            ? "bg-neutral-800 text-white"
                            : "text-neutral-400 hover:bg-neutral-800 hover:text-white"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <link.icon className="size-4" />
                          <span>{link.label}</span>
                        </div>
                        {link.badge && (
                          <span className="rounded-full bg-neutral-700 px-2 py-0.5 text-xs font-bold text-neutral-300">
                            {link.badge}
                          </span>
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Storage Section */}
          <div className="min-w-max border-t border-neutral-800 pt-6">
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FiCloud className="text-neutral-400" />
                <span className="text-sm font-medium">Storage</span>
              </div>
              <button className="rounded-md bg-neutral-800 px-2 py-1 text-xs font-semibold text-neutral-200 transition-colors hover:bg-neutral-700">
                Upgrade
              </button>
            </div>
            <div className="mb-2 h-1.5 w-full rounded-full bg-neutral-700">
              <div
                className="h-1.5 rounded-full bg-white"
                style={{ width: "91%" }}
              />
            </div>
            <p className="text-xs text-neutral-400">18.2 GB of 20 GB used</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardSidebar;