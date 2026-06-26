import './App.css';
import {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import authService from './appwrite/auth';
import {login, logout} from './store/authSlice';
import {Footer, Header} from './components';
import {Outlet} from 'react-router-dom';

function App(){

  const [loading,setLoading]=useState(true);
  const dispatch=useDispatch();

  useEffect(()=>{
    authService.getCurrentUser()
    .then((userData)=>{
      if(userData){
        dispatch(login({userData}))
      }else{
        dispatch(logout())
      }
    })
    .finally(()=> setLoading(false))
  }, [dispatch])


  return !loading ? (
    <div className='min-h-screen flex flex-col justify-between bg-slate-950 text-slate-100 bg-grid-pattern relative overflow-hidden'>
      {/* Ambient backgrounds */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className='w-full z-10 flex flex-col min-h-screen'>
        <Header />
        <main className="flex-grow">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-100">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-indigo-400 font-medium animate-pulse">Loading MegaBlog...</p>
      </div>
    </div>
  )
   
}

export default App