import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "@/pages/HomePage";
import TipsPage from "@/pages/TipsPage";
import TutorialsPage from "@/pages/TutorialsPage";
import DepartmentDetailPage from "@/pages/DepartmentDetailPage";
import TrainingHub from "@/pages/TrainingHub";
import Module1 from "@/pages/Module1";
import Module2 from "@/pages/Module2";
import Module3 from "@/pages/Module3";
import Module4 from "@/pages/Module4";
import ChampionsToolkit from "@/pages/ChampionsToolkit";
import ScrollToTop from "@/components/ScrollToTop";
import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tips" element={<TipsPage />} />
          <Route path="/tutorials" element={<TutorialsPage />} />
          <Route path="/training" element={<TrainingHub />} />
          <Route path="/training/module-1" element={<Module1 />} />
          <Route path="/training/module-2" element={<Module2 />} />
          <Route path="/training/module-3" element={<Module3 />} />
          <Route path="/training/module-4" element={<Module4 />} />
          <Route path="/training/champions-toolkit" element={<ChampionsToolkit />} />
          <Route path="/department/:dept" element={<DepartmentDetailPage />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-right" />
    </div>
  );
}

export default App;
