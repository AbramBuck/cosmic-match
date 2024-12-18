import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BiSolidPlanet } from "react-icons/bi";
import { thunkLogout } from "../../redux/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import "../Navigation/ProfileButton.css";

function ProfileButton() {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector((store) => store.session.user);
  const ulRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout());
    closeMenu();
  };

  return (
    <>
        <button className="nav-button" onClick={toggleMenu}>
          <div className="button-icon"><BiSolidPlanet fontSize="50px" />{user ? "User Info" : "Login"}</div>
        </button>
        {showMenu && (
          <ul className={"profile-dropdown"} ref={ulRef}>
            {user ? (
              <>
              <div className="button-bg">
               <h3> {user.username}</h3>
                <h3>{user.email}</h3>
                  <button onClick={logout}>Log Out</button>
              </div>
              </>
            ) : (
              <>
              <div className="button-bg">
                <OpenModalMenuItem
                  itemText="Log In"
                  onItemClick={closeMenu}
                  modalComponent={<LoginFormModal />}
                />
                <OpenModalMenuItem
                  itemText="Sign Up"
                  onItemClick={closeMenu}
                  modalComponent={<SignupFormModal />}
                />
              </div>
              </>
            )}
          </ul>
        )}
    </>
  );
}

export default ProfileButton;
