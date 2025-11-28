// import { AccountList } from "./components/AccountList";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import SignInPage from "./pages/auth/sign-in";
import DashboardHome from "./pages/dashboard/home";
import ProtectDashboard from "./route-protectors/dashboard";
import DashboardAccounts from "./pages/dashboard/account";
import DashboardTransactions from "./pages/dashboard/transactions";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* <Route path="*" element={<PageNotFound />} /> */}
          <Route path="/" element={<SignInPage />} />
          <Route element={<ProtectDashboard />}>
            <Route path="/dashboard/home" element={<DashboardHome />} />
            <Route path="/dashboard/account" element={<DashboardAccounts />} />
            <Route
              path="/dashboard/transactions"
              element={<DashboardTransactions />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
