import { useState } from "react";
import {
  FaSearch,
  FaShoppingBag,
  FaSignInAlt,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const user = {
  id: "",
  role: "user",
};

function Header() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  function logoutHandler() {}
  return (
    <nav className="header">
      <Link to="/" onClick={() => setIsOpen(false)}>
        Home
      </Link>
      <Link to="/search" onClick={() => setIsOpen(false)}>
        <FaSearch />
      </Link>
      <Link to="/cart" onClick={() => setIsOpen(false)}>
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
        <Link to="/login">
          <FaSignInAlt />
        </Link>
      )}
    </nav>
  );
}

export default Header;
