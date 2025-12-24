import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { api } from "../api";

const AddExpense = () => {
  const { users, groups } = useContext(AppContext);

  const [groupId, setGroupId] = useState("");
  const [paidBy, setPaidBy] = useState("");
  const [participants, setParticipants] = useState([]);
  const [amount, setAmount] = useState("");

  // Get selected group
  const selectedGroup = groups.find(g => g._id === groupId);

  // Only users in the selected group
  const groupMembers = selectedGroup
    ? users.filter(u =>
        selectedGroup.members.some(m => m._id === u._id)
      )
    : [];

  const toggleParticipant = (id) => {
    setParticipants(prev =>
      prev.includes(id)
        ? prev.filter(p => p !== id)
        : [...prev, id]
    );
  };

  const submitExpense = async () => {
    if (!groupId || !paidBy || participants.length === 0 || !amount) {
      alert("Please fill all fields");
      return;
    }

    await api.addExpense({
      groupId,
      paidBy,
      participants,
      amount: Number(amount)
    });

    alert("Expense added successfully");
    setParticipants([]);
    setAmount("");
  };

  return (
    <div className="card">
      <h2>Add Expense</h2>

      {/* Select Group */}
      <select
        value={groupId}
        onChange={e => {
          setGroupId(e.target.value);
          setPaidBy("");
          setParticipants([]);
        }}
      >
        <option value="">Select Group</option>
        {groups.map(g => (
          <option key={g._id} value={g._id}>
            {g.name}
          </option>
        ))}
      </select>

      {/* Paid By */}
      {groupId && (
        <>
          <select
            value={paidBy}
            onChange={e => {
              setPaidBy(e.target.value);
              setParticipants([e.target.value]); // auto add payer
            }}
          >
            <option value="">Paid By</option>
            {groupMembers.map(u => (
              <option key={u._id} value={u._id}>
                {u.name}
              </option>
            ))}
          </select>

          {/* Participants */}
          <div className="participants">
            {groupMembers.map(u => {
              const isPayer = u._id === paidBy;

              return (
                <div key={u._id} className="participant-row">
                  <input
                    type="checkbox"
                    checked={participants.includes(u._id)}
                    disabled={isPayer}
                    onChange={() => toggleParticipant(u._id)}
                  />
                  <span>
                    {u.name}
                    {isPayer && " (Paid)"}
                  </span>
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* Amount */}
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={e => setAmount(e.target.value)}
      />

      <button onClick={submitExpense}>Add Expense</button>
    </div>
  );
};

export default AddExpense;
