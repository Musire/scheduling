import { getAreaSimple } from "@/domains/areas/area.actions";
import { getSchedule } from "@/domains/weeks/week.queries";
import AdminSchedule from "./AdminSchedule";

type Props = {
  weekString: string
}

export default async function AdminSchedulingDataLayer ({ weekString }: Props) {
    const { data: schedule } = await getSchedule(new Date(weekString).toISOString());
    const { data: areas } = await getAreaSimple()

    return (
        <AdminSchedule schedule={schedule} areas={areas ?? []} />
    );
}