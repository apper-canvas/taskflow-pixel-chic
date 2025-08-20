import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import TasksPage from "@/components/pages/TasksPage";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-purple-50 to-indigo-50">
      <Routes>
        <Route path="/" element={<TasksPage />} />
        <Route path="*" element={<TasksPage />} />
      </Routes>
      
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        style={{ zIndex: 9999 }}
      />
    </div>
  );
}

export default App;