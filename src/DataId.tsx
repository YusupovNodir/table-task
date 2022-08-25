import axios, { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface getDataIdType {
  id: number;
  title: string;
  body: string;
}
const DataId = () => {
  let { userId } = useParams();
  const [usersId, setUserListId] = useState<getDataIdType[]>();

  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/users/${userId}/posts`)
      .then((response: AxiosResponse) => {
        setUserListId(response.data);
      });
  }, []);
  console.log(usersId);

  return (
    <div>
      {usersId?.map((item) => (
        <>
          <h3>{item.title}</h3>
          <p>{item.body}</p>
        </>
      ))}
    </div>
  );
};

export default DataId;
