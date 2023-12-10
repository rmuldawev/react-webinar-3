import Main from "./main";
import Basket from "./basket";
import useSelector from "../store/use-selector";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AboutProductPage from "./screens/about-product-page";

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const activeModal = useSelector((state) => state.modals.name);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/aboutProduct/:itemId" element={<AboutProductPage />} />
      </Routes>
      {activeModal === "basket" && <Basket />}
    </Router>
  );
}

export default App;
