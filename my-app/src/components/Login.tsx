import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "./Auth";
import { Redirect } from "react-router-dom";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const auth = useAuth();
  const [error, setError] = useState({emailError:'',passwordError:'',setErrorInHeader:''});

  if (localStorage.getItem("token")) {
    history.replace("/home");
  }

  async function loginUser(event: any) {
    event.preventDefault();
    setError({...error,setErrorInHeader:''});

  if(email && password)
  {

    const response = await fetch("http://localhost:1337/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    console.log("response", response);
    const data = await response.json();
    console.log("data", data);
    if (data.user) {
      localStorage.setItem("token", data.user);
      auth.login(data.user);
    //   alert("Login successful");
      history.replace("/home");
    } else {
      setError({...error,setErrorInHeader:'Please Enter Valid User Name and Password',emailError:'',passwordError:''});
      // if
      // alert("Please check your username and password");
    }
  }
  else{
    let emailError= email== '' ? 'Please Enter Email':'';
    let passwordError= password == '' ? "Please Enter Password":'';
    setError({...error,setErrorInHeader:'',emailError,passwordError});
    
  }
}

const showErrorMessage = (error:string)=>{
return <p style={{color:'red'}}>{error}</p>
}

  return (
    <div style={{ width: "50%", margin: "auto", marginTop: "4%"}}>
		<img width="240" height="240" style={{position:'relative',right:'-350px'}} src="data:image/jpeg;base64,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"></img>
      <br/><br/>
	  <form onSubmit={loginUser}>
      {showErrorMessage(error.setErrorInHeader)}
        <div className="form-outline mb-4">
          <input
            type="email"
            id="form2Example1"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
                  {error.passwordError ? showErrorMessage(error.passwordError) :''}
        </div>

        <button
          type="submit"
          value="Login"
          className="btn btn-primary btn-block mb-4"
        >
          Sign in
        </button>

        <div className="text-center">
          <p>
            Not a member?{" "}
            <a href="#!">
              <div onClick={() => history.replace("/register")}>Register</div>
            </a>
          </p>

          <button type="button" className="btn btn-link btn-floating mx-1">
            <i className="fab fa-facebook-f"></i>
          </button>

          <button type="button" className="btn btn-link btn-floating mx-1">
            <i className="fab fa-google"></i>
          </button>

          <button type="button" className="btn btn-link btn-floating mx-1">
            <i className="fab fa-twitter"></i>
          </button>

          <button type="button" className="btn btn-link btn-floating mx-1">
            <i className="fab fa-github"></i>
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
