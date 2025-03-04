import { useEffect, useState } from "react";
import Input from "./Input";
import SearchResults from "./SearchResults";
import axios from "axios";
import { BACKEND_URL } from "../config";

type usersType = [{
    firstname: string,
    lastname: string,
    username: string,
    _id: string
},]



export default function Users() {
  const [filter, setFilter] = useState("");
  const [users, setUsers] = useState<usersType>();
  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    setFilter(event.target.value);
  }

  useEffect(()=> {
    const fetchUsers= async ()=> {
        const response = await axios.get(
            `${BACKEND_URL}/api/v1/user/bulk?filter=${filter}`
        );
        
        const users = response.data;
        setUsers(users);
    }

    fetchUsers();
  }, [filter]);
  return (
    <div className="px-6">
      <Input
        onChange={onChange}
        type="text"
        label="Users"
        placeholder="Search users..."
      />

      {users?.map((user, index)=> <SearchResults key={index} firstName={user.firstname} lastName={user.lastname} username={user.username}/>)}
    </div>
  );
}
