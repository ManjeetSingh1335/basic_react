import {useDispatch} from 'react-redux';
import authService from '../../appwrite/auth.js';
import {logout} from '../../store/authSlice.js';


function LogoutBtn() {

    const dispatch=useDispatch();
    const logoutHandler=()=>{
        authService.logout().then(()=>{
            dispatch(logout());
        })
    }
    return (
        <button
            className='px-4 py-2 text-sm font-semibold rounded-xl text-rose-600 hover:text-rose-700 hover:bg-rose-50 active:scale-95 duration-200 transition-all focus:outline-none focus:ring-2 focus:ring-rose-500/20'
            onClick={logoutHandler}
        >Logout</button>
    )
}

export default LogoutBtn
