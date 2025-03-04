interface Props {
    name: string,
    greeting: string,
    initial: string
}

export default function AppBar({
    name,
    greeting,
    initial
}: Props) {
    return (
        <div className="top w-screen h-fit flex justify-between items-center p-3 shadow-neutral-300 shadow">
            <div>
                {name}
            </div>
            <div className="flex space-x-5 justify-center items-center">
                <div>
                    {greeting}
                </div>
                <div className="rounded-full w-8 h-8 bg-slate-300 items-center flex justify-center">
                    {initial}
                </div>
            </div>
        </div>
    )
}