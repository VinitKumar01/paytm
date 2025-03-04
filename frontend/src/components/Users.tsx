import Input from "./Input";
import SearchResults from "./SearchResults";

export default function Users() {
    return (
        <div className="px-6">
            <Input type="text" label="Users" placeholder="Search users..."/>
            <SearchResults firstName="Vinit" lastName="Kumar"/>
        </div>
    )
}