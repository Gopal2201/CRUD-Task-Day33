import axios from "axios";
import { useEffect, useState } from "react";
import { Table, Form, Row, Col, Button, Stack } from "react-bootstrap";

function PostApp() {
    const [posts, setPosts] = useState([]);
    const [userId, setUserId] = useState("");
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [id, setID] = useState("");

    // to get the posts from URL - completed
    useEffect(() => {
            (async function(){
                try {
                    const {data} = await axios.get("https://jsonplaceholder.typicode.com/posts");
                    setPosts(data);
                } catch (err) {
                    console.log(err);
                }
            })();
    }, [])

    // For deleting a particular post from list
    async function deletePost(id) {
        try {
            await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
            const data = posts.filter((post) => post.id !== id);
            setPosts(data)
        } catch (err) {
            console.log(err)
        }
    }

    // for updating a post
    async function updatePost() {
        try {
            const {data} = await axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, {userId, title, body});
            const tempposts = posts;
            const index = tempposts.findIndex((post) => post.id === id);
            tempposts[index] = data;
            setPosts(tempposts);
            setUserId("");
            setTitle("");
            setBody("");
        } catch (err) {
            console.error(err);
        }
    }

    // For creating a post
    async function createPost() {
        try {
            const {data} = await axios.post("https://jsonplaceholder.typicode.com/posts/", { userId, title, body});
            console.log(data);
            const tempposts = [posts];
            tempposts.push(data);
            setPosts([...posts, ...tempposts]);
            setUserId("");
            setTitle("");
            setBody("");
        } catch (err) {
            console.error(err);
        }
    }

    // To redirect to Update or create with condition
    function handleSubmit(event) {
        event.preventDefault();
        if (id) {
            updatePost();
        } else {
            createPost();
        }
    }

    function editPost(post) {
        setID(post.id)
        setUserId(post.userId)
        setTitle(post.title)
        setBody(post.body)
    }

    function handleChange({target: {name, value}}) {
        if (name === "userId") { setUserId(value)};
        if (name === "title") { setTitle(value)};
        if (name === "body") { setBody(value)};
    }

    return(
        <>
            <Stack gap={2} className="col-md-5 mx-auto">
                <h2> Post App</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                        <Form.Label column sm="2"> User ID: </Form.Label>
                        <Col sm="6">
                            <Form.Control type="number" name="userId" onChange={handleChange} value={userId} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                        <Form.Label column sm="2"> Title: </Form.Label>
                        <Col sm="6">
                            <Form.Control type="text" name="title" onChange={handleChange} value={title} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                        <Form.Label column sm="2"> Body: </Form.Label>
                        <Col sm="6">
                            <Form.Control type="text" name="body" onChange={handleChange} value={body} />
                        </Col>
                    </Form.Group>
                    <Button variant="primary" type="submit">Submit</Button>
                </Form>
            </Stack>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>User ID</th>
                        <th>Title</th>
                        <th>Body</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map((post) => {
                        return (
                            <tr key={post.id}>
                                <td>{post.id}</td>
                                <td>{post.userId}</td>
                                <td>{post.title}</td>
                                <td>{post.body}</td>
                                <td><Button variant="danger" onClick={() => deletePost(post.id)}>Delete</Button>
                                <Button variant="secondary" onClick={() => editPost(post)}>Edit</Button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </>
    )
}

export default PostApp;