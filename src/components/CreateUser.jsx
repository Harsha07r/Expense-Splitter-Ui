import React, { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";

const CreateUser = () => {
  const [name, setName] = useState("");
  const { users, setUsers } = useContext(UserContext);

  const handleCreateUser = async () => {
    if (!name.trim()) return;

    const res = await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name })
    });

    const data = await res.json();
    setUsers([...users, data]);
    setName("");
  };

  return (
    <>
      <h2>Create User</h2>

      <input
        type="text"
        placeholder="Enter user name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button onClick={handleCreateUser}>Create User</button>
    </>
  );
};

export default CreateUser;
