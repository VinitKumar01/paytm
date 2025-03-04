import { useNavigate } from "react-router-dom";
import Button from "./Button";

interface Props {
    firstName: string,
    lastName: string,
    username: string,
}

export default function SearchResults({
    firstName,
    lastName,
    username
}: Props) {
    const navigate = useNavigate();
    function onClick() {
        navigate("/send", {
            state: {
                username,
                firstName,
                lastName
            }
        })
    }
    return (
        <div className="flex justify-between items-center">
            <div className="flex justify-center items-center">
                <div className="rounded-full w-8 h-8 bg-slate-300 items-center flex justify-center mr-2">
                    {firstName[0]}
                </div>
                <div>
                    {firstName} {lastName}
                </div>
            </div>
            <Button onClick={onClick} value="Send Money" type="submit" disabled={false} />
        </div>
    )
}