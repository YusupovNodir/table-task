import axios, { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface getDataType {
  email: string;
  id: number;
  name: string;
  phone: string;
  username: string;
  website: string;
}

const Home = () => {
  let navigate = useNavigate();
  const [users, setUserList] = useState<getDataType[]>();
  const [sortAZ, setsortAZ] = useState(true);

  // console.log(users);

  const handleSearchChange = (
    e: React.ChangeEvent<HTMLInputElement> | undefined
  ) => {
    let searchData: getDataType[] = [];
    let value = e?.target.value || "";

    if (!value) {
      fetchingData();
    } else {
      users?.forEach((user) => {
        let searchstate =
          ` ${user.name} ${user.phone} ${user.username} ${user.email}`.toLowerCase();

        if (searchstate.indexOf(value) !== -1) {
          searchData.push(user);
        }

        setUserList(searchData);
      });
    }
  };

  useEffect(() => {
    fetchingData();
  }, []);

  //fetching data
  const fetchingData = () => {
    axios
      .get(`https://jsonplaceholder.typicode.com/users`)
      .then((response: AxiosResponse) => {
        setUserList(response.data);
      });
  };

  //click id
  const handleSend = (id: number) => {
    navigate(`./${id}`);
  };
  // sortName
  const sortName = () => {
    setsortAZ(!sortAZ);
    let sorted: getDataType[] | undefined = users?.sort((a, b) => {
      let nameA = a.name.toUpperCase();
      let nameB = b.name.toUpperCase();

      if (sortAZ) {
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
      } else {
        if (nameA < nameB) {
          return 1;
        }
        if (nameA > nameB) {
          return -1;
        }
      }

      return 0;
    });
    sorted && setUserList([...sorted]);
    console.log(sorted);
  };

  return (
    <div className="App">
      <input onChange={handleSearchChange} type={"search"} />
      <table>
        <tr>
          <th>№</th>
          <th onClick={sortName}>Name</th>
          <th>Username</th>
          <th>Phone</th>
          <th>Email</th>
          <th>Website</th>
        </tr>

        {users?.map((item, index) => {
          return (
            <tr onClick={() => handleSend(item.id)}>
              <td>{(index = index + 1)}</td>
              <td>{item?.name}</td>
              <td>{item?.username}</td>
              <td>{item?.phone}</td>
              <td>{item?.email}</td>
              <td>{item?.website}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default Home;
