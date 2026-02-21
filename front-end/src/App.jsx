import { useEffect } from "react";
import Nav from "./components/Nav";
import Mainroutes from "./routes/Mainroutes";
// import asyncproduct from "./store/actions/productActions";
import { currentUser } from "./store/actions/userActions";
import { useDispatch } from "react-redux";
import { getAsyncProduct } from "./store/actions/productActions";
const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(currentUser());
    dispatch(getAsyncProduct());
  }, []);
  return (
    <div className="w-screen min-h-screen bg-gray-800 text-white font-thin">
      <Nav />
      <Mainroutes />
    </div>
  );
};

export default App;
