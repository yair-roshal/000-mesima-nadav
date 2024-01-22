import { useState, useEffect } from "react"

export const useUsers = () => {
  const [users, setUsers] = useState([])
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("https://reqres.in/api/users")
        const data = await response.json()
        setUsers(data.data)
      } catch (error) {
        console.error("Error fetching users:", error)
      }
    }

    fetchUsers()
  }, [])

  const validateInput = (firstName, lastName, email) => {
    const nameRegex = /^[A-Za-z]+$/

    if (!firstName.trim() || !lastName.trim() || !email.trim()) {
      setError("All fields are required")
      return false
    }
    if (!nameRegex.test(firstName) || !nameRegex.test(lastName)) {
      setError("First name and last name should contain only English letters")
      return false
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError("Invalid email address")
      return false
    }

    setError("")
    return true
  }

  const addUser = (newUser) => {
    setUsers((prevUsers) => [...prevUsers, newUser])
  }

  const deleteUser = (userId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    )
    if (confirmed) {
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId))
    }
  }

  return { users, addUser, deleteUser, error, validateInput }
}
