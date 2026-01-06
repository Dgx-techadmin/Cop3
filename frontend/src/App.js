import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "@/pages/HomePage";
import TipsPage from "@/pages/TipsPage";
import TutorialsPage from "@/pages/TutorialsPage";
import DepartmentDetailPage from "@/pages/DepartmentDetailPage";
import TrainingModule from "@/pages/TrainingModule";
import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tips" element={<TipsPage />} />
          <Route path="/tutorials" element={<TutorialsPage />} />
          <Route path="/training" element={<TrainingModule />} />
          <Route path="/department/:dept" element={<DepartmentDetailPage />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-right" />
    </div>
  );
}

export default App;
