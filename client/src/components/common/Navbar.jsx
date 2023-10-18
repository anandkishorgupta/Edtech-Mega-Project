import { useEffect, useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BiChevronDown } from "react-icons/bi";
import { useSelector } from "react-redux";
import { Link, matchPath, useLocation } from "react-router-dom";
import logo from "../../assets/Logo/Logo-Full-Light.png";
import { NavbarLinks } from "../../data/navbar-links";
import { fetchCourseCategories } from "../../services/operations/courseDetailsAPI";
import ProfileDropDown from "../core/Auth/ProfileDropDown";

export const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);
  const location = useLocation();
  const { course } = useSelector((state) => state.course)
  const [subLinks, setSubLinks] = useState([]);

  const fetchSublinks = async () => {
    try {
      const result = await fetchCourseCategories()
      console.log("categories...................", result)
      setSubLinks(result);
    } catch (error) {
      console.log("cannot fetch the category list");
    }
  };
  console.log(subLinks)

  useEffect(() => {
    fetchSublinks();
  }, [course]);

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };
  return (
    <div className=" flex  h-14 items-center justify-center border-b-[1px] border-b-richblack-700 bg-richblack-800">
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">
        <Link to={"/"}>
          <img src={logo} alt="" width={160} height={42} loading="lazy" />
        </Link>
        {/* nav links */}
        <nav>
          <ul className="flex gap-x-6 text-richblack-25">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <div className="relative flex flex-row items-center group ">
                    <p>{link.title}</p>
                    <BiChevronDown />
                    <div
                      className="opacity-0 invisible  absolute left-[50%] top-[50%] translate-x-[-51%] translate-y-[32%] flex 
                        flex-col rounded-md bg-richblack-5 p-4 text-richblue-900 transition-all duration-200 
                        group-hover:visible group-hover:opacity-100 lg:w-[300px] z-10"
                    >
                      <div className="absolute left-[50%] top-0 h-6 w-6 rotate-45 bg-richblack-5 translate-x-[80%] translate-y-[-45%] "></div>
                      {
                        subLinks?.length > 0
                        && subLinks.filter((sublink) => sublink?.courses?.length > 0)
                          .map((subLink, index) => (
                            <Link to={`/catalog/${subLink.name.split(" ").join("-").toLowerCase()}`} key={index}>
                              <p className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50">{subLink?.name}</p>
                            </Link>
                          ))
                      }
                    </div>
                  </div>
                ) : (
                  <Link to={link?.path}>
                    <p
                      className={`${matchRoute(link?.path)
                        ? "text-yellow-25"
                        : "text-richblack-25"
                        }`}
                    >
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
        {/* login/signup/dashboard */}
        <div className="flex gap-x-4 items-center ">
          {user && user?.accountType != "Instructor" && (
            <Link to={"/dashboard/cart"} className="relative">
              <AiOutlineShoppingCart />
              {totalItems > 0 && <span className="absolute -right-2  -top-1  text-xs w-4 h-4 rounded-full animate-bounce flex justify-center items-center  text-richblack-900 bg-caribbeangreen-300">{totalItems}</span>}
            </Link>
          )}
          {token === null && (
            <Link to={"/login"}>
              <button className="border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md">
                Log in
              </button>
            </Link>
          )}
          {token === null && (
            <Link to={"/signup"}>
              <button className="border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md">
                Sign Up
              </button>
            </Link>
          )}
          {token !== null && <ProfileDropDown />}
        </div>
      </div>
    </div>
  );
};
