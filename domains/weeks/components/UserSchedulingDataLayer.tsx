import { getAreaSimple } from "@/domains/areas/area.actions";
import { getSchedule } from "@/domains/weeks/week.queries";
import UserSchedule from "./UserSchedule";

type Props = {
  weekString: string
}

export default async function UserSchedulingDataLayer ({ weekString }: Props) {
    const { data: schedule } = await getSchedule(new Date(weekString).toISOString());
    const { data: areas } = await getAreaSimple()

    return (
        <UserSchedule schedule={schedule} areas={areas ?? []} />
    );
}