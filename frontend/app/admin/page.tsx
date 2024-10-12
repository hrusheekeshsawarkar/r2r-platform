// 'use client';

// import { useState, useEffect } from 'react';
// import axios from 'axios';

// export default function AdminPage() {
//   //Create event
//   const [showModal, setShowModal] = useState(false);
//   const [eventId, setEventId] = useState('');
//   const [eventName, setEventName] = useState('');
//   const [eventDescription, setEventDescription] = useState('');
//   const [domains, setDomains] = useState(['']);

//   //Display all event  
//   const [events, setEvents] = useState([]);

//   //Edit event
//   const [isEditing, setIsEditing] = useState(false); // Track if editing or creating
//   const [currentEventId, setCurrentEventId] = useState(null); // To track which event is being edited



//   // Handle adding a new domain
//   const addDomain = () => {
//     setDomains([...domains, '']);
//   };

//   // Handle changing a specific domain
//   const handleDomainChange = (index, value) => {
//     const updatedDomains = [...domains];
//     updatedDomains[index] = value;
//     setDomains(updatedDomains);
//   };

//   // Handle removing a domain
//   const removeDomain = (index) => {
//     const updatedDomains = domains.filter((_, i) => i !== index);
//     setDomains(updatedDomains);
//   };

//   const fetchEvents = async () => {
//     const response = await axios.get('http://localhost:8000/admin/events'); // Your FastAPI admin events endpoint
//     setEvents(response.data);
//   };
//   useEffect(() => {
//     fetchEvents();
//   }, []);

//     // Handle form submission to create a new event
//     const handleCreateEvent = async () => {
//         try {
//             const eventData = {
//             id: eventId,
//             name: eventName,
//             description: eventDescription,
//             domains: domains.filter(domain => domain.trim() !== '') // Remove empty domains
//             };

//             await axios.post('http://localhost:8000/admin/events', eventData, {
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             });

//             setShowModal(false); // Close the modal after successful submission
//             // Reset the form
//             setEventId('');
//             setEventName('');
//             setEventDescription('');
//             setDomains(['']);
            
//             alert('Event created successfully!');
//             fetchEvents();

//         } catch (error) {
//             console.error('Error creating event', error);
//         }
//     };

//   const handleDelete = async (eventId) => {
//     try {
//       await axios.delete(`http://localhost:8000/admin/events/${eventId}`);
//       setEvents(events.filter(event => event._id !== eventId));
//       fetchEvents();

//     } catch (error) {
//       console.error('Delete failed', error);
//     }
//   };

//   return (
//     <div className="container mx-auto p-6">
//     <h1 className="text-2xl font-semibold mb-4">Admin - Create Events</h1>
    
//     <button
//       className="py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600"
//       onClick={() => setShowModal(true)}
//     >
//       Create Event
//     </button>

//     {/* Modal Popup */}
//     {showModal && (
//       <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//         <div className="bg-white p-6 rounded-lg shadow-lg w-96">
//           <h2 className="text-xl font-semibold mb-4">Create a New Event</h2>
          
//           <div className="mb-4">
//             <label className="block mb-1 font-medium">Event ID</label>
//             <input
//               type="text"
//               className="w-full p-2 border rounded-md"
//               value={eventId}
//               onChange={(e) => setEventId(e.target.value)}
//             />
//           </div>
          
//           <div className="mb-4">
//             <label className="block mb-1 font-medium">Event Name</label>
//             <input
//               type="text"
//               className="w-full p-2 border rounded-md"
//               value={eventName}
//               onChange={(e) => setEventName(e.target.value)}
//             />
//           </div>
          
//           <div className="mb-4">
//             <label className="block mb-1 font-medium">Description</label>
//             <textarea
//               className="w-full p-2 border rounded-md"
//               value={eventDescription}
//               onChange={(e) => setEventDescription(e.target.value)}
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block mb-1 font-medium">Domains</label>
//             {domains.map((domain, index) => (
//               <div key={index} className="flex mb-2">
//                 <input
//                   type="text"
//                   className="w-full p-2 border rounded-md mr-2"
//                   value={domain}
//                   onChange={(e) => handleDomainChange(index, e.target.value)}
//                 />
//                 <button
//                   className="py-1 px-3 bg-red-500 text-white rounded-md"
//                   onClick={() => removeDomain(index)}
//                 >
//                   Remove
//                 </button>
//               </div>
//             ))}
//             <button
//               className="py-1 px-4 bg-blue-500 text-white rounded-md"
//               onClick={addDomain}
//             >
//               Add Domain
//             </button>
//           </div>

//           <div className="flex justify-end">
//             <button
//               className="py-2 px-4 bg-gray-500 text-white rounded-md mr-2"
//               onClick={() => setShowModal(false)}
//             >
//               Cancel
//             </button>
//             <button
//               className="py-2 px-4 bg-green-500 text-white rounded-md"
//               onClick={handleCreateEvent}
//             >
//               Create Event
//             </button>
//           </div>
//         </div>
//       </div>
//     )}
//   {/* </div> */}
//     {/* // <div className="container mx-auto p-6"> */}
//       <h1 className="text-2xl font-semibold mb-4 mt-6">Manage Events</h1>
//       <ul className="space-y-4">
//         {events.map((event) => (
//           <li key={event._id} className="p-4 bg-white shadow rounded-lg">
//             <div className="flex justify-between items-center">
//               <h2 className="text-xl font-semibold">{event.name}</h2>
//               <div>
//                 <button 
//                   className="py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600 mr-2"
//                   onClick={() => handleDelete(event.id)}
//                 >
//                   Delete
//                 </button>
//                 <button className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600">
//                   Edit
//                 </button>
//               </div>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

export default function AdminPage() {
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // Track if editing or creating
  const [eventId, setEventId] = useState('');
  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [domains, setDomains] = useState(['']);
  const [events, setEvents] = useState([]);
  const [currentEventId, setCurrentEventId] = useState(null); // To track which event is being edited

  // Fetch the list of events when the component mounts
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:8000/admin/events');
      setEvents(response.data); // Assuming response.data contains the list of events
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  // Handle adding a new domain
  const addDomain = () => {
    setDomains([...domains, '']);
  };

  // Handle changing a specific domain
  const handleDomainChange = (index, value) => {
    const updatedDomains = [...domains];
    updatedDomains[index] = value;
    setDomains(updatedDomains);
  };

  // Handle removing a domain
  const removeDomain = (index) => {
    const updatedDomains = domains.filter((_, i) => i !== index);
    setDomains(updatedDomains);
  };

  // Open the modal for creating or editing
  const openModal = (event = null) => {
    if (event) {
      // Editing an event
      console.log("in  edititn")
      setIsEditing(true);
      setCurrentEventId(event.id);
      setEventId(event.id);
      setEventName(event.name);
      setEventDescription(event.description);
      setDomains(event.domains);
    } else {
      // Creating a new event
      setIsEditing(false);
      setEventId('');
      setEventName('');
      setEventDescription('');
      setDomains(['']);
    }
    setShowModal(true);
  };

  // Handle form submission to create or update an event
  const handleSaveEvent = async () => {
    const eventData = {
      id: eventId,
      name: eventName,
      description: eventDescription,
      domains: domains.filter(domain => domain.trim() !== ''), // Remove empty domains
    };

    try {
      if (isEditing) {
        // Update event
        console.log("in editi")
        await axios.put(`http://localhost:8000/admin/events/${currentEventId}`, eventData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        alert('Event updated successfully!');
      } else {
        // Create new event
        await axios.post('http://localhost:8000/admin/events', eventData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        alert('Event created successfully!');
      }

      setShowModal(false); // Close the modal after successful submission
      fetchEvents(); // Reload events
    } catch (error) {
      console.error('Error saving event', error);
    }
  };

  // Handle event deletion
  const handleDelete = async (eventId) => {
    try {
      await axios.delete(`http://localhost:8000/admin/events/${eventId}`);
      alert('Event deleted successfully!');
      fetchEvents(); // Reload events after deletion
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Admin - Create Events</h1>
      
      <button
        className="py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600"
        onClick={() => openModal()} // Open modal for creating a new event
      >
        Create Event
      </button>

      {/* Modal Popup */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">
              {isEditing ? 'Edit Event' : 'Create a New Event'}
            </h2>
            
            <div className="mb-4">
              <label className="block mb-1 font-medium">Event ID</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                value={eventId}
                onChange={(e) => setEventId(e.target.value)}
                disabled={isEditing} // Event ID can't be changed when editing
              />
            </div>
            
            <div className="mb-4">
              <label className="block mb-1 font-medium">Event Name</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
              />
            </div>
            
            <div className="mb-4">
              <label className="block mb-1 font-medium">Description</label>
              <textarea
                className="w-full p-2 border rounded-md"
                value={eventDescription}
                onChange={(e) => setEventDescription(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1 font-medium">Domains</label>
              {domains.map((domain, index) => (
                <div key={index} className="flex mb-2">
                  <input
                    type="text"
                    className="w-full p-2 border rounded-md mr-2"
                    value={domain}
                    onChange={(e) => handleDomainChange(index, e.target.value)}
                  />
                  <button
                    className="py-1 px-3 bg-red-500 text-white rounded-md"
                    onClick={() => removeDomain(index)}
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                className="py-1 px-4 bg-blue-500 text-white rounded-md"
                onClick={addDomain}
              >
                Add Domain
              </button>
            </div>

            <div className="flex justify-end">
              <button
                className="py-2 px-4 bg-gray-500 text-white rounded-md mr-2"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="py-2 px-4 bg-green-500 text-white rounded-md"
                onClick={handleSaveEvent}
              >
                {isEditing ? 'Update Event' : 'Create Event'}
              </button>
            </div>
          </div>
        </div>
      )}

      <h1 className="text-2xl font-semibold mb-4 mt-6">Manage Events</h1>
      <ul className="space-y-4">
        {events.map((event) => (
          <li key={event._id} className="p-4 bg-white shadow rounded-lg">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">{event.name}</h2>
              <div>
                <button
                  className="py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600 mr-2"
                  onClick={() => handleDelete(event.id)}
                >
                  Delete
                </button>
                <button
                  className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  onClick={() => openModal(event)} // Open modal for editing
                >
                  Edit
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
