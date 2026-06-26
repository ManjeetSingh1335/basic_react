import {useEffect,useState} from 'react';
import { Container, PostCard } from '../components'
import appwriteService from "../appwrite/config.js";


function AllPosts() {

    const [posts, setPosts] = useState([]);
    useEffect(()=>{
        appwriteService.getPosts([]).then((posts)=>{
            if(posts){
                setPosts(posts.documents)
            }
        })
    },[])


    return (
        <div className='w-full py-12 relative z-10'>
            <Container>
                <div className="flex flex-col gap-8">
                    <div className="border-b border-slate-900 pb-5 text-left">
                        <h1 className="text-3xl font-extrabold tracking-tight text-slate-100">All Published Posts</h1>
                        <p className="text-slate-400 text-sm mt-1">Browse all available stories and articles in the community repository.</p>
                    </div>
                    
                    {posts.length === 0 ? (
                        <div className="text-center py-20 bg-slate-900/10 rounded-2xl border border-slate-900">
                            <p className="text-slate-400 font-medium">No posts have been published yet.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {posts.map((post) => (
                                <div key={post.$id} className="h-full">
                                    <PostCard {...post} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </Container>
        </div>
    )
}

export default AllPosts
