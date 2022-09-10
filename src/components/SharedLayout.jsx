import { Outlet } from "react-router-dom"
import Navigation from "./Navigation"
import Footer from "./Footer"

export default function SharedLayout()
{
    return (
        <main className="bg-image">
            <Navigation />
            <div className="outlet">
                <Outlet />
            </div>
            <Footer />
        </main>
    )
}