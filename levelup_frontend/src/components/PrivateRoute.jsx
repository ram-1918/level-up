import { Navigate, Outlet } from "react-router"

export default function PrivateRoute () {
    const is_pin_found = localStorage.getItem('pcd');
    return is_pin_found ? <Outlet /> : <Navigate to="/" />
}