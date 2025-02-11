import { useState, useEffect } from 'react';
import staff from './staff';

function StaffKudos({ isDarkMode }) {
  const [staffList, setStaffList] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [kudosGiven, setKudosGiven] = useState(false);

  // Fetch staff data
  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const data = staff;
        setStaffList(data);
      } catch (error) {
        console.error('Error fetching staff data:', error);
      }
    };

    fetchStaff();
  }, []);

  // Check if kudos was given in the last 24 hours
  useEffect(() => {
    const lastKudos = localStorage.getItem('lastKudos');
    if (lastKudos) {
      const now = new Date();
      const kudosTime = new Date(lastKudos);
      const hoursDifference = Math.abs(now - kudosTime) / 36e5;

      if (hoursDifference < 24) {
        setKudosGiven(true);
      }
    }
  }, []);

  const handleStaffSelect = (staff) => {
    setSelectedStaff(staff);
    setIsModalOpen(true);
  };

  const handleConfirmKudos = () => {
    // Simulate giving kudos by updating localStorage
    try {
      // Retrieve existing kudos data
      const existingKudos = JSON.parse(localStorage.getItem('kudosData')) || {};

      // Update kudos count for the selected staff
      const staffId = selectedStaff.id;
      existingKudos[staffId] = (existingKudos[staffId] || 0) + 1;

      // Save updated kudos data back to localStorage
      localStorage.setItem('kudosData', JSON.stringify(existingKudos));

      // Update last kudos time
      localStorage.setItem('lastKudos', new Date().toISOString());

      // Update component state
      setKudosGiven(true);
      setIsModalOpen(false);
      setSelectedStaff(null);

      alert(`Kudos given to ${selectedStaff.name}!`);
    } catch (error) {
      console.error('Error giving kudos:', error);
      alert('Failed to give kudos. Please try again.');
      setIsModalOpen(false);
    }
  };

  return (
    <div className="p-4">
      <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        Give Kudos to Staff
      </h2>

      {kudosGiven ? (
        <div className="text-center text-green-500">
          You've given kudos today. Please come back tomorrow!
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {staffList.map(staff => (
            <div
              key={staff.id}
              className={`cursor-pointer p-4 rounded-lg shadow-lg flex flex-col items-center ${
                isDarkMode ? 'bg-gray-800' : 'bg-white'
              } hover:shadow-2xl transition-shadow`}
              onClick={() => handleStaffSelect(staff)}
            >
              <img src={staff.image} alt={staff.name} className="w-24 h-24 rounded-full mb-2" />
              <span className={`mt-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {staff.name}
              </span>
              <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Kudos: { (JSON.parse(localStorage.getItem('kudosData')) || {})[staff.id] || 0 }
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Confirmation Modal */}
      {isModalOpen && selectedStaff && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-white'} p-6 rounded-lg shadow-lg`}>
            <h3 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Confirm Kudos
            </h3>
            <p className={`mb-4 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
              Are you sure you want to give kudos to <strong>{selectedStaff.name}</strong>?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className={`px-4 py-2 rounded ${isDarkMode ? 'bg-gray-600 text-white' : 'bg-gray-200 text-gray-800'}`}
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmKudos}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StaffKudos; 