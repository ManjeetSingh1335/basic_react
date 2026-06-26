import {Container, PostForm} from '../components'

function AddPost() {
  return (
    <div className='py-12 relative z-10 text-left'>
        <Container>
            <div className="border-b border-slate-900 pb-5 mb-8">
                <h1 className="text-3xl font-extrabold tracking-tight text-slate-100">Write a Story</h1>
                <p className="text-slate-400 text-sm mt-1">Fill out the details below to publish a new post.</p>
            </div>
            <PostForm />
        </Container>
    </div>
  )
}

export default AddPost