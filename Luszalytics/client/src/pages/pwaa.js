import React from "react";
import { AwesomeButton } from 'react-awesome-button';
import AwesomeButtonStyles from 'react-awesome-button/src/styles/styles.scss';
import { useNavigate } from "react-router-dom";
 
const PWAA = () => {
    const navigate = useNavigate();

    const goTeamPWAA = () =>{
        navigate("/pwaa-team")
    }

    const goPWAAStatExplanations = () => {
        navigate("/pwaa-stat-explanations")
    }

    const goPlayersPWAA = () => {
        navigate("/pwaa-players")
    }

    const goSearchPWAA = () => {
        navigate("/pwaa-search")
    }

    const goPlayerComparisonPWAA = () => {
        navigate("/pwaa-player-comparison")
    }

    return (
        <div className={"Main Container"}>
            <div className="titleContainer">
                <div> Points Won Above Average</div>
            </div>
            <div className="textContainer">
                <div> Points Won Above Average (PWAA) is a stat used to determine how many points a player contributes to their
                    team's standing. So, with this statistic we consider 0 to be league average, anything below 0 and that player is actively hurting
                    your favourite team, and anything above 0 means that the player is contributing to their team's success. 
                    In order to calculate this, we need "above average" statistics. For example, when calculating Individual_Goals, we take the amount of goals
                    a player scored, divide that by the number of seconds played to get goals/second, subtract the average player's goals/second, and re-muliply 
                    the number of seconds played. This way, we know that if player x's Individual_Goals is 0, then the average nhl player would score the same amount
                    of goals given the same minutes (Even-strength (EV), Power play (PP), and Penalty kill (PK)). Similarly, if player x's Individual_Goals is 10
                    then they scored 10 more goals than the average player would in their position. So, in order to calculate PWAA, we consider the following "above average" statistics:
                </div>
                <br/>
                <ul>
                    <li>Individual_Goals: The amount of goals scored above average</li>
                    <li>Individual_primaryAssists: The amount of primary assists scored above average</li>
                    <li>EV_xGoals_Against: The amount of even-strength expected goals given up above average</li>
                    <li>PK_xGoals_Against: The amount of penalty kill expected goals given up above average</li>

                    <li>EV_Chances: The amount of even-strength expected goals created above average</li>
                    <li>PP_Chances: The amount of power play excected goals created above average</li>
                    <li>Penalty_Differential: The amount of penalties drawn - penalties taken above average</li>
                    <li>Defensive_Actions: The amount of shot blocks and takeaways above average</li>
                    <li>High_Danger - Goalies: High danger xGoals minus high danger goals given up above average </li>
                    <li>Low_Danger - Goalies: Low danger xGoals minus low danger goals given up above average </li>
                    <li>GSAE - Goalies (Goals Saved Above Expected): The amount of goals saved compared to xGoals above average</li>
                </ul>
                <div>
                    To get the coefficients of these variables, we sum up every player's above average stats for each NHL team. Afterwards, we run a cross-validated ridge regression
                    with each team's regular season point total as the target. With the coefficients from the regression we can now calculate the PWAA for each player.
                </div>
            </div>
            <div className="buttonContainer">
                <AwesomeButton
                    cssModule={AwesomeButtonStyles}
                    type="primary"
                    onPress={goTeamPWAA}
                > View Team's PWAA </AwesomeButton> 
                <AwesomeButton
                    cssModule={AwesomeButtonStyles}
                    type="primary"
                    onPress={goPlayersPWAA}
                > View All Players </AwesomeButton> 
                <AwesomeButton
                    cssModule={AwesomeButtonStyles}
                    type="primary"
                    onPress={goSearchPWAA}
                > Search Player </AwesomeButton> 
                <AwesomeButton
                    cssModule={AwesomeButtonStyles}
                    type="primary"
                    onPress={goPlayerComparisonPWAA}
                >  Player Comparison </AwesomeButton> 
                <AwesomeButton
                    cssModule={AwesomeButtonStyles}
                    type="primary"
                    onPress={goPWAAStatExplanations}
                > Stat Explanations </AwesomeButton> 
            </div>

        </div>
    );
};
 
export default PWAA;