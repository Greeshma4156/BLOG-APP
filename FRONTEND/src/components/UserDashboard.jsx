import React, {useEffect,useState} from 'react'
import { useAuth } from '../store/authStore'
import { useNavigate } from 'react-router'
import { pageWrapper, articleGrid, articleCardClass, articleTitle, articleExcerpt, articleMeta, timestampClass, tagClass } from '../styles/common'
import axios from 'axios'
import { Link } from 'react-router'

function UserDashboard() {
  const currentUser = useAuth(state => state.currentUser)
  const [articles,setArticles] = useState([])

  const getArticles = async () =>{
    try{
      let res = await axios.get("http://localhost:4000/user-api/articles", {withCredentials:true})
      if (res.data.payload) {
        setArticles(res.data.payload)
      }
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    getArticles()
  },[])
  
  return (
    <div className={pageWrapper}>
      <div className="flex flex-col md:flex-row items-center gap-6 mb-12 bg-white/60 backdrop-blur-md p-8 rounded-3xl border border-white/50 shadow-xl shadow-indigo-500/10">
          {currentUser?.profileImageUrl && (
            <div className="w-24 h-24 shrink-0 relative">
              <img 
                src={currentUser.profileImageUrl} 
                alt="Profile" 
                className="w-full h-full object-cover rounded-full shadow-lg border-4 border-white"
              />
              <div className="absolute inset-0 rounded-full shadow-inner"></div>
            </div>
          )}
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-500 p-1">
              Welcome back, {currentUser?.firstName || currentUser?.name || 'Reader'}!
            </h1>
            <p className="text-gray-500 font-medium mt-1">Explore the latest brilliantly crafted stories.</p>
          </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
          <span className="w-8 h-1 bg-indigo-500 rounded-full"></span>
          Latest For You
        </h2>
        {articles.length === 0 ? (
          <div className="text-center py-20 bg-white/40 rounded-3xl border border-dashed border-gray-300">
            <p className="text-gray-400 font-bold text-xl">No articles available yet.</p>
          </div>
        ) : (
          <div className={articleGrid}>
            {articles.map((article)=>(
              <Link to={`/article/${article._id}`} key={article._id} className={articleCardClass}>
                 {article.imageUrl && (
                   <div className="w-full h-48 bg-gradient-to-br from-indigo-100 to-pink-100 rounded-2xl mb-4 overflow-hidden relative shadow-inner">
                      <img src={article.imageUrl} alt="Cover" className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute top-3 left-3">
                         <span className={tagClass}>{article.category || 'General'}</span>
                      </div>
                   </div>
                 )}
                 {!article.imageUrl && (
                    <div className="mb-4">
                       <span className={tagClass}>{article.category || 'General'}</span>
                    </div>
                 )}
                 <h3 className={articleTitle}>{article.title}</h3>
                 <p className={articleExcerpt}>{article.content}</p>
                 
                 <div className="mt-auto pt-4 border-t border-gray-100/50 flex justify-between items-center">
                    <span className={articleMeta}>By {article.author?.firstName || 'Author'}</span>
                    <span className={timestampClass}>Read more &rarr;</span>
                 </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default UserDashboard