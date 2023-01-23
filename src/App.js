import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Students from "./components/Students";
import StudentsCreate from "./components/StudentsCreate";
function App() {
  return (
    
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Students />} />
        <Route path="/Students" element={<Students />} />
        <Route path="/StudentsCreate" element={<StudentsCreate />} />

      </Routes>
    </Router>
  );
}

export default App;
