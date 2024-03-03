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

/**
 * Routes:
 * - "/" route renders ProjectsPage component inside ProtectedRoute.
 * - "/project" route renders EditProjectPage component inside ProtectedRoute.
 * - "/project/:id" route renders EditProjectPage component inside ProtectedRoute.
 * - "/view/:id" route renders ViewProjectPage component inside ProtectedRoute.
 * - "/login" route renders LoginPage component.
 */

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
          <Route
            path="/project"
            element={
              <ProtectedRoute>
                <EditProjectPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/project/:id"
            element={
              <ProtectedRoute>
                <EditProjectPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/view/:id"
            element={
              <ProtectedRoute>
                <ViewProjectPage />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
