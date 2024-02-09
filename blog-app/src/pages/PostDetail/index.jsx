import { useParams } from "react-router-dom"
import Post from "../../components/post";
import { useState, useEffect } from "react";
import Grid from '@mui/material/Grid';
import { getOne } from "../../services/post";

const PostDetail = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            const post = await getOne(id);
            setPost(post);
        };

        fetchPost();
    }, [id]);


    if (!post) {
        return (
            <h1>404 NOT FOUND</h1>
        )
    }

    return (
        <Grid container>
            <Grid item xs={12} sx={{paddingLeft: 4}}>
                <h1>Post Detail</h1>
            </Grid>
            <Post post={post} />
        </Grid>
    )
}

export default PostDetail;
