import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useNavigate } from "react-router-dom";
import { checkLogin } from './base_url';
import { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { firebaseConfig } from './firebaseConfig';

let Header = () => {
    const navigate = useNavigate();
    const app = initializeApp(firebaseConfig);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const auth = getAuth();
 console.log(app);
    let [isLogin] = useState(checkLogin());
    let success = (credentialResponse) => {
        try{
          let token = credentialResponse.credential;
            localStorage.setItem('oauth_token', token);
            window.location.assign("/menu");
            //token = jwtDecode(token);
            //console.log(token);
        } catch(error) {
            alert('Login Failed')
        }
    };
    let error = () => {
          console.log('Login Failed')
        };

    let logout = () => {
      localStorage.removeItem('oauth_token');
      window.location.assign('/')
    };

    const  emailOnChangeHandler = (e) => {
      setEmail(e.target.value)
    }
    const passwordOnChangeHandler = (e) => {
      setPassword(e.target.value)
    }
   const onSignInClickHandler = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
    .then (auth => {
      if(auth){
        navigate('/menu');
      }
    })
    .catch(error => alert(error));
   }
   
    return (
    <>
    <GoogleOAuthProvider clientId="746171883343-7hqtvj9433hu1maptbovq590498bsvp6.apps.googleusercontent.com">
    <div className="modal fade" 
         id="loginModal" 
         tabIndex="-1" 
         aria-labelledby="exampleModalLabel" 
         aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-tle d-flex justify-content-start" 
                id="exampleModalLabel"> Login </h5>
            <button type="button" 
                    className="btn-close" 
                    data-bs-dismiss="modal" 
                    aria-label="Close"> </button>
          </div>
          <div className="modal-body d-flex justify-content-center">
          <GoogleLogin onSuccess= {success}
                       onError={error}/>

          </div>
        </div>
      </div>
    </div>
    </GoogleOAuthProvider>
    <main className="container-fluid">
        <div className="row bar mb-4 ">
        <nav className="col-11 col-lg-11 m-auto d-flex justify-content-end py-3">
         
          <div>
            {isLogin ?
               ( <>
                  <span className=' loged-in fw-semibold text-light'>Welcome {isLogin.name}</span>
                   <button className='btn btn-sm btn-danger'
                           onClick={logout}>
                            Log out
                   </button></>  
                )  :  (<> 
                   <button className="btn text-white" 
                            data-bs-toggle="modal"
                            data-bs-target="#loginModal">
                                Login 
                   </button>
                    <button className="btn btn-outline-light" 
                            data-bs-toggle="modal" 
                            data-bs-target="#staticBackdrop">
                        Create an account 
                    </button> 
                    <div className="modal fade" 
                         id="staticBackdrop" 
                         data-bs-backdrop="static" 
                         data-bs-keyboard="false" 
                         tabIndex="-1" 
                         aria-labelledby="staticBackdropLabel" 
                         aria-hidden="true">
                   <div className="modal-dialog">
                   <div className="modal-content">
                   <div className="modal-header">
                   <h1 className="modal-title ms-0" 
                       id="staticBackdropLabel">  Sign In </h1>
                  <button type="button" 
                          className="btn-close" 
                          data-bs-dismiss="modal" 
                          aria-label="Close">  </button>
                  </div>
                  <div className="createAccout">
                  <form className='createAcc'>
                  <label htmlFor="email" 
                        className="form-label fw-semibold">Enter Your Email-ID</label>
                  <input className='Email' 
                         placeholder="Email"
                         value={email}
                         onChange={emailOnChangeHandler} 
                         type="email" 
                         style={{padding: '5px'}}/>
                  <label htmlFor="Password" 
                         style={{marginTop:'19px'}}
                         className="form-label fw-semibold">Enter your Password</label>
                  <input className='Password' 
                         placeholder="Password"
                         value={password} 
                         onChange={passwordOnChangeHandler}
                         type="password" 
                         style={{padding: '5px'}}/>
                  <button className='Submit' 
                          type="submit" 
                          onClick={onSignInClickHandler}
                          style={{  color: 'whitesmoke',backgroundColor: 'red', transition: 'all 0.2s',padding: '8px', border:'none', borderRadius: '3px', marginRight: '130px', marginLeft: '130px', marginTop:'30px', marginBottom: '35px'}}>   Sign In  </button>
                </form>
                  </div>
                 </div>
                 </div>
                 </div> 
                 </>
                  )}
          </div>
         
        </nav>
        </div>
    </main>    
    
    </>
    );
};
   

export default Header;