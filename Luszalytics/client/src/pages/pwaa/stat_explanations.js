import React from "react";
import { AwesomeButton } from 'react-awesome-button';
import AwesomeButtonStyles from 'react-awesome-button/src/styles/styles.scss';
import { useNavigate } from "react-router-dom";

const StatExplanations = () => {
    const navigate = useNavigate();

    const goTeamPWAA = () =>{
        navigate("/pwaa-team")
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
                <div> PWAA Stat Explanations</div>
            </div>
            <div className="textContainer">
                <div> With these statistic we consider 0 to be league average, anything below 0 and that player is actively hurting
                    your favourite team, and anything above 0 means that the player is contributing to their team's success. For example, when calculating Individual_Goals, we take the amount of goals
                    a player scored, divide that by the number of seconds played to get goals/second, subtract the average player's goals/second, and re-muliply 
                    the number of seconds played. This way, we know that if player x's Individual_Goals is 0, then the average nhl player would score the same amount
                    of goals given the same minutes (Even-strength (EV), Power play (PP), and Penalty kill (PK)). Similarly, if player x's Individual_Goals is 10
                    then they scored 10 more goals than the average player would in their position.
                </div>
                <br/>
                <div style={{justifyContent:"left", display:"flex"}}>
                    Main Stats for PWAA:
                </div>
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
                <br/>
                <div>
                    Other Stats:
                </div>
                <ul>
                    <li>Individual_secondaryAssists: The amount of secondary assists scored above average</li>
                    <li>Production: The sum of Individual_Goals, Individual_primaryAssists, and Individual_secondaryAssists to get a total points produced above average</li>
                    <li>EV_differential: Even strength +/- above average</li>
                    <li>PP_differential: Power Play +/- above average</li>
                    <li>PK_differential: Penalty Kill +/- above average</li>
                    <li>Finishing: How well a player finsihes their chances above average in all situations (goals - xGoals)</li>
                    <li>Physicality: Amount of hits a player/team makes above average</li>
                    <li>EV_HighDangerAgainst: Number of high danger shots and xGoals given up at even strength above average</li>
                    <li>PK_HighDangerAgainst: Number of high danger shots and xGoals given up on the penalty kill above average</li>
                    <li>High_Danger_Chances_For: Number of high danger shots and xGoals created in all situations</li>
                    <li>gameScore: gameScore stat developed by Dom luszczynsyn from the Athletic</li>
                    <li>Rebound_Control - Goalies: Number of rebounds a goalie gives up in all situations</li>
                    <li>Medium_Danger - Goalies: Medium danger xGoals minus medium danger goals given up above average </li>
                </ul>
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
                // onPress={onButtonClick}
                > Stat Explanations </AwesomeButton> 
            </div>

        </div>
    );
};
 
export default StatExplanations;