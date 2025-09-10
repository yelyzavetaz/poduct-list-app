import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProductListView } from "./pages/ProductListView";
import { ProductView } from "./pages/ProductView";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductListView />} />
        <Route path="/product/:id" element={<ProductView />} />
      </Routes>
    </Router>
  );
}

export default App;
