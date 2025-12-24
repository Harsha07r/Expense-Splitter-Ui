import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { api } from "../api";

const ViewBalance = () => {
  const { users, groups } = useContext(AppContext);
  const [groupId, setGroupId] = useState("");
  const [userId, setUserId] = useState("");
  const [balance, setBalance] = useState(null);

  // Find selected group
  const selectedGroup = groups.find(g => g._id === groupId);

  // Filter users → ONLY group members
  const groupMembers = selectedGroup
    ? users.filter(u =>
        selectedGroup.members.some(m => m._id === u._id)
      )
    : [];

  const fetchBalance = async () => {
    if (!groupId || !userId) {
      alert("Select group and user");
      return;
    }

    const data = await api.getBalance(groupId, userId);
    setBalance(data);
  };

  return (
    <div className="card">
      <h2>View Balance</h2>

      {/* Select Group */}
      <select
        value={groupId}
        onChange={e => {
          setGroupId(e.target.value);
          setUserId("");
          setBalance(null);
        }}
      >
        <option value="">Select Group</option>
        {groups.map(g => (
          <option key={g._id} value={g._id}>
            {g.name}
          </option>
        ))}
      </select>

      {/* Select User (ONLY group members) */}
      {groupId && (
        <select
          value={userId}
          onChange={e => setUserId(e.target.value)}
        >
          <option value="">Select User</option>
          {groupMembers.map(u => (
            <option key={u._id} value={u._id}>
              {u.name}
            </option>
          ))}
        </select>
      )}

      <button onClick={fetchBalance}>View</button>

      {balance && (
        <>
          <h3>You owe</h3>
          {balance.youOwe.length === 0 ? (
            <p>Nothing </p>
          ) : (
            balance.youOwe.map(b => (
              <p key={b._id}>
                {b.toUser.name} : ₹{b.amount}
              </p>
            ))
          )}

          <h3>You are owed</h3>
          {balance.owedToYou.length === 0 ? (
            <p>No dues</p>
          ) : (
            balance.owedToYou.map(b => (
              <p key={b._id}>
                {b.fromUser.name} : ₹{b.amount}
              </p>
            ))
          )}
        </>
      )}
    </div>
  );
};

export default ViewBalance;
