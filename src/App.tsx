import { Route, Routes } from "react-router-dom";

import Doctors from "@/pages/doctors/Doctors";
import Nurses from "@/pages/nurses/Nurses";

import MainLayout from "@/components/main-layout/main-layout";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="doctors" element={<Doctors />} />
        <Route path="nurses" element={<Nurses />} />
      </Route>
    </Routes>
  );
};

export default App;
