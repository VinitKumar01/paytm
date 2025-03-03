interface Props {
    message: string,
    navigateTo: string,
    path: string
}

export default function BottomWarning({
    message,
    navigateTo,
    path
}: Props) {
    return (
        <div className="flex justify-center text-sm p-1.5">
            <p>{message}</p> <a href={path} className="underline">{navigateTo}</a>
        </div>
    )
}