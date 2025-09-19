import { useFormik } from 'formik';
import NavBar from '@/components/NavBar';
import { authDispatcher } from '@/dispatcher/login';
import { Link, Navigate } from 'react-router-dom';
import { SelfStore } from '@/store/self'

function LoginPage() {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: (values) => {
      authDispatcher.login(values.username, values.password);
    },
  });

  const self = SelfStore((state) => state.self);

  // اگر لاگین هست، ریدایرکت به home
  if (self) {
    return (
      <Navigate
        to="/"
        replace
      />
    );
  }

  return (
    <>
      <NavBar />
      <div className="flex justify-center items-center min-h-[90dvh] bg-gray-100">
        <form
          onSubmit={formik.handleSubmit}
          className="w-full max-w-sm"
        >
          <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col gap-6">
            <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>

            <div className="flex flex-col">
              <label
                htmlFor="username"
                className="mb-2 font-medium text-gray-700"
              >
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.username}
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="password"
                className="mb-2 font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
              />
            </div>

            <button
              type="submit"
              className="bg-orange-400 text-white font-semibold py-2 rounded-md hover:bg-orange-500 transition-colors"
            >
              Login
            </button>

            {/* لینک به صفحه Register */}
            <p className="text-center text-gray-600 mt-2">
              Don't have an account?{' '}
              <Link
                to="/register"
                className="text-orange-500 hover:text-orange-600 font-medium transition-colors"
              >
                Register
              </Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}

export default LoginPage;
