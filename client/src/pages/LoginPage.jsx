import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const  data  = await axios.post('http://localhost:5000/auth/login', { email, password }, {
        withCredentials: true, // Necessary to send cookies

      });

      // Store the token in localStorage (or sessionStorage)
      localStorage.setItem('authToken', data.token);

      // Redirect to the homepage or dashboard after successful login
      navigate('/dashboard'); // Or any protected route
    } catch (err) {
      setError('Login failed. Please check your credentials.');
      console.error(err);
    }
  };

  return (
    <div className=" mx-auto  py-[130px] bg-gray-200">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

{/* <div key={pet._id}>
  <h3>{pet.name} ({pet.adoptionStatus})</h3>
  <p>{pet.breed}</p>
  <p>{pet.age} years old</p>
  <a href={`https://wa.me/${pet.contactNumber}?text=Hello! I'm interested in adopting ${pet.name}`} target="_blank">
    Contact for Adoption
  </a>
</div> */}

