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
  const [selectedDate, setSelectedDate] = useState(() => {
    // Set default date to today in YYYY-MM-DD format
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
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
  useEffect(() => {
    if (selectedEvent && selectedDate) {
      fetchProgress(selectedEvent.id, selectedDate, selectedEvent.domains);
    }
  }, [selectedEvent, selectedDate]);

  
  const transformProgressData = (progressObj, domains) => {
    if (!progressObj) return [];
    
    // If progressObj is already an array, return it
    if (Array.isArray(progressObj)) return progressObj;
    
    // Transform the object into an array format
    return domains.map(domain => ({
      domain: domain,
      progress: progressObj[domain]?.progress || 0
    }));
  };

  // Function to fetch progress for the selected date and event
  const fetchProgress = async (eventId, date,domains) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`http://localhost:8000/user/users/${session?.userId}/${eventId}/${date}/progress`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("response data:",response.data)
      console.log("domains:",domains)
      if (typeof response.data === 'string' && response.data.includes("No Progress found")) {
          // Set progress to 0 if no progress is found
        console.log("No progress data found for this date")
        // Set progress to 0 for all domains if no progress is found
        if (domains) {
          const defaultProgress = domains.map(domain => ({
            // event_id: eventId,
            domain: domain,
            progress: 0
          }));
          console.log("Setting default progress data:", defaultProgress); // Log default progress data

          setProgressData(defaultProgress);
        } else {
          console.error("Domains are undefined when setting default progress.");
        }
      } else {
        // Transform the object-based progress data into an array
        const transformedProgress = transformProgressData(response.data.progress, domains);
        console.log("Transformed progress data:", transformedProgress);
        setProgressData(transformedProgress);
      }
      // Add a console log to verify the progress data
      console.log("Progress data:", response.data.progress);
    } catch (error) {
      console.error("Failed to fetch progress", error);
      if (domains) {
        const defaultProgress = domains.map(domain => ({
          event_id: eventId,
          domain: domain,
          progress: 0
        }));
        console.log("Setting default progress after error:", defaultProgress);
        setProgressData(defaultProgress);
      } else {
        setProgressData([]);
      }
    }
  };


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

  const openModal = async (event) => {
    console.log("Opening modal for event:", event);
    const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format

    // Initialize progress data for each domain with event_id and today's date
    // const initializedProgressData = event.domains.map(domain => ({
    //   event_id: event.id,
    //   domain: domain,
    //   // date: today,
    //   progress: 0
    // }));
    // setProgressData(initializedProgressData);

    if (!event.domains) {
      console.error("Event domains are missing:", event);
      return;
    }

    setSelectedEvent(event);
    setSelectedDate(today); // Set default date in the date input field

    console.log("Fetching progress for:", {
      eventId: event.id,
      date: today,
      domains: event.domains
    });

    // Fetch progress for the event on today's date when the modal is opened
    if (event.domains) {
      await fetchProgress(event.id, today, event.domains); // Pass event domains directly
    } else {
      console.error("Event domains are undefined.");
    }
    setShowModal(true);
    console.log("Selected event:", event); // Log selected event to verify domains

  };

  const handleDateChange = async (newDate) => {
    setSelectedDate(newDate);
    await fetchProgress(selectedEvent.id, newDate,selectedEvent.domains); // Fetch progress for the new selected date
    
  };

  const handleProgressChange = (index, value) => {
    const updatedProgress = [...progressData];
    updatedProgress[index].progress = value;
    setProgressData(updatedProgress);
  };

  const handleSaveProgress = async () => {
    const token = localStorage.getItem('token');
        // Transform array back to object format for API
        const progressObject = progressData.reduce((acc, item) => {
          acc[item.domain] = { progress: item.progress };
          return acc;
        }, {});
    const data = {
      "user_id": session?.userId,
      "event_id": selectedEvent.id,
      "date":selectedDate,
      "progress": progressData.map(progress => ({
        ...progress,
        // date: selectedDate // Use the selected date for all progress updates
      }))
    };
    console.log("Saving progress data:", data);

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

  // useEffect(() => {
  //   console.log("Updated progressData:", progressData);
  //   console.log("bool: ",progressData && progressData.length > 0 ? "cec":"ww");
  //   console.log("boo2l: ", progressData.length > 0 ? "cec":"ww");
  //   console.log(typeof progressData)
  // }, [progressData]);

  // Add debugging useEffect
  useEffect(() => {
    if (showModal) {
      console.log("Modal state:", {
        selectedEvent,
        selectedDate,
        progressData,
        progressDataLength: progressData?.length,
        hasProgressData: Boolean(progressData && progressData.length > 0)
      });
    }
  }, [showModal, selectedEvent, selectedDate, progressData]);
  

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
          <li key={event.id} className="p-4 bg-white shadow rounded-lg">
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
            <label className="block mb-2 font-medium">Select Date</label>
            <input
              type="date"
              className="w-full p-2 border rounded-md mb-4"
              value={selectedDate}
              // onChange={(e) => setSelectedDate(e.target.value)}
              onChange={(e) => handleDateChange(e.target.value)}
            />
              {/* Add debug information */}
                <div className="text-sm text-gray-500 mb-2">
              Debug: Progress Data Length: {progressData?.length}
            </div>
            {progressData && progressData.length > 0 ? (
            // {progressData &&  (
              progressData.map((domainData, index) => (
                // progressData.map((domains) => (
                <div key={`${domainData.domain}-${index}`}  className="mb-4">
                  <label className="block mb-1 font-medium">{domainData.domain||"Unk"}</label>
                  <input
                    type="number"
                    className="w-full p-2 border rounded-md"
                    value={domainData.progress||0}
                    onChange={(e) => handleProgressChange(index, e.target.value,1)}
                  />
                </div>
              ))
            )  : (
               <p>No progress data available.</p>
             )} 

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
