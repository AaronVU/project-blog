import { BrowserRouter as Router, Route, Routes, RouterProvider, createBrowserRouter } from "react-router-dom"
import PostList from "./pages/PostList"
import PostDetail from "./pages/PostDetail"
import CreatePost from "./pages/CreatePost"
import Layout from "./pages/Layout"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <PostList />
      },
      {
        path: "/posts",
        element: <PostList />
      },
      {
        path: "/posts/:id",
        element: <PostDetail />
      },
      {
        path: "/create",
        element: <CreatePost />
      },
    ]
  },
])

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App;
