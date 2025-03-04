import Button from "./Button";

interface Props {
    firstName: string,
    lastName: string
}

export default function SearchResults({
    firstName,
    lastName
}: Props) {
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
            <Button value="Send Money" type="submit" disabled={false} />
        </div>
    )
}