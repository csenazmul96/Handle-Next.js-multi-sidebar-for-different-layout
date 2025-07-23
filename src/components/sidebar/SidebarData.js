import {LayoutDashboard, ShoppingCart, User} from "lucide-react";

export const menuItems = [
    {
        id: "1",
        label: "Dashboard",
        icon: <LayoutDashboard size={16} />,
        slug:'/'
    },
    {
        id: "11",
        label: "Products",
        icon: <ShoppingCart />,
        slug:'/products',
    },
    {
        id: "22",
        label: "User",
        slug: "/users",
        icon: <User size={16} />,
    },



];
