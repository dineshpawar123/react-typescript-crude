
import { FormEvent, useState, useEffect, SetStateAction, Dispatch } from "react";
import { AllUserProps } from "../types/allUsersType";

function CreateUser({ userAction, selectedRecord, users, setAllUser }: { userAction: string, selectedRecord: AllUserProps, users: AllUserProps[], setAllUser: Dispatch<SetStateAction<AllUserProps[]>> }) {

  const [createNewUser, setCreateNewUser] = useState<AllUserProps>({ id: '', userId:'' , title: '', body: '' });
  const [showWarningMessage, setshowWarningMessage] = useState<string>('')
  const [showSuccessMessage, setshowSuccessMessage] = useState<boolean>(false);

  useEffect(() => {
    const { id, userId, title, body } = selectedRecord;
    let idNew = id;
    let userIdNew = userId;
    let titleNew = title;
    let bodyNew = body

    if (userAction === 'edit')
      setCreateNewUser({ id: idNew, userId: userIdNew, title: titleNew, body: bodyNew })

    return () => {
    }
  }, [selectedRecord])

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (userAction === 'edit') {
      setAllUser(users.map((value) => value.id === createNewUser.id ? {
        id: createNewUser.id,
        title: createNewUser.title,
        body: createNewUser.body,
        userId: createNewUser.userId,
      } : value))
      setshowSuccessMessage(true)
      setTimeout(() => {
        setshowSuccessMessage(false)
      }, 2000)


      return;
    }

    if (createNewUser.userId && createNewUser.title && createNewUser.body) {
      console.log("users", users)

      setAllUser([...users, {
        id: 99,
        title: createNewUser.title,
        body: createNewUser.body,
        userId: createNewUser.userId,
      }])
      setshowSuccessMessage(true)
      setTimeout(() => {
        setshowSuccessMessage(false)
      }, 2000)
    }
    else {
      setshowWarningMessage('ALL Fields are compulsory')
      setTimeout(() => {
        setshowWarningMessage('')
      }, 2000)
    }

    // fetch("https://jsonplaceholder.typicode.com/posts", {
    //     method: "POST",
    //     body: JSON.stringify({
    //       title:createNewUser.title,
    //       body: createNewUser.body,
    //       userId: createNewUser.userId,
    //     }),
    //     headers: {
    //       "Content-type": "application/json; charset=UTF-8",
    //     },
    //   })
    //     .then((response) => {
    //       response.json();
    //       setCreateNewUser({userId:0,title:'',body:''})
    //       alert("user created succesfully");
    //       // setShowPopUP(false)
    //     })
    //     .then((json) => console.log(json));}
    //     else{
    //       console.log("====")
    //       setshowWarningMessage('ALL Fields are compulsory')
    //     }

  };

  const showSuccessMessageOnUI = () => {
    if (showSuccessMessage && userAction == 'edit') return 'User Updated Successfully'

    if (showSuccessMessage && userAction == 'create') return 'User Created Successfully'

  }

  return (
    <div>
      {
        <div
          className="modal fade"
          id="exampleModal"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <form onSubmit={(e) => submitHandler(e)}>
              <div className="modal-content"  >
                <div className="modal-header">
                  <h5 className="modal-title text-center text-primary " id="exampleModalLabel">
                    { userAction =='create' ?  'Create New User':'Edit Current User'}
                  </h5>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  {showWarningMessage ? <div style={{ color: 'red' }}>{showWarningMessage}</div> : ''}

                  {userAction == 'create' && <div className="mb-3">
                    <label className="form-label">Id</label>
                    <input
                      value={createNewUser.id}
                      type="number"
                      className="form-control"
                      id="userid"
                      placeholder="0"
                      onChange={(e) => {
                        console.log("=>", e.target.value)
                        setCreateNewUser({ ...createNewUser, id: Number(e.target.value) })
                      }}
                    />
                  </div>}
                  <div className="mb-3">
                    <label className="form-label">User Id</label>
                    <input
                      value={createNewUser.userId}
                      type="number"
                      className="form-control"
                      id="userid"
                      placeholder="0"
                      onChange={(e) => {
                        console.log("=>", e.target.value)
                        setCreateNewUser({ ...createNewUser, userId: Number(e.target.value) })
                      }}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" value={createNewUser.title}
                      onChange={(e) => setCreateNewUser({ ...createNewUser, title: e.target.value })}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Description</label>
                    <input
                      type="text"
                      className="form-control"
                      id="description"
                      value={createNewUser.body}
                      onChange={(e) => setCreateNewUser({ ...createNewUser, body: e.target.value })}
                    />
                  </div>
                  <div style={{textAlign:'center',color:'green'}}>{showSuccessMessageOnUI()}</div>

                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Save changes
                  </button>
                </div>
              </div>

            </form>
          </div>
        </div>
      }
    </div>
  );
}

export default CreateUser;
