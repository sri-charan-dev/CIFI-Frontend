import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import ReportIssue from "./pages/ReportIssue";
import ExploreIssues from "./pages/ExploreIssues";
import IssueDetails from "./pages/IssueDetails";
import MyReports from "./pages/MyReports";
import Notifications from "./pages/Notifications";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/report" element={<ReportIssue />} />
        <Route path="/explore" element={<ExploreIssues />} />
        <Route path="/issue/:id" element={<IssueDetails />} />
        <Route path="/myreports" element={<MyReports />} />
        <Route path="/notifications" element={<Notifications />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;