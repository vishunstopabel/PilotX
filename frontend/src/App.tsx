import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { AuthServices } from "./services";
import { useAppDispatch } from "./store/hooks";
import { addUser } from "./store/slices/authSlice";

function App() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await AuthServices.getCurrentUser();
        console.log(response);
        dispatch(addUser(response));
      } catch (error) {
        console.error("Failed to fetch user", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <>
      <Outlet />
    </>
  );
}

export default App;
