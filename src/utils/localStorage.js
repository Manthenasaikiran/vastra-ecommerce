/* Save Data to LocalStorage */

export const setItem = (key, value) => {

  try {

    const data = JSON.stringify(value);

    localStorage.setItem(key, data);

  } catch (error) {

    console.error("Error saving to localStorage:", error);

  }

};


/* Get Data from LocalStorage */

export const getItem = (key) => {

  try {

    const data = localStorage.getItem(key);

    return data ? JSON.parse(data) : null;

  } catch (error) {

    console.error("Error reading localStorage:", error);

    return null;

  }

};


/* Remove Item */

export const removeItem = (key) => {

  try {

    localStorage.removeItem(key);

  } catch (error) {

    console.error("Error removing item:", error);

  }

};


/* Clear All Storage */

export const clearStorage = () => {

  try {

    localStorage.clear();

  } catch (error) {

    console.error("Error clearing localStorage:", error);

  }

};