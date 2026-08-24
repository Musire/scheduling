import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function unauthorized () {
  return (
    <div className="page-layout">
        <div className="display-layout bg-linear-to-b from-darker from-40% to-deepest">
            <h1 className="w-full text-center text-[32rem] font-semibold h-full text-whitesmoke/25 ">403</h1>
            <article className="centered-col space-y-2">
                <h2 className="text-4xl">{`Can't let you in willy nilly`}</h2>
                <h3 className="text-lg">{`Why don't we take a step back, ok?`}</h3>
                <Link 
                    href="/dashboard" 
                    className="bg-darker hover:bg-whitesmoke/87 hover:text-deep normal-space flex items-center justify-evenly hover:space-y-8 transition-all duration-300 w-40"
                >
                    <ChevronLeft />
                    Dashboard
                </Link>
            </article>
        </div>
    </div>
  );
}