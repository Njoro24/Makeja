export const hostelService = {
  async getHostels(searchTerm = '') {
    try {
      const queryParams = new URLSearchParams();
      if (searchTerm) {
        queryParams.append('search', searchTerm);
      }

      const response = await fetch(`/api/hostels?${queryParams.toString()}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch hostels: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching hostels from custom backend:", error);
      throw error;
    }
  },

  async getHostelById(id) {
    try {
      const response = await fetch(`/api/hostels/${id}`);
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Hostel not found');
        }
        throw new Error(`Failed to fetch hostel details: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error fetching hostel by ID ${id} from custom backend:`, error);
      throw error;
    }
  },
};
