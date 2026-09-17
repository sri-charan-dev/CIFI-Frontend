import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import ReportIssue from "./pages/ReportIssue";
import ExploreIssues from "./pages/ExploreIssues";
import IssueDetails from "./pages/IssueDetails";
import MyReports from "./pages/MyReports";
import Notifications from "./pages/Notifications";
import AuthorityDashboard from "./pages/AuthorityDashboard";
import AuthorityIssues from "./pages/Authorityissues";
import AuthorityUsers from "./pages/AuthorityUsers";

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
        <Route path="/authority" element={<AuthorityDashboard />} />
        <Route path="/authority/issues" element={<AuthorityIssues />} />
        <Route path="/authority/users" element={<AuthorityUsers />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;