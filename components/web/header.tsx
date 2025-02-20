import { ThemeToggle } from "@/components/web/theme-toggle";
import { UserDropdown } from "./user-dropdown";
import Image from "next/image";

const Header = () => {
  return (
    <nav className="flex h-14 items-center justify-between border-b px-4 shadow-md mb-2">
      <div className="flex items-center justify-center gap-4">
        <Image
          src="https://app.ashbyhq.com/api/images/org-theme-wordmark/bbad12b6-46e0-4e6d-b1d8-b9983baae093/b61ec195-e1bc-4459-9533-96cdbbc0562e/3273cf1a-b511-4fb0-8383-1845a3a47c70.png"
          alt="Logo"
          width={150}
          height={50}
          className="h-auto dark:invert dark:brightness-0 dark:contrast-200"
        />
        <h1 className="hidden md:block text-md font-medium">Equation Editor</h1>
      </div>
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <UserDropdown />
      </div>
    </nav>
  );
};

export default Header;
