import { getCurrentRequirements } from "../requirements.queries";
import RequirementMangement from "./RequirementManagement";

type Props = {
  week: string
}

export default async function RequirementDataLayer ({ week }: Props) {

    const { data: requirements } = await getCurrentRequirements(week);

    if (!requirements) {
        return (
            <section className="centered flex-1 text-muted-foreground p-6">
                <p>No requirements data found for this week.</p>
            </section>
        );
    }

    return (
        <RequirementMangement requirements={requirements} />
    );
}