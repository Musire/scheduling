type Props = {
    children: React.ReactNode
}

export default function ScrollableContainer ({ children }: Props) {

    return (
        <ul 
            className="flex overflow-x-auto items-center w-full snap-always snap-x snap-mandatory gap-6 px-2 py-2 scrollbar-none"
        >
            {children}
        </ul>
    );
}