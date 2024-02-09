import PostForm from "../../components/postForm"
import Grid from '@mui/material/Grid';

const CreatePost = () => {
    return (
        <Grid container sx={{ display: 'flex' }}>
            <Grid item xs={12} sx={{paddingLeft: 4}}>
                <h1>Create Post</h1>
            </Grid>
            <Grid item xs={12}>
                <PostForm />
            </Grid>
        </Grid>

    )
}

export default CreatePost;