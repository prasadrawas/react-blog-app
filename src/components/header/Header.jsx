import React, { useState } from "react";
import Logo from "../logo/Logo";
import SecondaryButton from "../button/SecondaryButton";
import PrimaryButton from "../button/PrimaryButton";
import { Link, useNavigate } from "react-router-dom";
import routes from "../../config/routes";
import { useSelector } from "react-redux";
import { FaUserCircle } from "react-icons/fa";
import authService from "../../appwrite/auth-service";
import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";
import { HiOutlineMenuAlt3 } from "react-icons/hi";

function Header() {
  const userStatus = useSelector((state) => state.status);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(false);
  const [loading, setLoading] = useState(false);

  const logoutUser = async () => {
    setLoading(true);
    authService
      .logout()
      .then(() => {
        dispatch(logout());
        navigate(routes.login);
      })
      .finally(() => setLoading(false));
  };

  const hideMenu = () => {
    if (showMenu) {
      setShowMenu(false);
    }
  };

  return (
    <div>
      <header className="flex px-5 items-center justify-between shadow-sm w-full">
        {/* logo section */}
        <Link to={routes.home} onClick={hideMenu}>
          <Logo />
        </Link>

        {/* Menu section*/}

        <section className="hidden md:block">
          <ul className="flex space-x-5 items-center justify-center list-none font-medium">
            <li>
              <Link to={routes.createBlog}>
                <PrimaryButton title={"Write a Blog"} />
              </Link>
            </li>
            <li>
              <Link to={routes.myBlogs}>
                <PrimaryButton title={"My Blogs"} />
              </Link>
            </li>
          </ul>
        </section>

        {/* Auth section */}
        {userStatus === "active" ? (
          <div className="hidden md:block">
            <div className="flex items-center space-x-1 cursor-pointer">
              <FaUserCircle className="text-xl" />
              <span className="text-sm">{user.name}</span>
              <SecondaryButton
                title={"Logout"}
                className={"w-[100px] ml-2"}
                loading={loading}
                onClick={logoutUser}
              />
            </div>
          </div>
        ) : (
          <section className="hidden md:block">
            <div className="flex space-x-3">
              <Link to={routes.login}>
                <PrimaryButton title={"Login"} />
              </Link>
              <Link to={routes.register}>
                <SecondaryButton title={"Sign Up"} />
              </Link>
            </div>
          </section>
        )}

        {/* Mobile view section */}
        <HiOutlineMenuAlt3
          className="font-bold text-xl cursor-pointer md:hidden"
          onClick={() => setShowMenu(!showMenu)}
        />
      </header>

      {showMenu && (
        <section className="md:hidden p-3 shadow-md bg-white rounded-br-lg rounded-bl-lg">
          <ul className="flex flex-col space-x-5 items-center list-none space-y-3">
            <li>
              <Link to={routes.home}>
                <PrimaryButton
                  title={"Home"}
                  className={"w-[200px]"}
                  onClick={hideMenu}
                />
              </Link>
            </li>

            <li>
              <Link to={routes.blogEditor}>
                <PrimaryButton
                  title={"Write a Blog"}
                  className={"w-[200px]"}
                  onClick={hideMenu}
                />
              </Link>
            </li>

            <li>
              <Link to={routes.myBlogs}>
                <PrimaryButton
                  title={"My Blogs"}
                  className={"w-[200px]"}
                  onClick={hideMenu}
                />
              </Link>
            </li>

            {userStatus === "active" && (
              <div>
                <li>
                  <SecondaryButton
                    title={"Logout"}
                    className={"w-[200px]"}
                    loading={loading}
                    onClick={logoutUser}
                  />
                </li>
              </div>
            )}

            {userStatus === "inactive" && (
              <div>
                <li>
                  <Link to={routes.login}>
                    <PrimaryButton
                      title={"Login"}
                      className={"w-[200px]"}
                      onClick={hideMenu}
                    />
                  </Link>
                </li>
                <li>
                  <Link to={routes.register}>
                    <SecondaryButton
                      title={"Sign Up"}
                      className={"w-[200px]"}
                      onClick={hideMenu}
                    />
                  </Link>
                </li>
              </div>
            )}
          </ul>
        </section>
      )}
    </div>
  );
}

export default Header;
