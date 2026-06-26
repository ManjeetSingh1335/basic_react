import service from "../appwrite/config.js" 
import {Link} from 'react-router-dom'


function PostCard({ $id,title,FeaturedImage}) {
  console.log("PostCard FeaturedImage:", FeaturedImage);
  console.log("PostCard preview URL:", service.getFilePreview(FeaturedImage));
  return (
    <Link to={`/post/${$id}`}>
        <div className='w-full bg-gray-100 rounded-xl p-4'>
            <div className='w-full justify-center mb-4'>
                
                <img src={service.getFilePreview(FeaturedImage)} alt={title}
                className='rounded-xl' />

            </div>
            <h2
            className='text-xl font-bold'
            >{title}</h2>
        </div>
    </Link>
  )
}

export default PostCard
