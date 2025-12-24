const BASE_URL = process.env.REACT_APP_API_URL || 
  "https://expense-sharing-w13r.onrender.com";

export const api = {
  // Create expense
  addExpense: async (data) => {
    const res = await fetch(`${BASE_URL}/expenses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  // Get balance for user in a group
  getBalance: async (groupId, userId) => {
    const res = await fetch(
      `${BASE_URL}/balances/${groupId}/${userId}`
    );
    return res.json();
  },

  // Get all users
  getUsers: async () => {
    const res = await fetch(`${BASE_URL}/users`);
    return res.json();
  },

  // Get all groups
  getGroups: async () => {
    const res = await fetch(`${BASE_URL}/groups`);
    return res.json();
  },

  // Create group
  createGroup: async (data) => {
    const res = await fetch(`${BASE_URL}/groups`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    return res.json();
  }
};
