import { GoogleOAuthProvider } from "@react-oauth/google";
import Home from "./pages/Home.js"
import Redirect from "./pages/Redirect.js"
import NotFound from "./pages/404.js";
import Dashboard from "./pages/Dashboard.js";

import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";

import config from "./config.js";
import { useState } from "react";

function App() {
  const [token, setToken] = useState(false);

  return (
    <GoogleOAuthProvider clientId={config.googleClientId}>
      <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/:shortLink" element={<Redirect />} />
            <Route path="/404" element={<NotFound />} />
          </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
