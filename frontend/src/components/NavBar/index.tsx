import { Link } from 'react-router-dom';
import { SelfStore } from '@/store/self';
import { authDispatcher } from '@/dispatcher/login';

function NavBar() {
  const self = SelfStore();

  const handleLogout = () => {
    authDispatcher.logout();
    // می‌تونی بعد از logout ریدایرکت هم کنی
    window.location.href = '/login';
  };

  return (
    <nav className="bg-white shadow-md dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* لوگو */}
          <div className="flex-shrink-0 text-2xl font-bold text-orange-500">MyApp</div>

          {/* منو */}
          <ul className="flex space-x-6 items-center">
            <li>
              <Link
                to="/"
                className="text-gray-700 dark:text-gray-200 hover:text-orange-500 transition-colors font-medium"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about-me"
                className="text-gray-700 dark:text-gray-200 hover:text-orange-500 transition-colors font-medium"
              >
                About Me
              </Link>
            </li>

            {/* Login */}
            {!self.self && (
              <li>
                <Link
                  to="/login"
                  className="text-gray-700 dark:text-gray-200 hover:text-orange-500 transition-colors font-medium"
                >
                  Login
                </Link>
              </li>
            )}

            {/* Username + Logout */}
            {self.self && (
              <>
                <li className="text-gray-700 dark:text-gray-200 font-medium">{self.self.username}</li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="text-red-500 hover:text-red-600 font-medium transition-colors"
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
