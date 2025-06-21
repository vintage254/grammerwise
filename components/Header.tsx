 import Link from "next/link";
import Image from "next/image";
import { signOutAction } from "@/lib/actions/auth";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="flex justify-between items-center gap-5 border-b border-gray-200/20 pb-4">
      <Link href="/">
        <Image src="/icons/logo.png" alt="logo" width={130} height={30} />
      </Link>

      <ul className="flex flex-row items-center gap-8">
        <li>
          <form action={signOutAction}>
            <Button type="submit" size="sm">Logout</Button>
          </form>
        </li>
      </ul>
    </header>
  );
};

export default Header;
