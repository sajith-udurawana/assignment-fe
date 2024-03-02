import "rsuite/dist/rsuite.min.css";
import "./App.css";

import {BrowserRouter, Routes, Route} from "react-router-dom";
import {EditProjectPage, ProjectsPage, ViewProjectPage} from "./pages";
import {Provider} from "react-redux";
import {store} from './store'

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<ProjectsPage/>}/>
                    <Route path="/project" element={<EditProjectPage/>}/>
                    <Route path="/project/:id" element={<EditProjectPage/>}/>
                    <Route path="/view/:id" element={<ViewProjectPage/>}/>
                </Routes>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
