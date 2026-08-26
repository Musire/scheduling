import Link from "next/link";

export default async function UserMangement () {
    const shared = 'normal-space grow capitalize border-b border-whitesmoke/30 text-center'
    const inActive = ' text-else hover:text-main'
    const active = ' border-whitesmoke/87'

    return (
        <section className="py-6 flex-1">
            <ul className=" max-w-full flex ">
                <li className="flex flex-1">
                    <Link 
                        href={`/manage/areas`} 
                        className={`${shared} ${inActive}`}
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
                        className={`${shared} ${active}`}
                    >
                        users
                    </Link>
                </li>
            </ul>
        </section>
    );
}