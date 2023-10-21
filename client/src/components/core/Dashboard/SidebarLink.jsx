import * as Icons from "react-icons/vsc"
import { useDispatch } from 'react-redux'
import { NavLink, matchPath, useLocation } from 'react-router-dom'
import { resetCourseState } from "../../../slices/courseSlice"
const SidebarLink = ({ link, iconName }) => {
    const Icon = Icons[iconName]
    const dispatch = useDispatch()
    const location = useLocation()

    const matchRoute = (route) => (
        matchPath({ path: route }, location.pathname)
    )

    return (
        <NavLink to={link.path}
            onClick={() => dispatch(resetCourseState())}

            className={`relative px-8 py-2 text-sm font-medium ${matchRoute(link.path) ? "bg-yellow-800 " : "bg-opacity-0 "} `}
        >
            <span className={`absolute left-0 top-0 h-full w-[0.2rem] bg-yellow-50 ${matchRoute(link.path) ? "opacity-100" : "opacity-0"}`}>
            </span>
            <div className='flex flex-row items-center gap-x-2'>
                <Icon className="text-lg" />
                <span>{link.name}</span>
            </div>
        </NavLink>
    )
}

export default SidebarLink