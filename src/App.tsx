import { BrowserRouter, Routes, Route } from "react-router-dom";
import {} from "react-router-dom";

import Home from "./pages/Home";
import Results from "./pages/Results";
import Layout from "./Layouts/layout";
import "./App.css";

function App() {
  return (
    <Layout>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/results" Component={Results} />
        </Routes>
      </BrowserRouter>
    </Layout>
  );
}

export default App;
