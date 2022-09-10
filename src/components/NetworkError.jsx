import { Container, Button } from "react-bootstrap"

export default function NetworkError()
{
    return (
        <Container className="p-5 d-flex flex-column align-items-center justify-content-center">
            <img src="./images/error-image.png" className="error-image" alt="error icon"/>
            <h1 className="text-white text-center">Connection Error</h1>
            <p className="text-white text-center">Check your internet connection and try again</p>
            <Button variant="primary" onClick={()=>{ window.location.reload() }}>Reload</Button>
        </Container>   
    )
}