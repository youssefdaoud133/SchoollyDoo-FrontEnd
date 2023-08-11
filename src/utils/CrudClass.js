import axios from "axios";

class CrudOperations {
  constructor(apiUrl, route) {
    this.apiUrl = apiUrl ? `${apiUrl}${route}` : "https://api.example.com"; // Replace with your API URL
  }

  // Fetch all items
  async fetchItems(callback, token) {
    console.log(token);
    try {
      if (token) {
        // Set the token in the request headers
        axios.defaults.headers.common["token"] = `Bearer ${token}`;
      }

      const response = await axios.get(`${this.apiUrl}`);
      callback();
      // console.log(response.data.user);

      return response.data.user;
    } catch (error) {
      console.error("Error fetching items:", error);
      throw error;
    }
  }
  // Fetch all notifications
  async fetchItemsnotifications(callback, token) {
    console.log(token);
    try {
      if (token) {
        // Set the token in the request headers
        axios.defaults.headers.common["token"] = `Bearer ${token}`;
      }

      const response = await axios.get(`${this.apiUrl}`);
      callback();
      console.log(response);

      return response;
    } catch (error) {
      console.error("Error fetching items:", error);
      throw error;
    }
  }
  // Fetch all schools to active
  async fetchSchoolsToActive(callback, token) {
    console.log(token);
    try {
      if (token) {
        // Set the token in the request headers
        axios.defaults.headers.common["token"] = `Bearer ${token}`;
      }

      const response = await axios.get(`${this.apiUrl}`);
      callback();
      console.log(response.data);

      return response.data;
    } catch (error) {
      console.error("Error fetching items:", error);
      throw error;
    }
  }
  // Fetch my schools  activeted
  async fetchmySchools(callback, token) {
    console.log(token);
    try {
      if (token) {
        // Set the token in the request headers
        axios.defaults.headers.common["token"] = `Bearer ${token}`;
      }

      const response = await axios.get(`${this.apiUrl}`);
      callback();
      console.log(response.data);

      return response.data;
    } catch (error) {
      console.error("Error fetching items:", error);
      throw error;
    }
  }

  // Create a new item
  async createItem(itemData, callback, token) {
    try {
      if (token) {
        // Set the token in the request headers
        axios.defaults.headers.common["token"] = `Bearer ${token}`;
      }
      const response = await axios.post(`${this.apiUrl}`, itemData);
      callback(response);
      return response.data;
    } catch (error) {
      return { errormsg: error.response.data.message };
    }
  }

  // Create a new profile picture
  async createProfilePicture(itemData, token) {
    try {
      if (token) {
        // Set the token in the request headers
        const config = {
          headers: {
            "Content-Type": "multipart/form-data",
            Type: "ProfilePictures",
            token: `Bearer ${token}`, // Add your token here
          },
        };
        const response = await axios.post(`${this.apiUrl}`, itemData, config);
        return response.data;
      }
    } catch (error) {
      return { errormsg: error.response.data.message };
    }
  }

  // Update an existing item
  async updateItem(itemId, itemData) {
    try {
      const response = await axios.put(`${this.apiUrl}/${itemId}`, itemData);
      return response.data;
    } catch (error) {
      console.error(`Error updating item ${itemId}:`, error);
      throw error;
    }
  }

  // Delete an item
  async deleteItem(itemId) {
    try {
      const response = await axios.delete(`${this.apiUrl}/${itemId}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting item ${itemId}:`, error);
      throw error;
    }
  }
}

export default CrudOperations;
