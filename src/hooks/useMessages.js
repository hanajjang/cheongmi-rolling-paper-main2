import { useState, useEffect, useCallback } from 'react';

const GAS_URL = process.env.REACT_APP_GAS_URL;

export default function useMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  const fetchMessages = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res  = await fetch(GAS_URL);
      const data = await res.json();
      if (data.success) {
        setMessages(data.data);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  return { messages, loading, error, refetch: fetchMessages };
}
