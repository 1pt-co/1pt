import Home from "./pages/Home.js"
import Redirect from "./pages/Redirect.js"
import NotFound from "./pages/404.js";

import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div>

        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/:shortLink" element={<Redirect />} />
          <Route path="/404" element={<NotFound />} />
        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;
