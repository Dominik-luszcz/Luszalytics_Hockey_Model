import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AwesomeButton } from 'react-awesome-button';
import AwesomeButtonStyles from 'react-awesome-button/src/styles/styles.scss';

const Signup = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [reEnterPassword, setReEnterPasswordError] = useState('')

  const navigate = useNavigate()

  const onButtonClick = () => {
    // Set initial error values to empty
    setEmailError('')
    setPasswordError('')
    setReEnterPasswordError('')
  
    // Check if the user has entered both fields correctly
    if ('' === email) {
      setEmailError('Please enter your email')
      return
    }
  
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError('Please enter a valid email')
      return
    }
  
    if ('' === password) {
      setPasswordError('Please enter a password')
      return
    }
  
    if (password.length < 7) {
      setPasswordError('The password must be 8 characters or longer')
      return
    }

    if (password != reEnterPassword){
        setReEnterPasswordError("The passwords do not match")
        return
    }
  
    // Authentication calls will be made here...
  }

  return (
    <div className={'mainContainer'}>
      <div className={'titleContainer'}>
        <div>Sign Up!</div>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input
          value={email}
          placeholder="Enter your email here"
          onChange={(ev) => setEmail(ev.target.value)}
          className={'inputBox'}
        />
        <label className="errorLabel">{emailError}</label>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input
          value={password}
          placeholder="Enter your password here"
          onChange={(ev) => setPassword(ev.target.value)}
          className={'inputBox'}
        />
        <label className="errorLabel">{passwordError}</label>
      </div>
      <div className={'inputContainer'}>
        <input
          value={reEnterPassword}
          placeholder="Please re-enter your password here"
          onChange={(ev) => setReEnterPassword(ev.target.value)}
          className={'inputBox'}
        />
        <label className="errorLabel">{reEnterPasswordError}</label>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input className={'inputButton'} type="button" onClick={onButtonClick} value={'Sign Up!'} />
      </div>
    </div>
  )
}

export default Signup