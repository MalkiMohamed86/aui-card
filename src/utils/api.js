import axios from 'axios';

/**
 * Fetch student data from the API
 * This function gets raw student data from the backend
 * 
 * @returns {Promise<Array>} Array of student records
 */
export const fetchStudentData = async () => {
  try {
    // Simple direct API call
    const response = await axios.get('https://tour.aui.ma/api/dashboard/data', {
      timeout: 60000 // 60 seconds timeout for large data
    });
    
    return response.data;
  } catch (error) {
    console.error('Error fetching student data:', error);
    throw error;
  }
};

export default axios; 