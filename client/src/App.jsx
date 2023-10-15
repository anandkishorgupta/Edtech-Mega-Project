import { useSelector } from "react-redux"
import { Route, Routes } from "react-router-dom"
import "./App.css"
import { Navbar } from "./components/common/Navbar"
import OpenRoute from "./components/core/Auth/OpenRoute"
import PrivateRoute from "./components/core/Auth/PrivateRoute"
import AddCourse from "./components/core/Dashboard/AddCourse"
import Cart from "./components/core/Dashboard/Cart/index"
import EditCourse from "./components/core/Dashboard/EditCourse"
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses"
import MyCourses from "./components/core/Dashboard/MyCourses"
import MyProfile from "./components/core/Dashboard/MyProfile"
import Settings from "./components/core/Dashboard/Settings/Settings"
import About from "./pages/About"
import Catalog from "./pages/Catalog"
import ContactUs from "./pages/ContactUs"
import CourseDetails from "./pages/CourseDetails"
import Dashboard from "./pages/Dashboard"
import Error from "./pages/Error"
import ForgotPassword from "./pages/ForgotPassword"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import UpdatePassword from "./pages/UpdatePassword"
import VerifyEmail from "./pages/VerifyEmail"
import { ACCOUNT_TYPE } from "./utils/constants"
const App = () => {
  const { user } = useSelector((state) => state.profile)
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter text-white">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={
          <OpenRoute>
            <Login />
          </OpenRoute>
        } />
        <Route path="/signup" element={
          <OpenRoute>
            <Signup />
          </OpenRoute>
        } />
        <Route path="/forgot-password" element={
          <OpenRoute>
            <ForgotPassword />
          </OpenRoute>
        } />

        <Route path="/verify-email" element={
          <OpenRoute>
            <VerifyEmail />
          </OpenRoute>
        } />
        <Route path="/update-password/:id" element={
          <OpenRoute>
            <UpdatePassword />
          </OpenRoute>
        } />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactUs />} />

        <Route path="/catalog/:catalogName" element={<Catalog />} />
        <Route path="/courses/:courseId" element={<CourseDetails />} />
        <Route
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }

        >

          <Route path="/dashboard/my-profile" element={<MyProfile />} />
          <Route path="/dashboard/settings" element={<Settings />} />
          {
            user?.accountType == ACCOUNT_TYPE.STUDENT && (
              <>
                <Route path="/dashboard/cart" element={<Cart />} />
                <Route path="/dashboard/enrolled-courses" element={<EnrolledCourses />} />
              </>
            )
          }

          {
            user?.accountType == ACCOUNT_TYPE.INSTRUCTOR && (
              <>
                <Route path="/dashboard/add-course" element={<AddCourse />} />
              </>
            )
          }
          {
            user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
              <>
                <Route path="/dashboard/my-courses" element={<MyCourses />} />
              </>
            )
          }
          {
            user?.accountType === ACCOUNT_TYPE.INSTRUCTOR &&
            <>
              <Route path="/dashboard/add-course/:courseId" element={<EditCourse />} />
            </>
          }

        </Route>


        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  )
}

export default App