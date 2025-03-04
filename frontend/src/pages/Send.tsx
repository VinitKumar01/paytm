import { useLocation } from "react-router-dom";
import SendMoney from "../components/SendMoney";

export default function Send() {
    const location = useLocation();
    const data = location.state || {};

    return (
        <div className="flex justify-center items-center h-screen bg-[#F3F5F7]">
            <SendMoney username={data.username} firstName={data.firstName} lastName={data.lastName}/>
        </div>
    )
}