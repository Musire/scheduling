import RoleRenderer from "@/components/RoleRenderer";
import AdminMessages from "@/domains/communication/components/AdminMessages";

export default function MessagesPage () {
    return (
        <RoleRenderer 
            roles={{
                MANAGER: <AdminMessages/>
            }}
        />
    );
}