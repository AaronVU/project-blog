const baseUrl = import.meta.env.VITE_API_URL

export const getAll = async () => {
  try {
    const response = await fetch(`${baseUrl}/posts`);
    if (!response) {
      throw new Error('Failed to fetch posts')
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetchin posts: ', error.message);
    return [];
  }
};

export const getOne = async (postId) => {
  try {
    const response = await fetch(`${baseUrl}/posts/${postId}`);
    if (!response) {
      throw new Error('Failed to fetch post');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching post:', error.message);
    return null;
  }
};

export const createPost = async (postData) => {
  try {
    const response = await fetch(`${baseUrl}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    });

    if (!response.ok) {
      throw new Error('Failed to create post');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating post:', error.message);
    return null;
  }
};