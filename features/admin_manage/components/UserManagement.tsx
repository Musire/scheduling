import ManageTabs from "./ManageTabs";

export default async function UserMangement () {

    return (
        <section className="py-6 flex-1">
            <ManageTabs activeValue="users" />
        </section>
    );
}