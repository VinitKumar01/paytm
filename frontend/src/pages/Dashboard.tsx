import AppBar from "../components/AppBar";
import Balance from "../components/Balance";
import Users from "../components/Users";

export default function Dashboard() {
    return (
        <div>
            <AppBar name="PayTM App" greeting="Hello" initial="V"/>
            <Balance currency="Rs" amount={10000}/>
            <Users />
        </div>
    )
}