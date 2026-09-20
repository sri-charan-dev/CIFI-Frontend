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
import AuthorityDepartments from "./pages/AuthorityDepartments";
import AnalyticsReports from "./pages/AnalyticsReports";
import AuthorityCategories from "./pages/AuthorityCategories";
import AuthorityNotifications from "./pages/AuthorityNotifications";

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
        <Route path="/authority/departments" element={<AuthorityDepartments />} />
        <Route path="/authority/analytics" element={<AnalyticsReports />} />
        <Route path="/authority/categories" element={<AuthorityCategories />} />
        <Route path="/authority/notifications" element={<AuthorityNotifications />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;