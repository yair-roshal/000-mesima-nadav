import "./styles.css"
import React, { useState } from "react"
import { useUsers } from "./hooks/useUsers"
import { useSortableData } from "./hooks/useSortableData"

const App = () => {
  const { users, addUser, deleteUser, error, validateInput } = useUsers()

  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewUser((prevUser) => ({ ...prevUser, [name]: value }))
  }

  const handleAddUser = () => {
    const { firstName, lastName, email } = newUser

    if (validateInput(firstName, lastName, email)) {
      const user = {
        id: users.length + 1,
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        email: email.trim(),
        avatar: "https://via.placeholder.com/150",
      }

      addUser(user)
      setNewUser({ firstName: "", lastName: "", email: "" })
      alert("New user successfully added")
    }
  }

  const { items, requestSort, sortConfig } = useSortableData(users)

  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return
    }

    return sortConfig.key === name ? sortConfig.direction : undefined
  }

  return (
    <div className="app-container">
      <div className="input-container">
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={newUser.firstName}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={newUser.lastName}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={newUser.email}
          onChange={handleInputChange}
        />
        <button className="button add-user-button" onClick={handleAddUser}>
          Add User
        </button>
        {error && <p className="error-message">{error}</p>}
      </div>

      <table className="user-table">
        <thead>
          <tr>
            <th>
              First Name
              <div
                onClick={() => requestSort("first_name")}
                className={`arrow ${getClassNamesFor("first_name")}`}
              ></div>
            </th>

            <th>
              Last Name
              <div
                onClick={() => requestSort("last_name")}
                className={`arrow ${getClassNamesFor("last_name")}`}
              ></div>
            </th>

            <th>Email</th>
            <th>Avatar</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map((user) => (
            <tr key={user.id + user.email}>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
              <td>{user.email}</td>
              <td>
                <img src={user.avatar} alt={`${user.first_name}'s avatar`} />
              </td>
              <td>
                <button
                  className="button delete-user-button"
                  onClick={() => deleteUser(user.id)}
                >
                  X
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default App
