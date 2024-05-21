import {
    NavigationMenu,
    NavigationMenuItem,
    navigationMenuTriggerStyle
  } from "@/components/ui/navigation-menu";
  import { NavigationMenuList } from "@radix-ui/react-navigation-menu";
  import { Link } from "react-router-dom";
  import { ModeToggle } from "@/components/mode-toggle";
  
  const Navbar = () => {
    return (
      <NavigationMenu className="min-w-full  flex justify-between">
        <NavigationMenuList className="w-1/3"></NavigationMenuList>
        <NavigationMenuList className="w-1/3"></NavigationMenuList>
         {/* Set the width to full using Shadcn UI */}
        <NavigationMenuList className="py-2 flex">
            <NavigationMenuItem className="flex justify-center items-center mr-4 dm-sans-200">
                Don't have an account , signup now ?
            </NavigationMenuItem>
          <NavigationMenuItem className="mr-12">
          <Link
      to="/login"
      className={`${navigationMenuTriggerStyle()} p-4 min-w-24 rounded-full bg-custom-reddanger`}
    >
      Login
    </Link>
          </NavigationMenuItem>
          <NavigationMenuItem className="mr-12">
            <ModeToggle />
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    );
  };
  
  export default Navbar;