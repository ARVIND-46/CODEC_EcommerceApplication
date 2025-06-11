import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, adminOnly = false }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      setAuthorized(false);
    } else if (adminOnly && !user.isAdmin) {
      setAuthorized(false);
    } else {
      setAuthorized(true);
    }

    setIsLoading(false); // Stop loading once check is done
  }, []);

  if (isLoading) return <div>Loading...</div>;

  if (!authorized) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
