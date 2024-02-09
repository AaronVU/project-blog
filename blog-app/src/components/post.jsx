import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const Post = ({post}) => {
    return (
        <Grid container sx={{paddingLeft: 4}}>
            <Grid item xs={12} sx={{marginBottom: 1}}>
                <Typography variant='h4'>{post.title}</Typography>
            </Grid>
            <Grid container spacing={2} sx={{alignItems: 'center', marginBottom: 1}}>
                <Grid item>
                    <Typography variant='subtitle1'>
                        Author: {post.author}
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant='subtitle1'>
                        Publish Date: {post.publishedDate}
                    </Typography>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Typography variant='body1'>{post.content}</Typography>
            </Grid>
        </Grid>
    );
}

export default Post;