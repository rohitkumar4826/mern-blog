import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';
import { useDispatch,useSelector } from 'react-redux';
import SignUpImage from './../assets/signup.png';
import { signInFailure,signInStart,signInSuccess } from '../redux/user/userSlice';
export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  // const [loading, setLoading] = useState(false);
  const { loading } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage('Please fill out all fields.');
    }
    try {
      // setLoading(true);
      // setErrorMessage(null);
      dispatch(signInStart());
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        // setLoading(false);
        // return setErrorMessage(data.message);
        dispatch(signInFailure(data.message));
      }
      if (res.ok) {
        localStorage.setItem('access_token', data.token);
        dispatch(signInSuccess(data));
        navigate('/');
      }
    } catch (error) {
      // setErrorMessage(error.message);
      // setLoading(false);
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* Left */}
        <div className="flex-1 flex flex-col items-center md:items-center text-center md:text-left">
          <Link to="/" className="font-bold dark:text-white text-4xl flex items-center space-x-2">
            <img
              src={SignUpImage}
              alt="My Blog Logo"
              className="rounded-lg"
              style={{ maxHeight: '200px', maxWidth: '100%' }}
            />
          </Link>
          <p className="text-sm mt-5 text-gray-700 dark:text-gray-500">
            You can sign up with your email and password<br />
            or with Google.
          </p>
        </div>
        {/* Right */}
        <div className="flex-1">
          <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-500">
                Your username
              </label>
              <input
                type="text"
                id="username"
                className="shadow-sm bg-gray-50 rounded-md w-full px-3 py-2 text-sm border border-gray-300 focus:outline-none focus:ring-sky-500 focus:border-sky-500 dark:bg-gray-700 dark:text-gray-200 dark:focus:ring-sky-400"
                placeholder="Username"
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-500">
                Your email
              </label>
              <input
                type="email"
                id="email"
                className="shadow-sm bg-gray-50 rounded-md w-full px-3 py-2 text-sm border border-gray-300 focus:outline-none focus:ring-sky-500 focus:border-sky-500 dark:bg-gray-700 dark:text-gray-200 dark:focus:ring-sky-400"
                placeholder="name@company.com"
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-500">
                Your password
              </label>
              <input
                type="password"
                id="password"
                className="shadow-sm bg-gray-50 rounded-md w-full px-3 py-2 text-sm border border-gray-300 focus:outline-none focus:ring-sky-500 focus:border-sky-500 dark:bg-gray-700 dark:text-gray-200 dark:focus:ring-sky-400"
                placeholder="Password"
                onChange={handleChange}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center px-4 py-2 text-sm font-medium text-center text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-md shadow-sm hover:bg-gradient-to-br from-purple-700 to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 dark:bg-gradient-to-r from-fuchsia-500 to-sky-500 dark:hover:bg-gradient-to-br from-fuchsia-700 to-sky-700"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white dark:text-gray-200" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                  </svg>
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                'Sign Up'
              )}
            </button>
            <OAuth />
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Have an account?</span>
            <Link to="/sign-in" className="text-sky-400 dark:text-sky-300">
              Sign In
            </Link>
          </div>
          {errorMessage && (
            <div className="mt-5 text-sm text-red-600 bg-red-100 rounded-md p-4  dark:text-red-600" role="alert">
              {errorMessage}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
