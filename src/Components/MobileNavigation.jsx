import { mobileNavigation } from "../Contants/index"; // Fix typo in path
import { NavLink } from "react-router-dom";

const MobileNavigation = () => {
  return (
    <section className="lg:hidden fixed bottom-0 w-full h-14 z-50 border-t border-n-6 backdrop-blur-2xl bg-n-8 bg-opacity-70">
      <div className="flex justify-around items-center h-full px-4">
        {mobileNavigation.map((item) => {
          const Icon = item.icon; // Reference the icon component
          return (
            <NavLink
              key={item.id}
              to={item.url} // Add to prop for navigation
              className={({ isActive }) =>
                isActive
                  ? "flex flex-col items-center text-n-14 font-bold"
                  : "flex flex-col items-center text-white hover:text-gray-400"
              }
            >
              <Icon className="w-6 h-6 mb-1" />
              <span className="text-sm">{item.title}</span>
            </NavLink>
          );
        })}
      </div>
    </section>
  );
};

export default MobileNavigation;
