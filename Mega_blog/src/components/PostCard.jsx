import service from "../appwrite/config.js" 
import {Link} from 'react-router-dom'

function PostCard({ $id, title, FeaturedImage }) {
  return (
    <Link to={`/post/${$id}`} className="block h-full">
        <div className='w-full h-full glass-card rounded-2xl p-4 border border-slate-800 hover:border-indigo-500/40 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300 group flex flex-col justify-between overflow-hidden'>
            <div className="flex flex-col">
                <div className='w-full aspect-[16/10] overflow-hidden rounded-xl bg-slate-950 mb-4 flex items-center justify-center relative'>
                    <img 
                        src={service.getFilePreview(FeaturedImage)} 
                        alt={title}
                        className='w-full h-full object-cover rounded-xl group-hover:scale-[1.03] transition-transform duration-500' 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] uppercase font-extrabold tracking-wider text-indigo-400 bg-indigo-500/10 px-2.5 py-0.5 rounded-md">
                        Article
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium">
                        3 min read
                    </span>
                </div>
                
                <h2 className='text-lg font-bold text-slate-100 group-hover:text-indigo-400 transition-colors duration-200 line-clamp-2 text-left leading-snug'>
                    {title}
                </h2>
            </div>
            
            <div className="flex items-center gap-1 text-xs font-bold text-indigo-400 mt-4 group-hover:translate-x-1 transition-transform duration-300 text-left">
                Read Article 
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"></path>
                </svg>
            </div>
        </div>
    </Link>
  )
}

export default PostCard
