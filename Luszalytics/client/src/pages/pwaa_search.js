import React , {useState, useEffect} from "react";
import axios from "axios";
import { AwesomeButton } from 'react-awesome-button';
import AwesomeButtonStyles from 'react-awesome-button/src/styles/styles.scss';
import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import { VictoryArea, VictoryChart, VictoryGroup, VictoryLabel, VictoryPolarAxis, VictoryTheme, VictoryPie } from 'victory';

// Offense, Defence, Penalty Diff, Finishing, Physicality, Production
 
const SearchPWAA = () => {
    const navigate = useNavigate();
    const [forwardData, setForwardData] = useState([]);
    const [defenceData, setDefenceData] = useState([]);
    const [goalieData, setGoalieData] = useState([]);
    const [pwaa, setPWAA] = useState(0);
    const [individualGoals, setIndividualGoals] = useState(0);
    const [individualPrimaryAssists, setindividualPrimaryAssists ] = useState(0);
    const [evXGoalsA, setevXGoalsA] = useState(0);
    const [pkXGoalsA, setpkXGoalsA] = useState(0);
    const [evChances, setEVChances] = useState(0);
    const [ppChances, setPPChances] = useState(0);
    const [penaltyDiff, setPenaltyDiff] = useState(0);
    const [defensiveActions, setDefensiveActions] = useState(0);
    const [finishing, setFinishing] = useState(0);
    const [highDanger, setHighDanger] = useState(0);
    const [mediumDanger, setMediumDanger] = useState(0);
    const [lowDanger, setLowDanger ] = useState(0);
    const [reboundControl, setReboundControl] = useState(0);
    const [gsae, setGSAE] = useState(0);
    const [position, setPosition] = useState('F');

    const [playerData1, setPlayerData1] = useState({"Offence": 0, "Production" : 0, "Finishing": 0, 
        "Defence": 0, "Penalties" : 0, "Physicality": 0, "PWAA": 0
    });

    const goTeamPWAA = () =>{
        navigate("/pwaa-team")
    }

    const goPWAAStatExplanations = () => {
        navigate("/pwaa-stat-explanations")
    }

    const goPlayersPWAA = () => {
        navigate("/pwaa-players")
    }

    const goPlayerComparisonPWAA = () => {
        navigate("/pwaa-player-comparison")
    }

    useEffect(() => {
        axios
        .get('/pwaa-forwards')
        .then(res => res.data)
        .then(forwardData => setForwardData(forwardData));
    }, []);

    useEffect(() => {
        axios
        .get('/pwaa-defence')
        .then(res => res.data)
        .then(defenceData => setDefenceData(defenceData));
    }, []);

    useEffect(() => {
        axios
        .get('/pwaa-goalies')
        .then(res => res.data)
        .then(goalieData => setGoalieData(goalieData));
    }, []);

    const updatePlayer1 = (playerName) => {
        const name = playerName.slice(0, -4);
        const position = playerName.slice(-2, -1);
        const data = forwardData.concat(defenceData, goalieData);
        const player = data.find((element) => element.name === name); 
        if (position === 'G'){
            setPlayerData1({"GSAE": player.GSAE_Ranking, "Low Danger": player.Low_Danger_Ranking, "Medium Danger": player.Medium_Danger_Ranking, "High Danger": player.High_Danger_Ranking,
                "Rebound Control": player.Rebound_Control_Ranking, "PWAA": player.PWAA_Ranking
            });
            setPWAA(player.PWAA);
            setGSAE(player.GSAE);
            setHighDanger(player.High_Danger);
            setLowDanger(player.Low_Danger);
            setMediumDanger(player.Medium_Danger);
            setReboundControl(player.Rebound_Control);
            setPosition('G');

            //reset skater stats
            setIndividualGoals(0);
            setindividualPrimaryAssists(0);
            setevXGoalsA(0);
            setFinishing(0);
            setpkXGoalsA(0);
            setEVChances(0);
            setPPChances(0);
            setPenaltyDiff(0);
            setDefensiveActions(0);
        } else {
            setPlayerData1({"Offence": player.Offence_Ranking, "Production" : player.Production_Ranking, "Finishing": player.Finishing_Ranking, 
                "Defence": player.Defence_Ranking, "Penalties" : player.Penalty_Ranking, "Physicality": player.Physicality_Ranking, "PWAA": player.PWAA_Ranking
            });
            setPWAA(player.PWAA);
            setIndividualGoals(player.Individual_Goals);
            setindividualPrimaryAssists(player.Individual_primaryAssists);
            setevXGoalsA(player.EV_xGoals_Against);
            setpkXGoalsA(player.PK_xGoals_Against);
            setEVChances(player.EV_Chances);
            setPPChances(player.PP_Chances);
            setPenaltyDiff(player.Penalty_Differential);
            setDefensiveActions(player.Defensive_Actions);
            setFinishing(player.Finishing);
            
            if (position === 'D'){
                setPosition('D')
            } else {
                setPosition('F');
            }
            // reset goalie stats
            setGSAE(0);
            setHighDanger(0);
            setLowDanger(0);
            setMediumDanger(0);
            setReboundControl(0);
        }
    }

    function processData(data) {
        const maxByGroup = 100;
        const makeDataArray = (d) => {
          return Object.keys(d).map((key) => {
            return { x: key, y: d[key] / maxByGroup };
          });
        };
        return data.map((datum) => makeDataArray(datum));
    }

    const getScaledData = (value, variable) => {
        var max;
        if (position === 'G'){
            max = Math.max(...goalieData.map(player => player[variable]));
        } else if (position === 'D') {
            max = Math.max(...defenceData.map(player => player[variable]));
        } else {
            max = Math.max(...forwardData.map(player => player[variable]));
        }
        var percentage = value / max;
        if (percentage > 0){
            console.log("max: " + max);
            console.log("percentage: " + percentage);
            return [{x: 1, y: percentage * 360}, {x:2, y: (360 - percentage * 360)}];
        } else {
            console.log("negative")
            console.log("max: " + max);
            console.log("percentage: " + percentage);
            percentage = percentage * -1;
            return [{x:1, y: (360 - percentage * 360)}, {x:2, y:percentage * 360}]
        }

    }

    const getColourScale = (value) => {
        if(value > 0){
            return ["blue", "grey"];
        } else {
            return ["grey", "red"];
        }
    }


    return (
        <div className={"Main Container"}>
            <div className="titleContainer">
                <div> Points Won Above Average - Search</div>
            </div>


            <div className="searchContainer">
                <Stack spacing={2} sx={{ width: 600 }}>
                    <Autocomplete
                        id="pwaa_search_box"
                        disableClearable
                        options={forwardData.concat(defenceData, goalieData).map((option) => option.name + " (" + option.position + ")")}
                        onChange={(event, data) => {
                            updatePlayer1(data);
                        }}
                        renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Search input"
                            InputProps={{
                            ...params.InputProps,
                            type: 'search',
                            }}
                        />
                        )}
                    />
                </Stack>
            </div>

            <div className="flexContainer">
                <div className="pieContainer">
                    <svg width={205} height={210}>
                        <VictoryPie
                            standalone={false}
                            colorScale={getColourScale(pwaa)}
                            width={200} height={200}
                            data={getScaledData(pwaa, 'PWAA')}
                            innerRadius={75} labelRadius={100}
                            style={{ labels: { display: 'none' } }}
                        />
                        <VictoryLabel
                            textAnchor="middle"
                            style={{ fontSize: 15 }}
                            x={100} y={100}
                            text={["PWAA", pwaa.toFixed(2)]}
                        />

                    </svg>
                    <svg width={205} height={210}>
                        <VictoryPie
                            standalone={false}
                            colorScale={getColourScale(position === 'G' ? gsae : individualGoals)}
                            width={200} height={200}
                            data={getScaledData(position === 'G' ? gsae : individualGoals, position === 'G' ? 'GSAE' : 'Individual_Goals')}
                            innerRadius={75} labelRadius={100}
                            style={{ labels: { display: 'none' } }}
                        />
                        <VictoryLabel
                            textAnchor="middle"
                            style={{ fontSize: 12.5 }}
                            x={100} y={100}
                            text={[position === 'G' ? 'GSAE' : "Individual Goals", position === 'G' ? gsae.toFixed(2) : individualGoals.toFixed(2)]}
                        />

                    </svg>

                    <svg width={205} height={210}>
                        <VictoryPie
                            standalone={false}
                            colorScale={getColourScale(position === 'G' ? lowDanger : individualPrimaryAssists)}
                            width={200} height={200}
                            data={getScaledData(position === 'G' ? lowDanger : individualPrimaryAssists, position === 'G' ? 'Low_Danger' :'Individual_primaryAssists')}
                            innerRadius={75} labelRadius={100}
                            style={{ labels: { display: 'none' } }}
                        />
                        <VictoryLabel
                            textAnchor="middle"
                            style={{ fontSize: 12.5 }}
                            x={100} y={100}
                            text={[position === 'G' ? 'Low Danger' : "Primary Assists", position === 'G' ? lowDanger.toFixed(2) : individualPrimaryAssists.toFixed(2)]}
                        />

                    </svg>

                    <svg width={205} height={210}>
                        <VictoryPie
                            standalone={false}
                            colorScale={getColourScale(position === 'G' ? mediumDanger : evXGoalsA)}
                            width={200} height={200}
                            data={getScaledData(position === 'G' ? mediumDanger : evXGoalsA, position === 'G' ? 'Medium_Danger' : 'EV_xGoals_Against')}
                            innerRadius={75} labelRadius={100}
                            style={{ labels: { display: 'none' } }}
                        />
                        <VictoryLabel
                            textAnchor="middle"
                            style={{ fontSize: 11 }}
                            x={100} y={100}
                            text={[position === 'G' ? "Medium Danger" : "EV xGoals Against", position === 'G' ? mediumDanger.toFixed(2) : evXGoalsA.toFixed(2)]}
                        />

                    </svg>


                    <svg width={205} height={210}>
                        <VictoryPie
                            standalone={false}
                            colorScale={getColourScale(position === 'G' ? highDanger : pkXGoalsA)}
                            width={200} height={200}
                            data={getScaledData(position === 'G' ? highDanger : pkXGoalsA, position === 'G' ? 'High_Danger' : 'PK_xGoals_Against')}
                            innerRadius={75} labelRadius={100}
                            style={{ labels: { display: 'none' } }}
                        />
                        <VictoryLabel
                            textAnchor="middle"
                            style={{ fontSize: 11 }}
                            x={100} y={100}
                            text={[position === 'G' ? 'High Danger' : "PK xGoals Against", position === 'G' ? highDanger.toFixed(2) :  pkXGoalsA.toFixed(2) === 0.00 ? 'N/A' : pkXGoalsA.toFixed(2)]}
                        />

                    </svg>

                    <svg width={205} height={210}>
                        <VictoryPie
                            standalone={false}
                            colorScale={getColourScale(position === 'G' ? reboundControl : evChances)}
                            width={200} height={200}
                            data={getScaledData(position === 'G' ? reboundControl : evChances, position === 'G' ? 'Rebound_Control' : 'EV_Chances')}
                            innerRadius={75} labelRadius={100}
                            style={{ labels: { display: 'none' } }}
                        />
                        <VictoryLabel
                            textAnchor="middle"
                            style={{ fontSize: 13 }}
                            x={100} y={100}
                            text={[position === 'G' ? 'Rebound Control' : "EV Chances", position === 'G' ? highDanger.toFixed(2) : evChances.toFixed(2)]}
                        />

                    </svg>
                    <svg width={205} height={210}>
                        <VictoryPie
                            standalone={false}
                            colorScale={getColourScale(ppChances)}
                            width={200} height={200}
                            data={getScaledData(ppChances, 'PP_Chances')}
                            innerRadius={75} labelRadius={100}
                            style={{ labels: { display: 'none' } }}
                        />
                        <VictoryLabel
                            textAnchor="middle"
                            style={{ fontSize: 13 }}
                            x={100} y={100}
                            text={[position === 'G' ? "" : "PP Chances", position === 'G' ? "" : ppChances.toFixed(2) === 0.00 ? 'N/A' : ppChances.toFixed(2)]}
                        />

                    </svg>

                    <svg width={205} height={210}>
                        <VictoryPie
                            standalone={false}
                            colorScale={getColourScale(penaltyDiff)}
                            width={200} height={200}
                            data={getScaledData(penaltyDiff, 'Penalty_Differential')}
                            innerRadius={75} labelRadius={100}
                            style={{ labels: { display: 'none' } }}
                        />
                        <VictoryLabel
                            textAnchor="middle"
                            style={{ fontSize: 14 }}
                            x={100} y={100}
                            text={[position === 'G' ? "" : "Penalties", position === 'G' ? "" : penaltyDiff.toFixed(2)]}
                        />

                    </svg>

                    <svg width={205} height={210}>
                        <VictoryPie
                            standalone={false}
                            colorScale={getColourScale(defensiveActions)}
                            width={200} height={200}
                            data={getScaledData(defensiveActions, 'Defensive_Actions')}
                            innerRadius={75} labelRadius={100}
                            style={{ labels: { display: 'none' } }}
                        />
                        <VictoryLabel
                            textAnchor="middle"
                            style={{ fontSize: 11 }}
                            x={100} y={100}
                            text={[position === 'G' ? "" : "Defensive Actions", position === 'G' ? "" : defensiveActions.toFixed(2)]}
                        />

                    </svg>

                    <svg width={205} height={210}>
                        <VictoryPie
                            standalone={false}
                            colorScale={getColourScale(finishing)}
                            width={200} height={200}
                            data={getScaledData(finishing, 'Finishing')}
                            innerRadius={75} labelRadius={100}
                            style={{ labels: { display: 'none' } }}
                        />
                        <VictoryLabel
                            textAnchor="middle"
                            style={{ fontSize: 14 }}
                            x={100} y={100}
                            text={[position === 'G' ? "" : "Finishing", position === 'G' ? "" : finishing.toFixed(2)]}
                        />

                    </svg>
                </div>

                <div className="radarContainer">
                    <VictoryChart polar
                        theme={VictoryTheme.material}
                        domain={{ y: [ 0, 1 ] }}
                    >
                    <VictoryGroup colorScale={["red", "blue"]}
                        style={{ data: { fillOpacity: 0.2, strokeWidth: 2 } }}
                    >
                        {processData([playerData1]).map((data, i) => {
                            return <VictoryArea key={i} data={data}/>;
                        })}

                    </VictoryGroup>
                        {
                            Object.keys(playerData1).map((key, i) => {
                                return (
                                <VictoryPolarAxis key={i} dependentAxis
                                    style={{
                                        axisLabel: { padding: 15},
                                        axis: { stroke: "none" },
                                        grid: { stroke: "grey", strokeWidth: 0.25, opacity: 0.5 }
                                    }}
                                    tickLabelComponent={
                                        <VictoryLabel style={{fontSize: 6}} labelPlacement="vertical"/>
                                    }
                                    labelPlacement="perpendicular"
                                    axisValue={i + 1} label={key}
                                    tickFormat={(t) => Math.ceil(t * 100)}
                                    tickValues={[0.25, 0.5, 0.75, 1]}
                                />
                                );
                            })
                        }
                        <VictoryPolarAxis
                            labelPlacement="parallel"
                            tickFormat={() => ""}
                            style={{
                                axis: { stroke: "none" },
                                grid: { stroke: "grey", opacity: 0.5 }
                            }}
                        />

                        </VictoryChart>
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
                // onPress={onButtonClick}
                > Search Player or Team </AwesomeButton> 
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
 
export default SearchPWAA;