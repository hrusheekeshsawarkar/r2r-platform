'use client'; // Use 'use client' directive for components with client-side interactivity

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';

export default function UsersPage() {
  const { data: session, status } = useSession(); // Get session and status
  const [events, setEvents] = useState([]);
  const [registeredEvents, setRegisteredEvents] = useState([]);


  const fetchEvents = async () => {
    const response = await axios.get('http://localhost:8000/admin/events'); // Your FastAPI events endpoint
    console.log(response.data)
    setEvents(response.data);
  };

  const fetchRegisteredEvents = async (userId) => {
    const token = localStorage.getItem('token');
    try {
      // const userId = "user-2"; // Replace this with your actual user ID
      // console.log("http://localhost:8000/users/${userId}/events")
      const response = await axios.get(`http://localhost:8000/user/users/${userId}/events`, {
      headers: { Authorization: `Bearer ${token}` },
      });
      setRegisteredEvents(response.data);
    } catch (error) {
      console.log("Failed to fetch registered events",error)
    }

  };

  useEffect(() => {
    console.log(session?.userId)
    if (status === 'authenticated' && session?.userId) {
      // Fetch events and registered events once authenticated and session is available
      console.log("here i am")
      fetchEvents();
      fetchRegisteredEvents(session.userId);  // Use user ID from the session
    }
  }, [status, session]);

  const handleRegister = async (eventId) => {
    const token = localStorage.getItem('token');
    const data = {
        "user_id": session?.userId,
        "event_ids": [
          eventId
        ],
        "progress": [
          {
            "event_id": eventId,
            "domain": "running",
            "date": "2024-10-12",
            "progress": 0
          }
        ]
      }
    try {
    //   await axios.post('http://localhost:8000/user/users/register', { event_id: eventId }, {
        await axios.post('http://localhost:8000/user/users/register', data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Reload registered events after successful registration
      fetchRegisteredEvents(session?.userId);
    } catch (error) {
      console.error('Registration failed', error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Available Events</h1>
      <ul className="space-y-4">
        {events.map((event) => (
          <li key={event._id} className="p-4 bg-white shadow rounded-lg">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold">{event.name}</h2>
                <p className="text-gray-600">{event.domains.join(', ')}</p>
              </div>
              <button 
                className="py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600"
                onClick={() => handleRegister(event.id)}
              >
                Register
              </button>
            </div>
          </li>
        ))}
      </ul>

      <h1 className="text-2xl font-semibold mt-8 mb-4">Registered Events</h1>
      <ul className="space-y-4">
        {registeredEvents.map((event) => (
          <li key={event._id} className="p-4 bg-white shadow rounded-lg">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">{event.name}</h2>
              <button className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                Update Progress
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
