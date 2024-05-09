import "./App.css";
import Sidebar from "./components/Sidebar/sidebar";
import MainContent from "./components/MainContent/mainContent";

function App() {
  return (
    <div className="app-container">
      <Sidebar />
      <MainContent />
    </div>
  );
}

export default App;
