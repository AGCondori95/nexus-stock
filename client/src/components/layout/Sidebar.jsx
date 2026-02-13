import {LayoutDashboard, Package, ShoppingCart} from "lucide-react";
import {NavLink} from "react-router-dom";
import {cn} from "../../lib/utils";

const navItems = [
  {
    to: "/dashboard",
    icon: LayoutDashboard,
    label: "Dashboard",
  },
  {
    to: "/products",
    icon: Package,
    label: "Products",
  },
  {
    to: "/orders",
    icon: ShoppingCart,
    label: "Orders",
  },
];

export const Sidebar = () => {
  return (
    <aside className='w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-4rem)]'>
      <nav className='p-4 space-y-2'>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({isActive}) =>
                cn(
                  "flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-gray-700 hover:bg-gray-100",
                )
              }>
              <Icon className='h-5 w-5' />
              <span className='font-medium'>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};
