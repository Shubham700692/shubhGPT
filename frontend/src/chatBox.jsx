import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ChatBox() {
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) {
      navigate("/login"); // redirect if not logged in
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  const user = JSON.parse(localStorage.getItem("currentUser"));

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Want to logout, {user?.username}</h2>
      <button onClick={handleLogout}>Logout</button>
      </div>
      
    </div>
  );
}

export default ChatBox;
