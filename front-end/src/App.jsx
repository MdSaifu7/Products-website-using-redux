import { useEffect } from "react";
import Nav from "./components/Nav";
import Mainroutes from "./routes/Mainroutes";
// import asyncproduct from "./store/actions/productActions";
import { currentUser } from "./store/actions/userActions";
import { useDispatch, useSelector } from "react-redux";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer.data);

  useEffect(() => {
    !user && dispatch(currentUser());
  }, [user]);

  return (
    <div className="w-screen min-h-screen bg-gray-800 text-white font-thin">
      <Nav />
      <Mainroutes />
    </div>
  );
};

export default App;
