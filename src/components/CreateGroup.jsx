import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";

const CreateGroup = () => {
  const { users } = useContext(AppContext);
  const [name, setName] = useState("");
  const [members, setMembers] = useState([]);

  const toggleMember = (id) => {
    setMembers(prev =>
      prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
    );
  };

  const createGroup = async () => {
    if (!name || members.length === 0) {
      alert("Enter group name and select members");
      return;
    }

    await fetch("http://localhost:3000/groups", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, members })
    });

    alert("Group created! Refresh page.");
    setName("");
    setMembers([]);
  };

  return (
    <div className="card">
      <h2>Create Group</h2>

      <input
        placeholder="Group name (e.g. Goa Trip)"
        value={name}
        onChange={e => setName(e.target.value)}
      />

      {/* MEMBERS LIST */}
      <div className="participants">
        {users.map(u => (
          <div key={u._id} className="participant-row">
            <input
              type="checkbox"
              checked={members.includes(u._id)}
              onChange={() => toggleMember(u._id)}
            />
            <span>{u.name}</span>
          </div>
        ))}
      </div>

      <button onClick={createGroup}>Create Group</button>
    </div>
  );
};

export default CreateGroup;
