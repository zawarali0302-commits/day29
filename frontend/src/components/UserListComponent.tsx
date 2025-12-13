import type { User } from "../types/UserType"

interface UserListComponentProps{
    usersList: User[];
}
const UserListComponent = ({usersList}: UserListComponentProps) => {
  return (
    <div>
      <ul>
        {usersList.map((user) => (
            <li key={user.id}>
                <h1>Name: {user.name}</h1>
                <h1>Designation: {user.designation}</h1>
                <h1>Salary: {user.salary}</h1>
            </li>
        ))}
      </ul>
    </div>
  )
}

export default UserListComponent
