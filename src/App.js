
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VerifyOtp from "./pages/VerifyOtp";
import AuthorRegister from "./pages/AuthorRegister";   // NEW

import Books from "./pages/Books";
import IssueHistory from "./pages/IssueHistory";
import Wishlist from "./pages/Wishlist";

import AdminDashboard from "./pages/AdminDashboard";

/* AUTHOR MAIN */
import AuthorDashboard from "./pages/AuthorDashboard";

/* AUTHOR PAGES */
import DashboardHome from "./pages/author/DashboardHome";
import MyBooks from "./pages/author/MyBooks";
import AddBookAuthor from "./pages/author/AddBook";
import Ratings from "./pages/author/Ratings";
import Issues from "./pages/author/Issues";
import Profile from "./pages/author/Profile";

/* ADMIN PAGES */
import CreateAuthor from "./pages/CreateAuthor";
import AddBook from "./pages/AdddBook";
import ViewBooks from "./pages/ViewBooks";
import UpdateBook from "./pages/UpdateBook";
import DeleteBook from "./pages/DeleteBook";
import ViewRatings from "./pages/ViewRatings";

/* NEW ADMIN PAGE */
import AuthorRequests from "./pages/admin/AuthorRequests";

import SuccessPage from "./pages/SuccessPage";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {

return (

<BrowserRouter>

<Routes>

{/* ================= PUBLIC ROUTES ================= */}

<Route path="/" element={<Welcome />} />
<Route path="/login" element={<Login />} />
<Route path="/register" element={<Register />} />
<Route path="/author-register" element={<AuthorRegister />} />   {/* NEW */}
<Route path="/verify-otp" element={<VerifyOtp />} />


{/* ================= ADMIN ROUTES ================= */}

<Route
path="/admin-dashboard"
element={
<ProtectedRoute allowedRole="admin">
<AdminDashboard />
</ProtectedRoute>
}
/>

<Route
path="/author-requests"
element={
<ProtectedRoute allowedRole="admin">
<AuthorRequests />
</ProtectedRoute>
}
/>

<Route
path="/create-author"
element={
<ProtectedRoute allowedRole="admin">
<CreateAuthor />
</ProtectedRoute>
}
/>

<Route
path="/add-book"
element={
<ProtectedRoute allowedRole="admin">
<AddBook />
</ProtectedRoute>
}
/>

<Route
path="/update-book"
element={
<ProtectedRoute allowedRole="admin">
<UpdateBook />
</ProtectedRoute>
}
/>

<Route
path="/delete-book"
element={
<ProtectedRoute allowedRole="admin">
<DeleteBook />
</ProtectedRoute>
}
/>

<Route
path="/view-books"
element={
<ProtectedRoute allowedRole="admin">
<ViewBooks />
</ProtectedRoute>
}
/>

<Route
path="/view-ratings"
element={
<ProtectedRoute allowedRole="admin">
<ViewRatings />
</ProtectedRoute>
}
/>

<Route
path="/success"
element={
<ProtectedRoute allowedRole="admin">
<SuccessPage />
</ProtectedRoute>
}
/>


{/* ================= AUTHOR ROUTES ================= */}

<Route
path="/author-dashboard"
element={
<ProtectedRoute allowedRole="author">
<AuthorDashboard />
</ProtectedRoute>
}
/>

<Route
path="/author-dashboard/home"
element={
<ProtectedRoute allowedRole="author">
<DashboardHome />
</ProtectedRoute>
}
/>

<Route
path="/author-dashboard/books"
element={
<ProtectedRoute allowedRole="author">
<MyBooks />
</ProtectedRoute>
}
/>

<Route
path="/author-dashboard/add-book"
element={
<ProtectedRoute allowedRole="author">
<AddBookAuthor />
</ProtectedRoute>
}
/>

<Route
path="/author-dashboard/ratings"
element={
<ProtectedRoute allowedRole="author">
<Ratings />
</ProtectedRoute>
}
/>

<Route
path="/author-dashboard/issues"
element={
<ProtectedRoute allowedRole="author">
<Issues />
</ProtectedRoute>
}
/>

<Route
path="/author-dashboard/profile"
element={
<ProtectedRoute allowedRole="author">
<Profile />
</ProtectedRoute>
}
/>


{/* ================= USER ROUTES ================= */}

<Route
path="/books"
element={
<ProtectedRoute allowedRole="user">
<>
<Navbar />
<Books />
</>
</ProtectedRoute>
}
/>

<Route
path="/history"
element={
<ProtectedRoute allowedRole="user">
<>
<Navbar />
<IssueHistory />
</>
</ProtectedRoute>
}
/>

<Route
path="/wishlist"
element={
<ProtectedRoute allowedRole="user">
<>
<Navbar />
<Wishlist />
</>
</ProtectedRoute>
}
/>


{/* ================= FALLBACK ================= */}

<Route path="*" element={<Navigate to="/" />} />

</Routes>

</BrowserRouter>

);

}

export default App;
