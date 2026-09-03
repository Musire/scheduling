import { User } from "@/generated/prisma/client";

export type ModifiedUser = Omit<User, "payRate"> & {
  payRate: number ;
};

type Props = {
  user: ModifiedUser;
};

export default function UserDetails ({ user }: Props) {
    return (
        <section className="">
            <pre className="text-xs">{JSON.stringify(user, null, 2)}</pre>
        </section>
    );
}