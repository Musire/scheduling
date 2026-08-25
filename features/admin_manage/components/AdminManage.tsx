import { H3 } from "@/components/typography";
import Link from "next/link";

export default async function AdminManage () {

    return (
        <section className="py-6  w-full flex-1 items-center flex-col flex space-y-6">
            <H3>What area do you wish to manage?</H3>
            <ul className="w-full grid grid-cols-2 gap-4">
                <li className="">
                    <Link href={`/manage/areas`} className="normal-space min-w-32  flex flex-col space-y-2 bg-lighten-1/background min-h-28">
                        <span className="capitalize">areas</span>
                        <span className="text-sm text-else">Sections of the restaurant</span>
                    </Link>
                </li>
                <li className="">
                    <Link href={`/manage/requirements`} className="normal-space min-w-32  flex flex-col space-y-2 bg-lighten-1/background min-h-28">
                        <span className="capitalize">requirements</span>
                        <span className="text-sm text-else text-balance">Staffing needs per area</span>
                    </Link>
                </li>
                <li className="">
                    <Link href={`/manage/users`} className="normal-space min-w-32  flex flex-col space-y-2 bg-lighten-1/background min-h-28">
                        <span className="capitalize">users</span>
                        <span className="text-sm text-else text-balance">The employees of the restaurant</span>
                    </Link>
                </li>
            </ul>
        </section>
    );
}