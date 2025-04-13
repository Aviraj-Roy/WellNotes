import React, { useState } from 'react'
import axios from 'axios'
import NavBar from './NavBar'
import ProfileBar from './ProfileBar'
import { Button } from '../ui/button'
import Footerr from './Footerr'
import { BACKEND_URL } from '../../config';
import toast from 'react-hot-toast';



export default function PostingJournal({setAuthToken, authToken}) {
  console.log(HF_TOKEN);
    const [Title, setTitle] = useState('')
    const [Description, setDescription] = useState('')
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsLoading(true);
      const Token = localStorage.getItem("dbtoken");
      console.log("Creating journal", Token);
  
      try {
          // 📝 1. Save Journal to Your Backend
          const response = await axios.post(`${BACKEND_URL}/api/new_journal`, { 
              Title, Description, Token
          });
  
          toast.success("Journal published successfully!");
  
         
  
          // Clear form inputs
          setTitle('');
          setDescription('');
      } catch (error) {
          console.log(error);
          toast.error("Something went wrong!");
      } finally {
          setIsLoading(false);
      }
  };
  
    return (
        <div className="min-h-screen  bg-black flex flex-col px-10">
          <NavBar/>
          <main className="flex-grow container mx-auto pt-5">
            <ProfileBar/>
            <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg mt-5">
              <h2 className="text-xl font-bold text-white mb-4">What's on your mind today?</h2>
              <div className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Title"
                    value={Title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="bg-gray-700 border-gray-600 text-white w-full p-2"
                    required
                  />
                </div>
                <div>
                  <textarea
                    placeholder="Body"
                    value={Description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="bg-gray-700 border-gray-600 text-white w-full p-2 h-40"
                    required
                  />
                </div>
                <Button type="submit" className="w-full bg-green-500 hover:bg-green-600 p-2" disabled={isLoading}>
                  {isLoading ? 'Publishing...' : 'Publish Journal'}
                </Button>
              </div>
            </form>
          </main>
       
        
        </div>
      )
}
