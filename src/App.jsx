
import { Outlet } from "react-router-dom";
import { Header } from "./components";

function App() {
  return (
    <div className="w-full">
      <Header />

      <Outlet />
    </div>
  );
}

export default App;
