import { useEffect, useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BiChevronDown } from "react-icons/bi";
import { useSelector } from "react-redux";
import { Link, matchPath, useLocation } from "react-router-dom";
import logo from "../../assets/Logo/Logo-Full-Light.png";
import { NavbarLinks } from "../../data/navbar-links";
import { apiConnector } from "../../services/apiconnector";
import { categories } from "../../services/apis";
import ProfileDropDown from "../core/Auth/ProfileDropDown";
export const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItem } = useSelector((state) => state.cart);
  const location = useLocation();

  const [subLinks, setSubLinks] = useState([]);

  const fetchSublinks = async () => {
    try {
      const result = await apiConnector("GET", categories.CATEGORIES_API);
      setSubLinks(result.data.allCategory);
    } catch (error) {
      console.log("cannot fetch the category list");
    }
  };
  console.log(subLinks)

  useEffect(() => {
    fetchSublinks();
  }, []);

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };
  return (
    <div className=" flex  h-14 items-center justify-center border-b-[1px] border-b-richblack-700 bg-richblack-800">
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">
        <Link>
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
                        subLinks.length > 0 ? (
                          subLinks.map((subLink, index) => {
                            return <Link to={"/"} key={index}>
                              <p >{subLink?.name}</p>
                            </Link>;
                          })
                        ) : (
                          <div>error</div>
                        )}
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
              {totalItem > 0 && <span>{totalItem}</span>}
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
