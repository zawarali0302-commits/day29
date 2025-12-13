import { useEffect, useState } from "react"
import UserListComponent from "./components/UserListComponent"
import type { User } from "./types/UserType"





function App() {
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:3000/users");
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("error fetching employees:", error);
      setError("Failed to fetch employees. Please try again later.")
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(()=>{
    document.title = "My App";
    fetchData()
  },[])
  return (
    <>

      {isLoading && <p>Loading...</p>}

      {error && <p className="bg-red-500">{error}</p>}
      <UserListComponent usersList={users} />
    </>
  )
}

export default App
