import {Container, Logo, LogoutBtn} from '../index.js'
import { Link, useLocation } from 'react-router-dom'
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Header() {

    const authStatus=useSelector((state) => state.auth.status)
    const navigate=useNavigate()
    const location=useLocation()
    
    const navItems=[
        {
            name: 'Home',
            slug: "/",
            active: true
        }, 
        {
            name: "Login",
            slug: "/login",
            active: !authStatus,
        },
        {
            name: "Signup",
            slug: "/signup",
            active: !authStatus,
        },
        {
            name: "All Posts",
            slug: "/all-posts",
            active: authStatus,
        },
        {
            name: "Add Post",
            slug: "/add-post",
            active: authStatus,
        },
    ]

  return (
    <header className='sticky top-0 z-50 py-3.5 glass-nav transition-all duration-300'>
        <Container>
            <nav className='flex items-center justify-between'>
                
                <div className='flex items-center'>
                    <Link to='/' className="focus:outline-none">
                        <Logo width='70px' />
                    </Link>
                </div>
                    
                <ul className='flex items-center gap-1.5'>
                    {navItems.map((item) => {
                        if (!item.active) return null;
                        const isActive = location.pathname === item.slug;
                        return (
                            <li key={item.name}>
                                <button
                                    onClick={()=>navigate(item.slug)}
                                    className={`px-4 py-2 text-sm font-semibold rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/25 ${
                                        isActive 
                                        ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/10' 
                                        : 'text-slate-600 hover:text-emerald-600 hover:bg-emerald-50/60'
                                    }`}
                                >
                                    {item.name}
                                </button>
                            </li>
                        );
                    })}

                    {authStatus&&(
                        <li className="ml-1 pl-1 border-l border-slate-200">
                            <LogoutBtn />
                        </li>
                    )}
                </ul>

            </nav>
        </Container>
    </header>
  )
}

export default Header
