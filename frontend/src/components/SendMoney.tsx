import Button from "./Button";
import Heading from "./Heading";
import Input from "./Input";

interface Props {
    firstName: string,
    lastName: string
}

export default function SendMoney({
    firstName,
    lastName
}: Props) {
    return (
        <div className="shadow-neutral-300 shadow bg-white rounded-md flex flex-col justify-center items-center min-w-md">
            <Heading label="Send Money" customStyles="p-16 pt-8"/>
            <div className="justify-start min-w-[370px] my-8">
                <div className="flex justify-start items-center font-bold text-2xl">
                    <div className="rounded-full w-12 h-12 bg-green-400 text-white items-center flex justify-center mr-4">
                        {firstName[0]}
                    </div>
                    <div>
                        {firstName} {lastName}
                    </div>
                </div>
                <div className="">
                    <Input label="Amount (in Rs)" placeholder="Enter amount" type="text"/>
                    <Button value="Initiate Transfer" type="submit" disabled={false} customStyles="bg-green-400"/>
                </div>
            </div>
            
        </div>
    )
}