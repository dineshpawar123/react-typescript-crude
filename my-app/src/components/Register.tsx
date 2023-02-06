import { useState } from "react";
import { useHistory } from "react-router-dom";

function Register() {
  const history = useHistory();
  // const navigate =useNavigate()

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState({nameError:'',emailError:'',passwordError:'',setErrorInHeader:''});
  // if (localStorage.getItem("token")) {
  //   history.replace("/home");
  // }

  async function registerUser(event: any) {
    event.preventDefault();
    setError({...error,setErrorInHeader:''});

    if(name && email && password)
    {
    const response = await fetch("http://localhost:1337/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    const data = await response.json();
	  console.log("out")

    if (data.status == "ok") {
		console.log("in")
		window.location.href = '/'
    }
    else{
      let setErrorInHeader = data.error == 'Duplicate email' ? 'User already exist' : 'Registration Unsuccessful'
      setError({...error,setErrorInHeader,nameError:'',emailError:'',passwordError:''});
    }

  }
  else{
    let nameError = name == '' ? 'Please Enter Name':'';
    let emailError = email == '' ? "Please Enter Email":'';
    let passwordError = password == '' ? "Please Enter Password":'';

    setError({...error,nameError,emailError,passwordError});
  }

  }

  const showErrorMessage = (error:string)=>{
    return <p style={{color:'red'}}>{error}</p>
    }

  return (
    <div>
      <div style={{ width: "50%", margin: "auto", marginTop: "4%" }}>
	  <img width="540" height="240" style={{position:'relative',right:'-190px'}} src=" https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRW8CFF28Ro_ZTasgLbJNUl8gsJQ-M35MxG4g&usqp=CAU"></img>
      <br/><br/>
	 
        <form onSubmit={registerUser}>
          {showErrorMessage(error.setErrorInHeader)}
          <div className="form-outline mb-4">
            <input
              type="name"
              id="form2Example1"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
            />
               {error.nameError ? showErrorMessage(error.nameError) :''}
          </div>
          <div className="form-outline mb-4">
            <input
              id="form2Example1"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
            />
               {error.emailError ? showErrorMessage(error.emailError) :''}
          </div>

          <div className="form-outline mb-4">
            <input
              type="password"
              id="form2Example2"
              className="form-control"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
               {error.passwordError ? showErrorMessage(error.passwordError) :''}
          </div>
          <button
            type="submit"
            value="Login"
            className="btn btn-primary btn-block mb-4"
          >
            Sign up
          </button>
        </form>
      </div>

      {/* <h1>Register</h1>
      <form onSubmit={registerUser}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Name"
        />
        <br />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
        />
        <br />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />
        <br />
        <input type="submit" value="Register" />
      </form> */}
    </div>
  );
}

export default Register;
