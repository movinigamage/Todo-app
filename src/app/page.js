import TodoApp from "./components/TodoApp";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import AdminDashboard from "./components/AdminDashboard";



export default function Home() {
  return (

    <ProtectedRoute>
        <Navbar />
        <TodoApp />
        <AdminDashboard/>
    </ProtectedRoute>



  );
}
