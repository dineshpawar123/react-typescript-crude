import { AllUserProps } from "../types/allUsersType";
import {useState,useEffect, SetStateAction, Dispatch} from "react";
import CreateEditUser from "./CreateEditUser";


type AllUserPropsNew = {
  users: AllUserProps[];
  setAllUser:Dispatch<SetStateAction<AllUserProps[]>>
};

function AllUser(props: AllUserPropsNew) {
    const [userAction, setuserAction] = useState<string>('');
    const [selectedRecord, setSelectedRecord] = useState<AllUserProps>({
      body: '',
      id: 0,
      title: '',
      userId: 0
    })

    
    const users =props.users;
    
    const updateRecord = (data: AllUserProps) => {
    setuserAction('edit')
    setSelectedRecord(data)

    // fetch(`https://jsonplaceholder.typicode.com/posts/${data.id}`, {
    //   method: "PUT",
    //   body: JSON.stringify({
    //     id: data.id,
    //     title: data.title,
    //     body: data.body,
    //     userId: data.userId,
    //   }),
    //   headers: {
    //     "Content-type": "application/json; charset=UTF-8",
    //   },
    // })
    //   .then((response) => {
    //     alert("updateRecord successfully");
    //     response.json();
    //   })
    //   .then((json) => console.log(json));
  };

  const DeleteRecord = (data: AllUserProps) => {

    props.setAllUser(users.filter((value:any)=>  value?.id != data?.id ?  value:null
    ))

    // fetch(`https://jsonplaceholder.typicode.com/posts/${data.id}`, {
    //   method: "DELETE",
    // })
    //   .then((response) => {
    //     alert("Record Deleted Successfully");
    //     response.json();
    //   })
    //   .then((json) => console.log(json));
  };

  const handleCreateUser = () => {
    setSelectedRecord({
      body: '',
      id: 0,
      title: '',
      userId: 0
    })
    setuserAction('create')
  };

  return (
    <div className="m-4">
         <button
        type="button"
        className="btn btn-primary"
        data-toggle="modal"
        data-target="#exampleModal"
        onClick={() => handleCreateUser()}
        style={{float:'right',margin:'20px'}}
      >
      +  Create New User..
      </button>
      <table>
        <tbody>
        <tr>
          <th style={{ textAlign: "center" }}>User Id</th>
          <th style={{ textAlign: "center" }}>Title </th>
          <th style={{ textAlign: "center" }}>Description</th>
          <th>Operations</th>
        </tr>
        {props.users &&
          props.users.map((data, index) => {
            return (
              <tr key={index}>
                <td style={{ textAlign: "center" }}>{data?.userId}</td>
                <td style={{ textAlign: "center" }}>{data?.title}</td>
                <td style={{ textAlign: "center" }}>{data?.body}</td>
                <td style={{ textAlign: "center", display: "flex" }}>
                  <i className="bi bi-pen"></i>

                  <button
                    className="btn btn-primary m-1"
                    data-toggle="modal"
                    data-target="#exampleModal"
                    onClick={() =>
                       updateRecord(data)
                    }
                  > 
                    Edit
                  </button>
                  <button
                    className="btn btn-danger m-1"
                    onClick={() => DeleteRecord(data)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
          </tbody>
      </table>
      <CreateEditUser userAction={userAction} selectedRecord={selectedRecord} users={users} setAllUser={props.setAllUser}/>
    </div>
  );
}

export default AllUser;
