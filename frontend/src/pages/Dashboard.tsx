import axios from "axios";
import AppBar from "../components/AppBar";
import Balance from "../components/Balance";
import Users from "../components/Users";
import { BACKEND_URL } from "../config";
import { useEffect, useState } from "react";

export default function Dashboard() {
    const [balance, setBalance] = useState(0);
    async function getBalance() {
        const response = await axios.get(`${BACKEND_URL}/api/v1/account/balance`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        });
        setBalance(response.data.balance);
    }

    useEffect(()=>{
        getBalance();
    }, []);
    return (
        <div>
            <AppBar name="PayTM App" greeting="Hello" initial="V"/>
            <Balance currency="Rs" amount={balance}/>
            <Users/>
        </div>
    )
}