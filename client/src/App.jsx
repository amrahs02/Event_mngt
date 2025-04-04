import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import EventList from "./components/EventList";
import AddEvent from "./components/AddEvent";
import EditEvent from "./components/EditEvent";
import DeleteEvent from "./components/DeleteEvent";
import EventDetails from "./components/EventDetails"; 
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import GetProfile from "./components/GetProfile";
function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />

        {/* Show GetProfile below Navbar */}
        <div className="flex justify-center mt-2">
          <GetProfile />
        </div>

        <div className="flex justify-center items-center mt-10">
          <Routes>
            <Route path="/" element={<Navigate to="/events" replace />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/events" element={<EventList />} />
            <Route
              path="/add-event"
              element={
                <ProtectedRoute>
                  <AddEvent />
                </ProtectedRoute>
              }
            />
            <Route
              path="/edit-event/:id"
              element={
                <ProtectedRoute>
                  <EditEvent />
                </ProtectedRoute>
              }
            />
            <Route
              path="/delete-event/:id"
              element={
                <ProtectedRoute>
                  <DeleteEvent />
                </ProtectedRoute>
              }
            />
            <Route
              path="/events/:id"
              element={
                <ProtectedRoute>
                  <EventDetails />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
