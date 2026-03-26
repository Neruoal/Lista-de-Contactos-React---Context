import { Outlet, useLocation } from "react-router-dom"
import ScrollToTop from "../components/ScrollToTop"

export const Layout = () => {
    const location = useLocation()

    return (
        <ScrollToTop location={location}>
            <Outlet />
        </ScrollToTop>
    )
}