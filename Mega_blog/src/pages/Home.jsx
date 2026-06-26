import {useEffect, useState} from 'react';
import service from '../appwrite/config.js';
import {Container, PostCard} from '../components';
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';

function Home() {
    const [posts, setPosts] = useState([]);
    const authStatus = useSelector((state) => state.auth.status);
    const navigate = useNavigate();
    
    useEffect(() => {
        service.getPosts([]).then((posts) => {
            if (posts) {
                setPosts(posts.documents);
            }
        });
    }, []);

    // Case 1: Not logged in - Show premium Landing Hero
    if (!authStatus) {
        return (
            <div className="w-full py-16 md:py-24 relative overflow-hidden flex flex-col items-center justify-center">
                {/* Glow decorations */}
                <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none"></div>
                
                <Container>
                    <div className="flex flex-col items-center text-center max-w-4xl mx-auto px-4">
                        <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3.5 py-1.5 rounded-full mb-6">
                            Publish your passion, your way
                        </span>
                        
                        <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-6 leading-[1.1] text-center">
                            Unleash Your Words,<br className="hidden md:inline" /> Inspire the World.
                        </h1>
                        
                        <p className="text-slate-600 text-base md:text-xl max-w-2xl mb-10 leading-relaxed">
                            Welcome to MegaBlog. Share your stories, read insightful articles, and connect with a global community of thinkers and creators.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
                            <button
                                onClick={() => navigate('/signup')}
                                className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold bg-gradient-to-r from-emerald-500 via-emerald-600 to-green-500 hover:from-emerald-400 hover:to-green-400 text-white shadow-lg shadow-emerald-500/25 active:scale-95 hover:scale-[1.02] transition-all duration-200"
                            >
                                Get Started Free
                            </button>
                            <button
                                onClick={() => navigate('/login')}
                                className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-800 shadow-sm active:scale-95 hover:scale-[1.02] transition-all duration-200"
                            >
                                Sign In
                            </button>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }

    // Case 2: Logged in but no posts exist
    if (posts.length === 0) {
        return (
            <div className="w-full py-20 text-center flex flex-col items-center justify-center">
                <Container>
                    <div className="max-w-md mx-auto p-8 rounded-2xl glass-card border border-slate-200 flex flex-col items-center">
                        <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-6 border border-slate-200">
                            <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                            </svg>
                        </div>
                        <h2 className="text-xl font-bold text-slate-900 mb-2">No Posts Yet</h2>
                        <p className="text-slate-600 text-sm mb-6">Be the first to publish a post and share your story with the world.</p>
                        <button
                            onClick={() => navigate('/add-post')}
                            className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-all shadow-md shadow-emerald-600/10 active:scale-95"
                        >
                            Create First Post
                        </button>
                    </div>
                </Container>
            </div>
        );
    }

    // Case 3: Logged in and posts exist - Show articles grid
    return (
        <div className="w-full py-12 relative z-10">
            <Container>
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-slate-200 pb-5 text-left">
                        <div>
                            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900">Featured Stories</h2>
                            <p className="text-slate-600 text-sm mt-1">Explore the latest thoughts, articles, and insights from creators.</p>
                        </div>
                        <button 
                            onClick={() => navigate('/add-post')}
                            className="mt-4 md:mt-0 px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl transition-all shadow shadow-emerald-600/10 active:scale-95"
                        >
                            + Write a Story
                        </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {posts.map((post) => (
                            <div key={post.$id} className="h-full">
                                <PostCard {...post} />
                            </div>
                        ))}
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default Home;