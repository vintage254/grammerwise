 import Link from "next/link";
import Image from "next/image";
import { signOutAction } from "@/lib/actions/auth";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="my-10 flex justify-between gap-5">
      <Link href="/">
        <Image src="/icons/logo.png" alt="logo" width={40} height={40} />
      </Link>

      <ul className="flex flex-row items-center gap-8">
        <li>
          <form action={signOutAction}>
            <Button type="submit">Logout</Button>
          </form>
        </li>
      </ul>
    </header>
  );
};

export default Header;
