import { Route, Routes } from "react-router-dom";
import People from "./Components/People"
import SideBar from "./Components/SideBar";
import TopBar from "./Components/TopBar";
import "./index.css";
import OverView from "./Components/OverView";
import AddMember from "./Components/AddMember";
import UpdateUser from "./Components/UpdateUser";
function App() {

  return (
    <>

      <TopBar />

      <div className="flex justify-evenly">
        <div>
          <SideBar />
        </div>
        <div>
          <Routes>
            <Route path="/" element={<OverView />}></Route>
            <Route path="/overview" element={<OverView />}></Route>
            <Route path="/people" element={<People />}></Route>
            <Route path="/addNewMember" element={<AddMember />}></Route>
            <Route path="/update" element={<UpdateUser />}></Route>
          </Routes>
        </div>

      </div>

    </>
  )
}

export default App;
