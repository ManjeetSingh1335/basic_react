import {useEffect,useState} from 'react';
import { Container,PostForm } from '../components';
import service from "../appwrite/config.js";
import { useNavigate, useParams } from 'react-router-dom';

function EditPost() {

  const [post,setPosts]=useState(null);
  const navigate=useNavigate();
  const {slug}=useParams();
  
  useEffect(()=>{
    if(slug){
      service.getPost(slug)
      .then((post)=>{
        if(post){
          setPosts(post);
        }
      })
    }else{
      navigate('/')
    }
  },[slug,navigate]);

  return post? (
    <div className='py-12 relative z-10 text-left'>
      <Container>
        <div className="border-b border-slate-200 pb-5 mb-8">
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Edit Post</h1>
            <p className="text-slate-600 text-sm mt-1">Update your article details, status, and media cover.</p>
        </div>
        <PostForm post={post}/>
      </Container>
    </div>
  ) : null
}

export default EditPost
