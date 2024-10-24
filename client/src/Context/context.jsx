import React, { createContext, useState, useContext, useEffect } from 'react';
import Cookies from 'js-cookie';

export const PetsContext = createContext();

export const PetsProvider = ({ children }) => {
  const [user,setUser] = useState()
  const [pets, setPets] = useState([
    {
      id: 1,
      name: "Bella",
      breed: "Labrador Retriever",
      age: "2 years",
      description: "A friendly and energetic dog who loves to play and is great with kids.",
      image: "https://images.unsplash.com/photo-1526526431900-88eb525f1e4a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGV0c3xlbnwwfHwwfHx8MA%3D%3D",
      adoptionStatus: "Available",
      contactNumber: "923209369167",
    },
    {
      id: 2,
      name: "Max",
      breed: "German Shepherd",
      age: "3 years",
      description: "A loyal and strong dog, perfect for families and protection. Needs a lot of exercise.",
      image: "https://plus.unsplash.com/premium_photo-1664371206019-a82ba8d7c2e2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cGV0c3xlbnwwfHwwfHx8MA%3D%3D",
      adoptionStatus: "Pending",
      contactNumber: "923209369167",
    },
    {
      id: 3,
      name: "Luna",
      breed: "Golden Retriever",
      age: "4 years",
      description: "A calm and affectionate dog, Luna enjoys long walks and lots of cuddles.",
      image: "https://images.unsplash.com/photo-1518887499460-71d222eed89d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGV0c3xlbnwwfHwwfHx8MA%3D%3D",
      adoptionStatus: "Adopted",
      contactNumber: "923209369167",
    },
    {
      id: 4,
      name: "Charlie",
      breed: "Golden Retriever",
      age: "5 years",
      description: "A gentle and affectionate dog who gets along well with other pets and children.",
      image: "https://images.unsplash.com/photo-1501820488136-72669149e0d4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHBldHN8ZW58MHx8MHx8fDA%3D",
      adoptionStatus: "Adopted",
      contactNumber: "923209369167",
    },
    {
      id: 5,
      name: "Rocky",
      breed: "Golden Retriever",
      age: "4 years",
      description: "A friendly and energetic dog, loves to fetch and is great with children.",
      image: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNhdHN8ZW58MHx8MHx8fDA%3D",
      adoptionStatus: "Adopted",
      contactNumber: "923209369167",
    }
  ]);

  useEffect(() => {
    const token = Cookies.get('token'); // Ensure 'token' matches the cookie name

    if (token) {
      console.log("Token:", token); // This should log the token

      // Function to decode a Base64Url encoded string
      const base64UrlDecode = (base64Url) => {
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); // Replace characters
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
      };

      // Split the token into its parts
      const parts = token.split('.');
      if (parts.length === 3) {
        const decodedPayload = base64UrlDecode(parts[1]); // Decode the payload
        setUser(decodedPayload);
        console.log(user)
        console.log("Decoded Payload:", decodedPayload); // Log the decoded payload

        // You can set the user state or perform any action with the decoded payload
        // setUser(decodedPayload); // If you have a state to store the user info
      } else {
        console.error("Invalid JWT structure");
      }
    } else {
      console.log("No token found"); // Log if no token is found
    }
  }, []);

  // Function to add a new pet
  const addPet = (newPet) => {
    setPets((prevPets) => [...prevPets, { ...newPet, id: prevPets.length + 1 }]);
  };

  // Function to get a pet by ID
  const getPetById = (id) => {
    return pets.find(pet => pet.id === parseInt(id));
  };

  return (
    <PetsContext.Provider value={{ pets, addPet, getPetById }}>
      {children}
    </PetsContext.Provider>
  );
};

export const usePets = () => useContext(PetsContext);
