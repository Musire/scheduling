import { getAreas } from "../area.queries";
import AreaManagement from "./AreaManagement";

export default async function AreaDataLayer () {
    const { data: items } = await getAreas()

    if (!items) {
        return (
            <section className="centered flex-1 text-muted-foreground p-6">
                <p>No area data found for this week.</p>
            </section>
        );
    }

    return (
        <AreaManagement items={items} />
    );
}