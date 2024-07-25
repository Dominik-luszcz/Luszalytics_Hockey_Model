import React from "react";
import { useNavigate } from 'react-router-dom'
import { AwesomeButton } from 'react-awesome-button';
import AwesomeButtonStyles from 'react-awesome-button/src/styles/styles.scss';


 
const Home = (props) => {
    const { loggedIn, email } = props
    const navigate = useNavigate()

    const onButtonClick = () => {
        // You'll update this function later
      }

    
    return (
        <div className="mainContainer" style={{display:"flex", justifyContent: "center"}}>
            <div className={'titleContainer'} style={{fontSize: "48px"}}>
                <div>Welcome to Luszalytics! </div>
            </div>

            <div style={{paddingTop:"3%", fontSize:"22px"}}>Learn about the best hockey players according to analytics and machine learning! (all data is taken from moneypuck.com)</div>

            <div className={'buttonContainer'} style={{display:"flex"}}>
            {/* <AwesomeButton
                cssModule={AwesomeButtonStyles}
                className={'logInButton'}
                type="primary"
                onPress={onButtonClick}
                // value={loggedIn ? 'Log out' : 'Log in'}
            > Log In or Sign Up! </AwesomeButton> */}
            {/* {loggedIn ? <div>Your email address is {email}</div> : <div />} */}
            </div>
      </div>
    );
};
 
export default Home;