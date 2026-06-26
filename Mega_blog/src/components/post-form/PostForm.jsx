import React, {useCallback} from 'react'
import {useForm} from "react-hook-form";
import {Button,Input,RTE,Select} from "../index.js";
import Service from "../../appwrite/config.js";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";


export default function PostForm({post}) {
    
    const navigate=useNavigate();
    const userData=useSelector((state)=>state.auth.userData);

    const {register,handleSubmit,watch,setValue,control,getValues}=useForm({
        defaultValues:{
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const submit=async(data)=>{
        //update existing post
        if(post){
            //upload new image if selected
            const file = data.image[0]? await appwriteService.uploadFile(data.image[0]):null;

            //delete old image if new image was uploaded
            if(file){
                appwriteService.deleteFile(post.featuredImage);
            }

            //update post in database
            const dbPost = await appwriteService.updatePost(post.$id, {
            ...data,
            featuredImage: file ? file.$id : undefined,
            });

            //redirect to updated post
            if(dbPost){
                navigate(`/post/${dbPost.$id}`);
            }

        //create new post
        }else{
            const file=await appwriteService.createPost(data.image[0]);
            if(file){
                const fileId=file.$id;
                data.featuredImage=fileId;
                const dbPost=await appwriteService.uploadFile({...data,userId:userData.$id});

                if(dbPost){
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        }
      
    }

    const slugTransform=useCallback((value)=>{
        if(value && typeof value==="string")
            return value
                        .trim()
                        .toLowerCase()
                        .replace(/[^a-zA-Z\d\s]+/g, "-")
                        .replace(/\s/g, "-");
        return "";
    },[]);

    //responsible for automatically updating the slug whenever the title changes
    React.useEffect(()=>{
        const subscription=watch((value,{name})=>{
            if(name=="title"){
                setValue("slug",slugTransform(value.title),{shouldValidate: true});
            }
        });
        return()=>subscription.unsubscribe
    },[watch,slugTransform,setValue]);


  return (
    
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
        
        <div className="w-2/3 px-2">
            <Input
                label="Title :"
                placeholder="Title"
                className="mb-4"
                {...register("title", { required: true })}
            />
            <Input
                label="Slug :"
                placeholder="Slug"
                className="mb-4"
                {...register("slug", { required: true })}
                onInput={(e) => {
                    setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                }}
            />
            <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
        </div>

        <div className="w-1/3 px-2">
            <Input
                label="Featured Image :"
                type="file"
                className="mb-4"
                accept="image/png, image/jpg, image/jpeg, image/gif"
                {...register("image", { required: !post })}
            />
            {post && (
                <div className="w-full mb-4">
                    <img
                        src={appwriteService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-lg"
                    />
                </div>
            )}
            <Select
                options={["active", "inactive"]}
                label="Status"
                className="mb-4"
                {...register("status", { required: true })}
            />
                
            <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                {post ? "Update" : "Submit"}
            </Button>

        </div>

    </form>

  );
};