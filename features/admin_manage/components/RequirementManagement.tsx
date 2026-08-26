import ManageTabs from "./ManageTabs";

export default async function RequirementMangement () {

    return (
        <section className="py-6 flex-1">
            <ManageTabs activeValue="requirements" />
        </section>
    );
}