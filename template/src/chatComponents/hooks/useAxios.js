/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import isOnlineAtom from "../stateManager/atoms/isOnlineAtom";

axios.defaults.baseURL = process.env.REACT_APP_JSON_PLACEHOLDER;

const useAxios = (params) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [isOnline, setIsOnline] = useRecoilState(isOnlineAtom);

  const fetchData = async (params) => {
    setLoading(true);
    try {
      const res = await axios.request(params);
      setResponse(res.data);
      setError(null);
    } catch (err) {
      setIsOnline("offline");
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(params);
  }, []);

  return { response, error, loading };
};

export default useAxios;

// POST EXAMPLE WITH THIS CUSTOM HOOK
// const { response, error, loading } = useAxios({
//   method: 'POST',
//   url: '/posts',
//   headers: {
//     accept: '*/*',
//   },
//   data: {
//     userId: 7,
//     id: 777,
//     title: 'New Post',
//     body: 'This is a new post',
//   },
// });

//GET EXAMPLE, CODE USED IN ADMINPANEL2 COMPONENT FOR FETCH PLACEHOLDER USERS
//  const { response, error, loading } = useAxios({
//    method: "GET",
//    url: "/users",
//    header: {
//      accept: "*/*",
//    },
//  });
