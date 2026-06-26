import {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import service from "../appwrite/config.js";
import {Button, Container} from "../components";
import parse from "html-react-parser";
import {useSelector} from "react-redux";

export default function Post() {

    const [post, setPost]=useState(null);
    const {slug}=useParams();
    const navigate=useNavigate();
    const userData=useSelector((state)=>state.auth.userData);
    const isAuthor=(post && userData)? post.userId===userData.$id : false;

    useEffect(()=>{
        if(slug){
            service.getPost(slug).then((post)=>{
                if(post){
                    console.log("Post details fetched:", post);
                    console.log("Generated image preview URL:", service.getFilePreview(post.FeaturedImage));
                    setPost(post);
                }else{
                    navigate("/");
                }
            });
        }else{
            navigate("/");
        }
    },[slug, navigate]);


    const deletePost=()=>{
        service.deletePost(post.$id)
        .then((status)=>{
            if(status){
                service.deleteFile(post.FeaturedImage);
                navigate("/");
            }
        });
    };


    return post ? (
        <div className="py-12 md:py-16 relative z-10 text-left">
            <Container>
                <div className="max-w-3xl mx-auto">
                    {/* Back navigation */}
                    <Link 
                        to="/" 
                        className="inline-flex items-center gap-1.5 text-slate-400 hover:text-slate-200 text-sm font-semibold mb-8 transition-colors duration-200 group"
                    >
                        <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"></path>
                        </svg>
                        Back to Stories
                    </Link>

                    {/* Meta info */}
                    <div className="mb-4 flex items-center gap-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-md">
                            Story
                        </span>
                        <span className="text-xs text-slate-500 font-medium">
                            3 min read
                        </span>
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl md:text-5xl font-extrabold text-slate-100 tracking-tight mb-6 leading-tight">
                        {post.title}
                    </h1>

                    {/* Author & Actions Bar */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-6 border-y border-slate-900 mb-8">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center font-bold text-white shadow-md shadow-indigo-500/10">
                                {post.userId ? post.userId.substring(0, 2).toUpperCase() : 'U'}
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-slate-200">
                                    Author ID: {post.userId}
                                </p>
                                <p className="text-xs text-slate-500">
                                    Published on MegaBlog
                                </p>
                            </div>
                        </div>

                        {isAuthor && (
                            <div className="flex items-center gap-2.5">
                                <Link to={`/edit-post/${post.$id}`}>
                                    <Button bgColor="bg-slate-900 border border-slate-800 hover:border-slate-700 hover:bg-slate-800 text-slate-300" className="px-4 py-2 text-xs font-bold rounded-xl">
                                        Edit
                                    </Button>
                                </Link>
                                <Button bgColor="bg-rose-600/90 hover:bg-rose-500 text-white" onClick={deletePost} className="px-4 py-2 text-xs font-bold rounded-xl">
                                    Delete
                                </Button>
                            </div>
                        )}
                    </div>

                    {/* Image and Image Error Info */}
                    <div className="w-full mb-8 relative rounded-2xl overflow-hidden bg-slate-950/40 border border-slate-900 shadow-2xl">
                        <img
                            src={service.getFilePreview(post.FeaturedImage)}
                            alt={post.title}
                            className="w-full max-h-[480px] object-cover"
                            onError={(e) => {
                                e.currentTarget.style.display = 'none';
                                const errorDiv = document.getElementById('image-error-info');
                                if (errorDiv) errorDiv.style.display = 'block';
                            }}
                        />
                        <div id="image-error-info" className="hidden text-center p-6 bg-rose-950/20 text-rose-300 border border-rose-900/30 rounded-2xl w-full">
                            <p className="font-bold text-lg mb-1">Image Failed to Load</p>
                            <p className="text-xs text-rose-400">Image ID: <code>{post.FeaturedImage}</code></p>
                            <p className="text-xs text-rose-400 mt-1">Preview URL: <a href={service.getFilePreview(post.FeaturedImage)} target="_blank" rel="noreferrer" className="underline break-all">{service.getFilePreview(post.FeaturedImage)}</a></p>
                            <p className="text-xs text-slate-400 mt-3 max-w-lg mx-auto"><strong>Tip:</strong> Click the preview URL. If you get a <code>'Role "any" is missing required attribute "read"'</code> error, go to Appwrite Storage Settings and add the <strong>Read</strong> permission for the <strong>Any</strong> role.</p>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="browser-css text-slate-300 leading-relaxed text-base md:text-lg">
                        {parse(post.content)}
                    </div>
                </div>
            </Container>
        </div>
    ) : null;
}