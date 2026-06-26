import React, {useCallback} from 'react'
import {useForm} from "react-hook-form";
import {Button,Input,RTE,Select} from "../index.js";
import appwriteService from "../../appwrite/config.js";
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
        try {
            if(post){
                const file = data.image[0]? await appwriteService.uploadFile(data.image[0]):null;

                if(file){
                    appwriteService.deleteFile(post.FeaturedImage);
                }

                const dbPost = await appwriteService.updatePost(post.$id, {
                ...data,
                FeaturedImage: file ? file.$id : undefined,
                });

                if(dbPost){
                    navigate(`/post/${dbPost.$id}`);
                } else {
                    alert("Failed to update post. Please check the browser console.");
                }
            }else{
                const file=await appwriteService.uploadFile(data.image[0]);
                if(file){
                    const fileId=file.$id;
                    data.FeaturedImage=fileId;
                    const dbPost=await appwriteService.createPost({...data,userId:userData.$id});

                    if(dbPost){
                        navigate(`/post/${dbPost.$id}`);
                    } else {
                        alert("Failed to create post. Please check the browser console.");
                    }
                } else {
                    alert("File upload failed. Please check Appwrite Storage bucket permissions.");
                }
            }
        } catch (error) {
            console.error("Submission error:", error);
            alert("Submission error: " + error.message);
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
        return()=>subscription.unsubscribe()
    },[watch,slugTransform,setValue]);


  return (
    <div className="w-full max-w-5xl mx-auto glass-card rounded-2xl p-6 md:p-8 border border-slate-800 shadow-2xl relative mt-4">
        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-40 h-40 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none"></div>
        
        <form onSubmit={handleSubmit(submit, (errors) => { console.error("Validation Errors:", errors); alert("Form validation failed. Please check: " + Object.keys(errors).join(", ")); })} className="flex flex-col lg:flex-row gap-8 relative z-10">
            
            {/* Editor Column */}
            <div className="lg:w-2/3 flex flex-col gap-5">
                <Input
                    label="Title"
                    placeholder="Enter article title..."
                    className="mb-1"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug / URL Path"
                    placeholder="url-friendly-slug"
                    className="mb-1 text-slate-400 font-mono text-sm"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <div className="flex flex-col text-left">
                    <RTE label="Content" name="content" control={control} defaultValue={getValues("content")} />
                </div>
            </div>

            {/* Sidebar Column */}
            <div className="lg:w-1/3 flex flex-col gap-6 bg-slate-900/30 p-5 rounded-2xl border border-slate-800/80 h-fit">
                <div>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4 border-b border-slate-800 pb-2">
                        Settings & Media
                    </h3>
                </div>

                <div className="flex flex-col text-left">
                    <Input
                        label="Featured Image"
                        type="file"
                        className="mb-1 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-indigo-600/10 file:text-indigo-400 hover:file:bg-indigo-600/20 file:cursor-pointer cursor-pointer"
                        accept="image/png, image/jpg, image/jpeg, image/gif"
                        {...register("image", { required: !post })}
                    />
                </div>
                
                {post && (
                    <div className="w-full rounded-xl overflow-hidden border border-slate-800 shadow-md">
                        <p className="text-[10px] uppercase font-bold tracking-wider text-slate-500 mb-2 px-1 text-left">Current Cover</p>
                        <img
                            src={appwriteService.getFilePreview(post.FeaturedImage)}
                            alt={post.title}
                            className="w-full object-cover max-h-40 rounded-xl"
                        />
                    </div>
                )}
                
                <Select
                    options={["active", "inactive"]}
                    label="Publishing Status"
                    className="mb-2"
                    {...register("status", { required: true })}
                />
                    
                <Button 
                    type="submit" 
                    bgColor={post ? "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500" : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500"} 
                    className="w-full py-3"
                >
                    {post ? "Update Article" : "Publish Story"}
                </Button>
            </div>

        </form>
    </div>
  );
};