// 'use client'; // Use 'use client' directive for components with client-side interactivity

// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useSession } from 'next-auth/react';

// export default function UsersPage() {
//   const { data: session, status } = useSession(); // Get session and status
//   const [events, setEvents] = useState([]);
//   const [registeredEvents, setRegisteredEvents] = useState([]);

//   const [showModal, setShowModal] = useState(false);
//   const [isEditing, setIsEditing] = useState(false); // Track if editing or creating
//   const [eventId, setEventId] = useState('');
//   const [eventName, setEventName] = useState('');
//   const [eventDescription, setEventDescription] = useState('');
//   const [domains, setDomains] = useState(['']);
//   const [currentEventId, setCurrentEventId] = useState(null); // To track which event is being edited



//   const fetchEvents = async () => {
//     const response = await axios.get('http://localhost:8000/admin/events'); // Your FastAPI events endpoint
//     console.log(response.data)
//     setEvents(response.data);
//   };

//   const fetchRegisteredEvents = async (userId) => {
//     const token = localStorage.getItem('token');
//     try {
//       // const userId = "user-2"; // Replace this with your actual user ID
//       // console.log("http://localhost:8000/users/${userId}/events")
//       const response = await axios.get(`http://localhost:8000/user/users/${userId}/events`, {
//       headers: { Authorization: `Bearer ${token}` },
//       });
//       setRegisteredEvents(response.data);
//     } catch (error) {
//       console.log("Failed to fetch registered events",error)
//     }

//   };

//   useEffect(() => {
//     console.log(session?.userId)
//     if (status === 'authenticated' && session?.userId) {
//       // Fetch events and registered events once authenticated and session is available
//       console.log("here i am")
//       fetchEvents();
//       fetchRegisteredEvents(session.userId);  // Use user ID from the session
//     }
//   }, [status, session]);

//   const handleRegister = async (eventId) => {
//     const token = localStorage.getItem('token');
//     const data = {
//         "user_id": session?.userId,
//         "event_ids": [
//           eventId
//         ],
//         "progress": [
//           {
//             "event_id": eventId,
//             "domain": "running",
//             "date": "2024-10-12",
//             "progress": 0
//           }
//         ]
//       }
//     try {
//     //   await axios.post('http://localhost:8000/user/users/register', { event_id: eventId }, {
//         await axios.post('http://localhost:8000/user/users/register', data, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       // Reload registered events after successful registration
//       fetchRegisteredEvents(session?.userId);
//     } catch (error) {
//       console.error('Registration failed', error);
//     }
//   };

//     // Open the modal for creating or editing
//     const openModal = (event = null) => {
//       if (event) {
//         // Editing an event
//         // console.log("in  edititn")
//         setIsEditing(true);
//         setCurrentEventId(event.id);
//         setEventId(event.id);
//         setEventName(event.name);
//         setEventDescription(event.description);
//         setDomains(event.domains);
//       } else {
//         // Creating a new event
//         setIsEditing(false);
//         setEventId('');
//         setEventName('');
//         setEventDescription('');
//         setDomains(['']);
//       }
//       setShowModal(true);
//     };

//   return (
//     <div className="container mx-auto p-6">
//       <h1 className="text-2xl font-semibold mb-4">Available Events</h1>
//       <ul className="space-y-4">
//         {events.map((event) => (
//           <li key={event._id} className="p-4 bg-white shadow rounded-lg">
//             <div className="flex justify-between items-center">
//               <div>
//                 <h2 className="text-xl font-semibold">{event.name}</h2>
//                 <p className="text-gray-600">{event.domains.join(', ')}</p>
//               </div>
//               <button 
//                 className="py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600"
//                 onClick={() => handleRegister(event.id)}
//               >
//                 Register
//               </button>
//             </div>
//           </li>
//         ))}
//       </ul>

//       <h1 className="text-2xl font-semibold mt-8 mb-4">Registered Events</h1>
//       <ul className="space-y-4">
//         {registeredEvents.map((event) => (
//           <li key={event._id} className="p-4 bg-white shadow rounded-lg">
//             <div className="flex justify-between items-center">
//               <h2 className="text-xl font-semibold">{event.name}</h2>
//               <button className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
//                 onClick={() => openModal(event)} // Open modal for creating a new event

//               >
//                 Update Progress
//               </button>
//               {/* Modal Popup */}
//                 {showModal && (
//                   <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//                     <div className="bg-white p-6 rounded-lg shadow-lg w-96">
//                       <h2 className="text-xl font-semibold mb-4">
//                         {isEditing ? 'Edit Event' : 'Create a New Event'}
//                       </h2>
                      
//                       {/* <div className="mb-4">
//                         <label className="block mb-1 font-medium">Event ID</label>
//                         <input
//                           type="text"
//                           className="w-full p-2 border rounded-md"
//                           value={eventId}
//                           onChange={(e) => setEventId(e.target.value)}
//                           disabled={isEditing} // Event ID can't be changed when editing
//                         />
//                       </div> */}
                      
//                       <div className="mb-4">
//                         <label className="block mb-1 font-medium">Event Name</label>
//                         <input
//                           type="text"
//                           className="w-full p-2 border rounded-md"
//                           value={event.name}
//                           // onChange={(e) => setEventName(e.target.value)}
//                           disabled={true} // Event ID can't be changed when editing

//                         />
//                       </div>
                      
//                       <div className="mb-4">
//                         <label className="block mb-1 font-medium">Description</label>
//                         <textarea
//                           className="w-full p-2 border rounded-md"
//                           value={event.description}
//                           // onChange={(e) => setEventDescription(e.target.value)}
//                           disabled={true}
//                         />
//                       </div>

//                       <div className="mb-4">
//                         <label className="block mb-1 font-medium">Domains</label>
//                         {event.domains.map((domain, index) => (
//                           <div key={index} className="flex mb-2">
//                             <input
//                               type="text"
//                               className="w-full p-2 border rounded-md mr-2"
//                               value={domain}
//                               // onChange={(e) => handleDomainChange(index, e.target.value)}
//                               disabled={true}
//                             />
//                             <button
//                               className="py-1 px-3 bg-red-500 text-white rounded-md"
//                               // onClick={() => removeDomain(index)}
//                             >
//                               Remove
//                             </button>
//                           </div>
//                         ))}
//                         <button
//                           className="py-1 px-4 bg-blue-500 text-white rounded-md"
//                           // onClick={addDomain}
//                         >
//                           Add Domain
//                         </button>
//                       </div>

//                       <div className="flex justify-end">
//                         <button
//                           className="py-2 px-4 bg-gray-500 text-white rounded-md mr-2"
//                           onClick={() => setShowModal(false)}
//                         >
//                           Cancel
//                         </button>
//                         <button
//                           className="py-2 px-4 bg-green-500 text-white rounded-md"
//                           // onClick={handleSaveEvent}
//                         >
//                           {isEditing ? 'Update Event' : 'Create Event'}
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

'use client'; // Use 'use client' directive for components with client-side interactivity

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';

export default function UsersPage() {
  const { data: session, status } = useSession(); // Get session and status
  const [events, setEvents] = useState([]);
  const [registeredEvents, setRegisteredEvents] = useState([]);

  // State to handle modal and event data
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [progressData, setProgressData] = useState([]);

  const fetchEvents = async () => {
    const response = await axios.get('http://localhost:8000/admin/events'); // Your FastAPI events endpoint
    setEvents(response.data);
  };

  const fetchRegisteredEvents = async (userId) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`http://localhost:8000/user/users/${userId}/events`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRegisteredEvents(response.data);
    } catch (error) {
      console.log("Failed to fetch registered events", error);
    }
  };

  useEffect(() => {
    if (status === 'authenticated' && session?.userId) {
      fetchEvents();
      fetchRegisteredEvents(session.userId);
    }
  }, [status, session]);

  const handleRegister = async (eventId) => {
    const token = localStorage.getItem('token');
    const data = {
      "user_id": session?.userId,
      "event_ids": [eventId],
      "progress": [{
        "event_id": eventId,
        "domain": "running",
        "date": "2024-10-12",
        "progress": 0
      }]
    };
    try {
      await axios.post('http://localhost:8000/user/users/register', data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Reload registered events after successful registration
      fetchRegisteredEvents(session?.userId);
    } catch (error) {
      console.error('Registration failed', error);
    }
  };

  const openModal = (event) => {
    const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format

    // Initialize progress data for each domain with event_id and today's date
    const initializedProgressData = event.domains.map(domain => ({
      event_id: event.id,
      domain: domain,
      date: today,
      progress: 0
    }));

    setSelectedEvent(event);
    setProgressData(initializedProgressData);
    setShowModal(true);
  };

  const handleProgressChange = (index, value) => {
    const updatedProgress = [...progressData];
    updatedProgress[index].progress = value;
    setProgressData(updatedProgress);
  };

  const handleSaveProgress = async () => {
    const token = localStorage.getItem('token');
    const data = {
      "user_id": session?.userId,
      "event_id": selectedEvent.id,
      "progress": progressData // Use the full progress data with event_id, domain, date, and progress
    };
    try {
      await axios.put('http://localhost:8000/user/users/progress', data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Close modal after saving
      setShowModal(false);
    } catch (error) {
      console.error('Progress update failed', error);
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
              <button 
                className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                onClick={() => openModal(event)} // Open modal for updating progress
              >
                Update Progress
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Modal Popup */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Update Progress for {selectedEvent.name}</h2>
            
            {progressData.map((domainData, index) => (
              <div key={index} className="mb-4">
                <label className="block mb-1 font-medium">{domainData.domain}</label>
                <input
                  type="number"
                  className="w-full p-2 border rounded-md"
                  value={domainData.progress}
                  onChange={(e) => handleProgressChange(index, e.target.value)}
                />
              </div>
            ))}

            <div className="flex justify-end">
              <button
                className="py-2 px-4 bg-gray-500 text-white rounded-md mr-2"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="py-2 px-4 bg-green-500 text-white rounded-md"
                onClick={handleSaveProgress}
              >
                Save Progress
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
