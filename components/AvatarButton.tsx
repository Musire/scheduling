"use client";

import { Drawer, Theme } from "@/components";
import { logout } from "@/domains/identity/actions/auth.actions";
import { useDrawer } from "@/hooks";
import { LogOut, ShieldPlus, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./buttons";


type Props = {
  avatarUrl: string | null;
}

export default function AvatarButton({ avatarUrl }: Props) {
  const { isMounted, animation, toggleDrawer, closeDrawer } = useDrawer(300);

  return (
    <div className="flex items-center space-x-2">
      {/* The Trigger Button */}
      <button 
        onClick={toggleDrawer}
        type="button"
        aria-label="Toggle Menu"
        className="relative size-10 rounded-full bg-mid overflow-hidden hover:ring-2 ring-main transition-all hover:cursor-pointer"
      >
        {!avatarUrl
          ? <div className="text-deep centered">
              <User />
            </div>
          : <Image
              fill
              src={avatarUrl} 
              alt="User Profile" 
              className="w-full h-full object-cover"
            />
        }
      </button>
      {/* The Drawer Instance */}
      <Drawer
        isMounted={isMounted} 
        animation={animation} 
        withOverlay 
        onClose={closeDrawer} 
      >
        <div className="fixed inset-y-0 right-0 w-80 surface-1 shadow-2xl p-6 stacked  ">
           {/* Drawer content goes here */}
           <Theme />
           <Link 
              href={`profile`} 
              onClick={closeDrawer} 
              className="flex items-center space-x-2"
            >
              <ShieldPlus />
              <span className="">View Profile</span>
           </Link>
           <Button type="button" className="w-24 self-end mt-auto" onClick={logout}>
              <LogOut />  
              <span className="">logout</span>
          </Button>
        </div>
      </Drawer>
    </div>
  );
}
