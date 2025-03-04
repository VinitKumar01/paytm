import { useForm } from "react-hook-form";
import Button from "./Button";
import Heading from "./Heading";
import Input from "./Input";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

interface Props {
    firstName: string,
    lastName: string,
    username: string
}

interface FormData{
    amount: string
}

export default function SendMoney({
    firstName,
    lastName,
    username
}: Props) {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<FormData>({ mode: "onBlur" });

    const navigate = useNavigate();

    async function onSubmit(data: {amount: string}) {
        await axios.post(`${BACKEND_URL}/api/v1/account/transfer`, {
            to: username,
            amount: data.amount
        }, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        });
        navigate("/dashboard");
    }
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
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Input label="Amount (in Rs)" placeholder="Enter amount" type="text" {...register("amount", {
                            required: "Amount is required",
                        })}/>
                        {errors.amount?.message && (
                        <p className="text-red-500">{errors.amount.message}</p>
                        )}
                        <Button value="Initiate Transfer" type="submit" disabled={isSubmitting} customStyles="bg-green-400"/>
                    </form>
                </div>
            </div>
            
        </div>
    )
}