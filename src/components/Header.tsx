import { signOut } from "firebase/auth";
import { useState } from "react";
import {
  FaSearch,
  FaShoppingBag,
  FaSignInAlt,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { auth } from "../../firebase";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/slices/userSlice";

function Header({ user }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dispatch = useDispatch();
  async function logoutHandler() {
    try {
      await signOut(auth);
      dispatch(setUser(null));
      toast.success("Logout successfully!");
      setIsOpen(false);
    } catch (error) {
      toast.error("Logout fail unfortunately!");
    }
  }
  return (
    <nav className="header">
      <Link to="/">Home</Link>
      <Link to="/search">
        <FaSearch />
      </Link>
      <Link to="/cart">
        <FaShoppingBag />
      </Link>

      {user?.id ? (
        <>
          <button onClick={() => setIsOpen((prev) => !prev)}>
            <FaUser />
          </button>
          <dialog open={isOpen}>
            <div>
              {user.role === "admin" && (
                <Link to="/admin/dashboard">Admin</Link>
              )}
              <Link to="/orders">Orders</Link>
              <button>
                <FaSignOutAlt onClick={logoutHandler} />
              </button>
            </div>
          </dialog>
        </>
      ) : (
        <Link to="/auth/login">
          <FaSignInAlt />
        </Link>
      )}
    </nav>
  );
}

export default Header;
