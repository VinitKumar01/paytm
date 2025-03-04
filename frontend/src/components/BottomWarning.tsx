import { Link } from "react-router-dom"

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
            <div>{message}</div>
            <Link to={path} className="pointer underline pl-1 cursor-pointer">{navigateTo}</Link>
        </div>
    )
}