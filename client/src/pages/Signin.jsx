import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SignInImage from './../assets/signin.png';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import OAuth from '../components/OAuth';

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure('Please fill all the fields'));
    }
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }

      if (res.ok) {
        localStorage.setItem('access_token', data.token);
        dispatch(signInSuccess(data));
        navigate('/');
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* Left */}
        <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
          <Link to="/" className="font-bold dark:text-white text-4xl">
            <img
              src={SignInImage}
              alt="My Blog Logo"
              className="rounded-lg"
              style={{ maxHeight: '200px', maxWidth: '100%' }} // Adjust the height and width as needed
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
                placeholder="**********"
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
                'Sign In'
              )}
            </button>
            <OAuth />
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Don’t have an account?</span>
            <Link to="/sign-up" className="text-sky-400 dark:text-sky-300">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
