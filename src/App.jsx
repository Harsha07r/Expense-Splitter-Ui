import { AppProvider } from "./context/AppContext";
import AddExpense from "./components/AddExpense";
import ViewBalance from "./components/ViewBalance";
import CreateGroup from "./components/CreateGroup";
import "./App.css";
function App() {
  return (
    <AppProvider>
      <div className="container">
        <h1>Expense Sharing App</h1>

        <CreateGroup />  

        <AddExpense />
        <ViewBalance />
      </div>
    </AppProvider>
  );
}

export default App;
