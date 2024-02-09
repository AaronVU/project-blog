import { useForm, Controller } from 'react-hook-form';
import { FormControl } from '@mui/base/FormControl';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import SnackbarContent from '@mui/material/SnackbarContent';
import { createPost } from '../services/post';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const generateRandomId = () => {
    return Math.floor(Math.random() * 1000000);
};

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(2);
    return `${day}/${month}/${year}`;
}

const PostForm = () => {
    const { handleSubmit, control, reset, formState: { errors } } = useForm({
        defaultValues: {
            title: "",
            author: "",
            content: "",
        },
    });

    const [showSnackbar, setShowSnackbar] = useState(false);
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        const currentDate = formatDate(new Date().toISOString());
        const randomId = generateRandomId();
        const postData = { id: randomId, ...data, publishedDate: currentDate };

        try {
            const createdPost = await createPost(postData);
            console.log('Post created successfully:', createdPost);
            setShowSnackbar(true);
            reset();
            setTimeout(() => {
                navigate('/');
            }, 3000);
        } catch (error) {
            console.error('Error creating post:', error.message);
        }
    };

    return (
        <FormControl>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2} sx={{ paddingLeft: 4, paddingBottom: 4, paddingRight: 4 }}>
                    <Grid item xs={6}>
                        <Controller
                            name="title"
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field }) => (
                                <TextField
                                    fullWidth
                                    error={!!errors.title}
                                    label="Post title"
                                    helperText={errors.title && "Please enter a title"}
                                    {...field}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Controller
                            name="author"
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field }) => (
                                <TextField
                                    fullWidth
                                    error={!!errors.author}
                                    label="Post author"
                                    helperText={errors.author && "Please enter the author"}
                                    {...field}
                                />
                            )}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={2} sx={{ paddingLeft: 4, paddingBottom: 4, paddingRight: 4 }}>
                    <Grid item xs={12}>
                        <Controller
                            name="content"
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field }) => (
                                <TextField
                                    fullWidth
                                    multiline
                                    error={!!errors.content}
                                    label="Post content"
                                    helperText={errors.content && "Please enter the content"}
                                    rows={5}
                                    {...field}
                                />
                            )}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={2} sx={{ paddingLeft: 4 }}>
                    <Grid item>
                        <Button variant="contained" type='submit'>Submit Post</Button>
                    </Grid>
                </Grid>
            </form>
            {showSnackbar && (
                <SnackbarContent
                    message={
                        'The post was created succesfully'
                    }
                />
            )}
        </FormControl>
    )
}

export default PostForm;