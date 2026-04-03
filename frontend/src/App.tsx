import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Jobs from "./pages/Jobs";

function App() {
  const isLoggedIn = localStorage.getItem("token");

  return (
    <Router>
      {/* 🔥 Navbar */}
      <nav
        style={{
          padding: "15px",
          textAlign: "center",
          borderBottom: "1px solid #ddd",
        }}
      >
        <Link to="/">Home</Link>

        {!isLoggedIn && (
          <>
            {" | "}
            <Link to="/login">Login</Link>
            {" | "}
            <Link to="/signup">Signup</Link>
          </>
        )}
      </nav>

      {/* 🔥 Routes */}
      <Routes>
        <Route path="/" element={<Jobs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;