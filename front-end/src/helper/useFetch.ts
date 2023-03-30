import React from 'react';

interface ReturnFetch<T> {
  response: Response | undefined;
  json: T;
}

function useFetch<T>() {
  const [data, setData] = React.useState();
  const [error, setError] = React.useState({message: '', value: false});
  const [loading, setLoading] = React.useState(false);
  const request = React.useCallback(async (url: string, options: any): Promise<ReturnFetch<T>> => {
    
    let response;
    let json;
    try {
      setError({message: '', value: false});
      setLoading(true);
      response = await fetch(url, options);
      json = await response.json();
      if (response.ok === false) throw new Error(json.message);
    } catch (error: any) {
      json = null;
      setError({message: error.message, value: true});
    } finally {
      setData(json);
      setLoading(false);
      return { response, json };
    }
  }, []);

  return {
    data,
    loading,
    error,
    request,
  };
}

export default useFetch;
