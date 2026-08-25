'use client';

import { logout } from "@/domains/identity/actions/auth.actions";

export default function LogoutButton () {
  return (
    <button 
        onClick={logout} 
        className="hover:bg-whitesmoke/37 w-24 normal-space hover:cursor-pointer"
    >
        logout
    </button>
  );
}