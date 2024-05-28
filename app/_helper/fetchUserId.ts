import axios from 'axios';

export const fetchUserId = async (): Promise<string> => {
  try {
    const response = await axios.get('/api/get-user-id');
    return response.data.userId;
  } catch (error) {
    console.error("Error fetching user ID:", (error as Error).message);
    throw error;
  }
};
