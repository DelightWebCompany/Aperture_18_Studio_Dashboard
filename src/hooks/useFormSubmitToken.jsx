import { message } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router';

const useFormSubmitToken = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const formSubmitToken = async (url, inputData, method, headers, redirect, msg) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(url, {
        method,
        headers,
        body: JSON.stringify(inputData),
      });

      const data = await res.json();
      
      if (!res.ok) {
        if (res.status === 422) {
          setError(data.errors);
        }else {
          setError("An unexpected error occurred.");
        }
        return; // Early return on error
      }

      navigate(redirect);
      message.success(msg);
      return data; // Return the successful response data

    } catch (error) {
      console.error("Error during fetch:", error);
      setError("An error occurred during the deposit process. Please try again.");
    } finally {
      setLoading(false); // Ensure loading state is reset
    }
  };

  return { formSubmitToken, error, loading };
};

export default useFormSubmitToken;
