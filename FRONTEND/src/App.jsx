import { createBrowserRouter, RouterProvider } from 'react-router'
import RootLayout from './components/RootLayout'
import Home from './components/Home'
import Register from './components/Register'
import Login from './components/Login'
import AddArticle from './components/AddArticle'
import UserDashboard from './components/UserDashboard'
import AdminDashboard from './components/AdminDashboard'
import {Toaster} from 'react-hot-toast'
import ProtectedRoute from './components/protectedROUTE'
import ArticleById from './components/ArticleById'
import ErrorBoundary from './components/ErrorBoundary'
import AuthorProfile from './components/AuthorProfile'
import AuthorArticles from './components/AuthorArticles'
import EditArticle from './components/EditArticle'

function App() {
  const routerObj=createBrowserRouter([
    {
      path:"/",
      element:<RootLayout/>,
      errorElement:<ErrorBoundary/>,
      children:[
        {
          path:"",
          element:<Home/>,
        },
        {
          path:"register",
          element:<Register/>,
        },
        {
          path:"Login",
          element:<Login/>,
        },
        {
          path:"addarticle",
          element:
          <ProtectedRoute allowedRoles={["AUTHOR"]}>
            <AddArticle/>
          </ProtectedRoute>,
        },
        {
          path:"userdashboard",
          element:
          <ProtectedRoute allowedRoles={["USER"]}>
            <UserDashboard/>,
          </ProtectedRoute>
        },
        {
          path:"authordashboard",
          element:
          <ProtectedRoute  allowedRoles={["AUTHOR"]}>
            <AuthorProfile/>,
          </ProtectedRoute>,
          
        },
        {
          path:"admindashboard",
          element:<AdminDashboard/>,
        },
{
          path:"/article/:id",
          element:<ArticleById/>
        },
        {
          path:"/articles",
          element:
          <ProtectedRoute allowedRoles={["AUTHOR"]}>
            <AuthorArticles/>
          </ProtectedRoute>
        },
{
          path:"edit-article/:id",
          element:
          <ProtectedRoute allowedRoles={["AUTHOR"]}>
            <EditArticle/>
          </ProtectedRoute>
        }
        
      ]
    },

  ])
  return (<>
  <Toaster position='top-center' reverseOrder={false}/>
  <RouterProvider router={routerObj}/>;
  </>)
}

export default App