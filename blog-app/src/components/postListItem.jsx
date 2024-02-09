import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const PostListItem = ({ post }) => {
    const { id, title, author, publishedDate, content } = post;
    
    const trimmedContent = post.content.split(' ').slice(0, 70).join(' ');
    const displayContent = trimmedContent + (post.content.length > trimmedContent.length ? '...' : '');

    return (
        <Card variant='outlined' sx={{marginBottom: 4, marginInline: 2}}>
            <CardContent>
                <Link to={`/posts/${post.id}`} style={{textDecoration: 'none', color: 'inherit'}}>
                    <Typography variant='h5'>{post.title}</Typography>
                </Link>
                <Grid container>
                    <Typography variant='caption' sx={{paddingRight: 2}}>Author: {post.author}</Typography>
                    <Typography variant='caption'sx={{paddingLeft: 2}}>Publish Date: {post.publishedDate}</Typography>
                </Grid>
                <Typography variant='body1'>{displayContent}</Typography>
            </CardContent>
            <CardActions>
                <Button variant='text' component={Link} to={`/posts/${post.id}`}>Read more...</Button>
            </CardActions>
        </Card>
    )
}

export default PostListItem;