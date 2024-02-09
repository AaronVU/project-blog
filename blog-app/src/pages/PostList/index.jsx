import * as React from 'react';
import { useEffect, useState } from "react";
import PostListItem from "../../components/postListItem";
import { getAll } from "../../services/post";
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    border: `1px solid ${theme.palette.primary.main}`,
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

const PostList = () => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [userInput, setUserInput] = React.useState('');

    const handleSearchInputChange = (event) => {
        setUserInput(event.target.value);
    }

    const navigateTo = () => {
        navigate('/create');
    }

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const postsData = await getAll();
                setPosts(postsData);
            } catch (error) {
                console.log('Error fetching posts: ', error.message);
            }
        };

        fetchPosts();
    }, []);

    useEffect(() => {
        if (userInput) {
            const filtered = posts.filter(post =>
                post.title.toLowerCase().includes(userInput.toLowerCase()) ||
                post.author.toLowerCase().includes(userInput.toLowerCase()) ||
                post.content.toLowerCase().includes(userInput.toLowerCase())
            );
            setFilteredPosts(filtered);
        } else {
            setFilteredPosts(posts);
        }
    }, [userInput, posts]);

    return (
        <div>
            {posts.length === 0 ? (
                <Grid container sx={{ display: 'flex' }}>
                    <Grid item xs={12} sx={{ paddingLeft: 4 }}>
                        <h1>No Posts Yet</h1>
                    </Grid>
                    <Grid container>
                        <Grid item xs={12} sx={{ paddingLeft: 4, paddingBottom: 2 }}>
                            <span>Create a Post</span>
                        </Grid>
                        <Grid item xs={12} sx={{ paddingLeft: 4 }}>
                            <Button variant="contained" onClick={() => navigateTo()}>Create Post</Button>
                        </Grid>
                    </Grid>
                </Grid>
            ) : (
                <Grid container sx={{ display: 'flex' }}>
                    <Grid item xs={2} sx={{ paddingLeft: 4 }}>
                        <h1>Post List</h1>
                    </Grid>
                    <Grid item xs={2} sx={{ alignSelf: 'center' }}>
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search…"
                                inputProps={{ 'aria-label': 'search' }}
                                value={userInput}
                                onChange={handleSearchInputChange}
                            />
                        </Search>
                    </Grid>
                    <Grid container sx={{ padding: 2, width: 'full' }}>
                        <List>
                            {filteredPosts.slice().reverse().map((post, index) => (
                                <ListItem key={index}>
                                    <PostListItem key={index} post={post} />
                                </ListItem>
                            ))}
                        </List>
                    </Grid>
                </Grid>
            )}
        </div>
    )
}

export default PostList;
