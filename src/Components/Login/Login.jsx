import { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from "../../Providers/AuthProvider";

import auth from "../../firebase/firebase.config";


const Login = () => {

const handleGoogleSignIn =() =>{
  signInWithGoogle()
  .then(result=>{
    console.log(result.user)
  })
  .catch(error =>{
    console.log(error);
  })
}

  
  const navigate = useNavigate();

    const emailRef = useRef(null)

    const handleForgetPassword = e =>{
        const email = emailRef.current.value;

        if(!email){
setLoginError('Please enter an email address')
            return;
        }
        else if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)){
          setLoginError('Please enter a valid email address')
            return;
        }


        resetPass(email)
        .then(result =>{
            alert('Please check your email')
        })
        .catch(error =>{
            alert(error)
        })

    }

    const {resetPass} = useContext(AuthContext)

    const [loginError, setLoginError] = useState('')

    const [success, setSuccess] =useState('')

    const {signIn, signInWithGoogle} = useContext(AuthContext)

    const [showPassword, setShowPassword] =useState(false)

    const handleLogin = e =>{
        e.preventDefault();

        const name = e.target.name.value;

        const email = e.target.email.value;

        const password = e.target.password.value;

        console.log(name, email, password)


        // reset success
        setSuccess('')
        setLoginError('')


        signIn(email, password)
        .then(result =>{
            console.log(result.user)
         if(result.user.emailVerified){
            setSuccess('User Logged in Successfully')
            e.target.reset();
            navigate('/')
         }
         else{
            setLoginError('Please Verify your email address')
         }
         
        })
        .catch(error =>{
            console.log(error)
            setLoginError(error.message)
        })

    };

    return (
        <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col ">
          <div className="text-center ">
            <h1 className="text-5xl font-bold">Login Now!</h1>
            
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form onSubmit={handleLogin} className="card-body">
              
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold font-work">Email</span>
                </label>
                <input type="email" placeholder="Email Address" className="input input-bordered" required name="email"
                ref={emailRef}
                 />
              </div>
              <div className="relative">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold font-work">Password</span>
                </label>
                <input type={showPassword ? "text" : "password"}
                 placeholder="password"
                  className="input input-bordered"
                   required
                    name="password"

                     />

<span className='absolute top-[52px] left-[200px]' onClick={()=>setShowPassword(!showPassword)}>
    {
        showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>
    }
    </span>
              </div>

                <label className="label">
                  <a onClick={handleForgetPassword} href="#" className="label-text-alt link link-hover font-bold font-work">Forgot password?</a>
                </label>
                <p className="font-work text-xs">New to this web? Please <button className="btn btn-link font-work text-xs text-rose-500"><Link to="/register">Register</Link></button> </p>
              </div>

{/* Continue With Google Button */}
<div>
            <span className='font-work font-semibold'>Contintu with <button onClick={handleGoogleSignIn} className='btn btn-link '><Link>Google</Link></button></span>
          </div>

              {
                success && <p className="text-green-500 font-work font-semibold">{success}</p>
              }
              {
                loginError && <p className="text-red-500 font-work font-semibold">{loginError}</p>
              }
              <div className="form-control mt-6">
                <button className="btn btn-primary font-bold font-work bg-rose-500">Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
};

export default Login;