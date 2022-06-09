import { useState } from 'react'

// react custom hook
function useLocalStorage(initialValue) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [item, setItem] = useState(initialValue)
  // useEffect(() => {
  //   try {
  //     const localStorageItem = localStorage.getItem(itemName);
  //     let parsedItem;
  //     if (!localStorageItem) {
  //       localStorage.setItem(itemName, JSON.stringify(initialValue));
  //       parsedItem = [];
  //     } else {
  //       parsedItem = JSON.parse(localStorageItem);
  //     }
  //     setItem(parsedItem);
  //     setLoading(false);
  //   } catch (error) {
  //     setError(error);
  //   }
  // }, []);

  const saveItem = (itemName, newItem) => {
    try {
      localStorage.setItem(itemName, JSON.stringify(newItem))
      setItem(newItem)
      setLoading(false)
    } catch (err) {
      setLoading(false)
      setError(err)
    }
  }
  const getItem = (searchItem) => {
    try {
      return localStorage.getItem(searchItem)
    } catch (err) {
      setError(err)
    }
  }
  const removeItem = (itemName) => {
    try {
      return localStorage.removeItem(itemName)
    } catch (err) {
      setError(error)
    }
  }
  return { item, saveItem, getItem, removeItem, loading, error }
}
export { useLocalStorage }
