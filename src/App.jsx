import "rsuite/dist/rsuite.min.css";
import "./App.css";

import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./components";
import {
  EditProjectPage,
  LoginPage,
  ProjectsPage,
  ViewProjectPage,
} from "./pages";
import { store } from "./store";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <ProjectsPage />
              </ProtectedRoute>
            }
          />
          <Route path="/project" element={<EditProjectPage />} />
          <Route path="/project/:id" element={<EditProjectPage />} />
          <Route path="/view/:id" element={<ViewProjectPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
