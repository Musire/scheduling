import { Navbar } from "@/components/navbar";
import { AuthProvider } from "@/context";
import { CalendarProvider } from "@/context/CalanderProvider";
import { ToastProvider } from "@/context/ToastContext";
import { getCurrentUser } from "@/domains/identity/auth/session";
import { redirect } from "next/navigation";

type Props = {
    children: React.ReactNode
}

export default async function DashboardLayout ({ children }: Props) {

    const user = await getCurrentUser()

    if (!user || !user.role ) {
        redirect('/login')
    }

    return (
        <ToastProvider>
            <CalendarProvider>
                <AuthProvider fetchedRole={user.role}>
                    <div className="bg-background text-main w-dvw h-dvh flex-col flex overflow-auto px-6 lg:px-60 relative">
                        {/* <Header avatarUrl={user.avatarUrl} /> */}
                        <Navbar role={user.role} />
                        <div className="flex flex-1 overflow-x-hidden scrollbar-none pb-20 " >
                            {children}
                        </div>
                    </div>
                </AuthProvider>
            </CalendarProvider>
        </ToastProvider>
    );
}