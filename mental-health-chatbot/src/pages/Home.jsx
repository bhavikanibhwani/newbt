// import React from "react";
// import { useNavigate } from "react-router-dom";

// const Home = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
//       <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Your App</h1>
//       <p className="text-lg text-gray-600 mb-8">Navigate through the application with ease.</p>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <button 
//           onClick={() => navigate("/dashboard")}
//           className="px-6 py-3 bg-blue-500 text-white rounded-xl shadow-md hover:bg-blue-600"
//         >
//           Go to Dashboard
//         </button>
        
//         <button 
//           onClick={() => navigate("/chat")}
//           className="px-6 py-3 bg-green-500 text-white rounded-xl shadow-md hover:bg-green-600"
//         >
//           Open Chat
//         </button>
        
//         <button 
//           onClick={() => navigate("/profile")}
//           className="px-6 py-3 bg-purple-500 text-white rounded-xl shadow-md hover:bg-purple-600"
//         >
//           View Profile
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Home;

// import React from "react";
// import { useNavigate } from "react-router-dom";

// const Home = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-green-800 to-black-400 p-6">
//       <h1 className="text-4xl font-bold text-white mb-4">Welcome to HealBOT,.</h1>
//       <p className="text-lg text-white text-center max-w-xl mb-6">
//         Your AI-powered assistant to support mental wellness. Start a conversation and feel heard.
//       </p>
//       <button
//         onClick={() => navigate("/register")}
//         className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-md hover:bg-blue-100 transition duration-300"
//       >
//         Sign Up
//       </button>
//       <button
//         onClick={() => navigate("/login")}
//         className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-md hover:bg-blue-100 transition duration-300"
//       >
//         Login
//       </button>
//       <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
//         <div className="p-6 bg-white rounded-lg shadow-md text-center">
//           <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
//           <p className="text-gray-600">Chat with AI anytime for mental health support.</p>
//         </div>
//         <div className="p-6 bg-white rounded-lg shadow-md text-center">
//           <h3 className="text-xl font-semibold mb-2">Personalized Responses</h3>
//           <p className="text-gray-600">AI adapts to your needs and offers personalized advice.</p>
//         </div>
//         <div className="p-6 bg-white rounded-lg shadow-md text-center">
//           <h3 className="text-xl font-semibold mb-2">Safe & Confidential</h3>
//           <p className="text-gray-600">Your conversations remain private and secure.</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;


// import React, { useEffect } from "react";
// import "./HealBotLanding.css"; // Converted CSS should be placed here
// import OrbitGraphic from "./OrbitGraphic";

// const Home = () => {
//   useEffect(() => {
//     // JS logic for Zdog orbit animation
//     const lerp = (a, p, b) => a + (p * (b - a));
//     const g = new OrbitGraphic();
//     const loop = () => {
//       g.render(1);
//       requestAnimationFrame(loop);
//     };
//     loop();
//   }, []);

//   return (
//     <div className="wrapper">
//       <header></header>
//       <section className="hero">
//         <div className="bgImage svg">
//           <OrbitGraphic/>
//         </div>
//         <div className="bgImage fog" />
//         <div className="bgImage heroContent container">
//           <h1>Welcome to HealBOT</h1>
//           <em>
//             Your AI-powered assistant to support mental wellness.
//             <br />
//             Start a conversation and feel heard.
//           </em>
//           <a className="button btn-juicy" href="/signup">
//             SignUp
//           </a>
//           <a className="button btn-juicy" href="/login">
//             Login
//           </a>
//         </div>
//       </section>

//       <div className="container">
//         <section>
//           <h2>Features</h2>
//           <div className="recentReviews">
//             <figure className="miniReview">
//               <h3>24/7 Support</h3>
//               <small>Chat with AI anytime for mental health support.</small>
//               <div className="productImage" />
//             </figure>
//             <figure className="miniReview">
//               <h3>Personalized Responses</h3>
//               <small>
//                 <span>
//                   AI adapts to your needs and offers personalized advice.
//                 </span>
//               </small>
//               <div className="productImage" />
//             </figure>
//             <figure className="miniReview">
//               <h3>Safe & Confidential</h3>
//               <small>
//                 <span>Your conversations remain private and secure.</span>
//               </small>
//               <div className="productImage" />
//             </figure>
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// };

// export default Home;

// src/Home.js
import React from 'react';
import { useNavigate } from "react-router-dom";
import './Home.css'; 

const Home = () => {
  const navigate = useNavigate();
    return (
        <div className="home">
            <h1 className="heading">Always on, always helpful. 
              <br></br><i class="co">Using AI</i> to help find your direction.</h1>
            <p>Our AI is designed to listen, understand, and provide personalized guidance to help you navigate life's challenges.</p>
            <div className="button-container">
                <button onClick={() => navigate("/register")} className="btn">Sign Up</button>
                <button onClick={() => navigate("/login")} className="btn">Login</button>
            </div>
            <h2>Features</h2>
            <ul>
                <li>24 Hour Support</li><br></br>
                <li>Start a conversation and feel heard.</li><br></br>
                <li>Chat with AI anytime for mental health support.</li><br></br>
                <li>AI adapts to your needs and offers personalized advice.</li>
            </ul>
        </div>
      
    );
};

export default Home;