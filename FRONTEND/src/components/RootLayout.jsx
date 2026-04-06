import Header from "./Header"
import Footer from "./Footer"
import { Outlet } from "react-router"
import { useEffect } from "react"
import { useAuth } from "../store/authStore"

function RootLayout() {
  const checkAuth=useAuth((state)=>state.checkAuth)
  const loading=useAuth((state)=>state.loading)
  useEffect(()=>{
    checkAuth()
  },[])
  if(loading){
    return <p className="text-center mt-10">Loading..</p>
  }
  return (
    <div>
        <Header/>
        <div className="mx-20 min-h-screen">
            <Outlet/>
        </div>
        <Footer/>
    </div>
  )
}

export default RootLayout