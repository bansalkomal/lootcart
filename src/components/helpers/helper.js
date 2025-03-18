export const apiRequest = async (url, method = 'GET', body = null, headers = {}) => {
    try {
      const config = {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        body: body ? JSON.stringify(body) : null,
      };
  
      const response = await fetch(url, config);
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
  
      return await response.json();
    } catch (error) {
      console.error('API Request Failed:', error);
      throw error;
    }
  };

  export function formatDate(isoString) {
    const date = new Date(isoString);
  
    return new Intl.DateTimeFormat('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(date);
  }

  export const getUserId = () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    
    if (isLoggedIn === 'true') {
        const userDetails = JSON.parse(localStorage.getItem('userDetails'));
        return userDetails?.id || null; // returns the id or null if not found
    }
    
    return null;
};

  