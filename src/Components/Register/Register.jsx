import { Link } from 'react-router-dom';
import './Register.css'
import { useContext, useState } from 'react';
import { AuthContext } from '../../Providers/AuthProvider';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { sendEmailVerification } from 'firebase/auth';

const Register = () => {
// 1.
    const [registerError, setRegisterError] = useState('');

// 2.
    const {creatUser}= useContext(AuthContext);

// 3.
    const handleRegister = e =>{
        e.preventDefault();

        const name = e.target.name.value;

        const email = e.target.email.value;

        const password = e.target.password.value;

        const accepted = e.target.terms.checked

        console.log(name, email, password)

        // reset error and success
        setRegisterError('');
        setSuccess('');

        if(password.length < 6){
            setRegisterError('Password should be at least 6 characters or longer');
            return;
        }
        else if(!/[A-Z]/.test(password)){
            setRegisterError('Include at least one uppercase character');
            return;
        }
        else if(!accepted){
          setRegisterError("Please accept our terms and conditions");
          return;
        }
        


        // creat user in firebase
        creatUser(email, password)
       .then(result =>{
        console.log(result.user)
        setSuccess("User Created Successfully")
        sendEmailVerification(result.user)
        .then(()=>{
            alert("Please check your email and verify your account")
        })
        
       })
       .catch(error =>{
        console.error(error)
        setRegisterError("This email already in use")
       })


    };

    // 4.
    const [success, setSuccess] = useState('');

    // 5.
    const [showPassword, setShowPassword] =useState(false)


    return (
        <div className="hero bg-base-200 min-h-screen">
  <div className="hero-content flex-col ">
    <div className="text-center ">
      <h1 className="text-5xl font-bold">Register Now!</h1>
      
    </div>
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <form onSubmit={handleRegister} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text font-bold font-work">Name</span>
          </label>
          <input type="text" placeholder="Your Name" className="input input-bordered"  name="name" />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text font-bold font-work">Email</span>
          </label>
          <input type="email" placeholder="Email Address" className="input input-bordered" required name="email" />
        </div>
        <div className='relative'>
        <div className="form-control">
          <label className="label">
            <span className="label-text font-bold font-work">Password</span>
          </label>
        
        <input type={showPassword ? "text" : "password" } placeholder="password" className="input input-bordered" required
           name="password" />

<span className='absolute top-[52px] left-60' onClick={()=>setShowPassword(!showPassword)}>
   {
    showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>
   }
    </span>

<div className='flex mt-2 gap-2 font-work font-semibold'>
    <input type="checkbox" name="terms" id="" />
    <p>Accept our<Link to="/terms"><button className='btn btn-link'>Terms and Conditions</button></Link> </p>
</div>

        </div>
        

          <label className="label">
            <a href="#" className="label-text-alt link link-hover font-bold font-work">Forgot password?</a>
          </label>
          <p className='font-work text-xs'>Already Have an Account? Please <button className='btn btn-link  text-xs text-rose-500'><Link to="/login">Login</Link></button> </p>




{
  registerError && <p className='text-red-700 font-work font-semibold'>{registerError}</p>  
}
{
    success && <p className='text-green-700 font-work font-semibold'>{success}</p>
}

        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary font-bold font-work bg-rose-600">Register</button>
        </div>
      </form>
    </div>
  </div>
</div>
    );
};

export default Register;