import React from 'react'

import { Container } from "react-bootstrap"

const AUTH_URL = "https://accounts.spotify.com/authorize?client_id=ccc25013b49c4614a8c38194cdaf6137&response_type=code&redirect_uri=http://smart-mirror-website.vercel.app/music&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"

export default function Login() {
    console.log("Login component rendered");
    return (
        <Container className='d-flex justify-content-center align-items-center' style={{ minHeight: "100vh" }}>
            <a className='btn btn-success btn-lg' href={AUTH_URL}>
                Login With Spotify
            </a>
        </Container>
    )
}
