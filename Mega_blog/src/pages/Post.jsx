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


    return post? (
        <div className="py-8">
            <Container>
                <div className="w-full flex flex-col items-center justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={service.getFilePreview(post.FeaturedImage)}
                        alt={post.title}
                        className="rounded-xl"
                        onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            const errorDiv = document.getElementById('image-error-info');
                            if (errorDiv) errorDiv.style.display = 'block';
                        }}
                    />
                    <div id="image-error-info" className="hidden text-center p-4 bg-red-100 text-red-800 rounded-lg w-full">
                        <p className="font-bold">Image Failed to Load</p>
                        <p className="text-xs mt-1">Image ID: <code>{post.FeaturedImage}</code></p>
                        <p className="text-xs mt-1">Preview URL: <a href={service.getFilePreview(post.FeaturedImage)} target="_blank" rel="noreferrer" className="underline break-all">{service.getFilePreview(post.FeaturedImage)}</a></p>
                        <p className="text-xs mt-2"><strong>Tip:</strong> Click the preview URL above. If you get a <code>'Role "any" is missing required attribute "read"'</code> error, please go to your Appwrite Storage Settings and add the <strong>Read</strong> permission for the <strong>Any</strong> role.</p>
                    </div>

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {parse(post.content)}
                    </div>
            </Container>
        </div>
    ) : null;
}