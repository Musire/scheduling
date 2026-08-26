'use client';

import Link from "next/link";
import { useState } from "react";

type Area = {
  id: string
  name: string
  description: string
}

const areas: Area[] = [
  {
    id: "dining",
    name: "Dining Room",
    description: "Servers and guest service",
  },
  {
    id: "bar",
    name: "Bar",
    description: "Bartenders and barbacks",
  },
  {
    id: "kitchen",
    name: "Kitchen",
    description: "Cooks and kitchen staff",
  },
]

export default function AreaManagement () {
    const shared = 'normal-space grow capitalize border-b border-whitesmoke/30 text-center'
    const inActive = ' text-else hover:text-main'
    const active = ' border-whitesmoke/87'


    return (
        <section className="py-6 flex-1">
            <ul className=" max-w-full flex ">
                <li className="flex flex-1">
                    <Link 
                        href={`/manage/areas`} 
                        className={`${shared} ${active} `}
                    >
                        areas
                    </Link>
                </li>
                <li className="flex flex-1">
                    <Link 
                        href={`/manage/requirements`} 
                        className={`${shared} ${inActive}`}
                    >
                        requirements
                    </Link>
                </li>
                <li className="flex flex-1">
                    <Link 
                        href={`/manage/users`} 
                        className={`${shared} ${inActive}`}
                    >
                        users
                    </Link>
                </li>
            </ul>
            
        </section>
    );
}