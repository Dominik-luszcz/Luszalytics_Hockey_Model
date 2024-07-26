import React , {useState, useEffect} from "react";
import axios from "axios";
import { AwesomeButton } from 'react-awesome-button';
import AwesomeButtonStyles from 'react-awesome-button/src/styles/styles.scss';
import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import { VictoryArea, VictoryChart, VictoryGroup, VictoryLabel, VictoryPolarAxis, VictoryTheme } from 'victory';

// Offense, Defence, Penalty Diff, Finishing, Physicality, Production
 
const PlayerComparisonPWAA = () => {
    const navigate = useNavigate();
    const [forwardData, setForwardData] = useState([]);
    const [defenceData, setDefenceData] = useState([]);
    const [goalieData, setGoalieData] = useState([]);
    const [position, setPosition] = useState('F');
    // const [playerName1, setPlayerName1] = useState('');
    // const [playerName2, setPlayerName2] = useState('');
    const [playerData1, setPlayerData1] = useState({"Offence": 0, "Production" : 0, "Finishing": 0, 
        "Defence": 0, "Penalties" : 0, "Physicality": 0, "PWAA": 0
    });
    const [playerData2, setPlayerData2] = useState({"Offence": 0, "Production" : 0, "Finishing": 0, 
        "Defence": 0, "Penalties" : 0, "Physicality": 0, "PWAA": 0
    });

    //const skaterLabels = ["Offence", "Production", "Finishing", "Defence", "Penalties", "Physicality", "PWAA"]
    //const goalieLabels = ["GSAE_Ranking", "Low_Danger_Ranking", "Medium_Danger_Ranking", "High_Danger_Ranking", "Rebound_Control_Ranking", "PWAA_Ranking"]

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
        if (position === 'F') {
            const player = forwardData.find((element) => element.name === playerName);
            setPlayerData1({"Offence": player.Offence_Ranking, "Production" : player.Production_Ranking, "Finishing": player.Finishing_Ranking, 
                "Defence": player.Defence_Ranking, "Penalties" : player.Penalty_Ranking, "Physicality": player.Physicality_Ranking, "PWAA": player.PWAA_Ranking
            });

        } else if (position === 'D'){
            const player = defenceData.find((element) => element.name === playerName);
            setPlayerData1({"Offence": player.Offence_Ranking, "Production" : player.Production_Ranking, "Finishing": player.Finishing_Ranking, 
                "Defence": player.Defence_Ranking, "Penalties" : player.Penalty_Ranking, "Physicality": player.Physicality_Ranking, "PWAA": player.PWAA_Ranking
            });
        } else{
            const player = goalieData.find((element) => element.name === playerName);
            setPlayerData1({"GSAE": player.GSAE_Ranking, "Low Danger": player.Low_Danger_Ranking, "Medium Danger": player.Medium_Danger_Ranking, "High Danger": player.High_Danger_Ranking,
                "Rebound Control": player.Rebound_Control_Ranking, "PWAA": player.PWAA_Ranking
            });
        }
    }

    const updatePlayer2 = (playerName) => {
        if (position === 'F') {
            const player = forwardData.find((element) => element.name === playerName);
            setPlayerData2({"Offence": player.Offence_Ranking, "Production" : player.Production_Ranking, "Finishing": player.Finishing_Ranking, 
                "Defence": player.Defence_Ranking, "Penalties" : player.Penalty_Ranking, "Physicality": player.Physicality_Ranking, "PWAA": player.PWAA_Ranking
            });
        } else if (position === 'D'){
            const player = defenceData.find((element) => element.name === playerName);
            setPlayerData2({"Offence": player.Offence_Ranking, "Production" : player.Production_Ranking, "Finishing": player.Finishing_Ranking, 
                "Defence": player.Defence_Ranking, "Penalties" : player.Penalty_Ranking, "Physicality": player.Physicality_Ranking, "PWAA": player.PWAA_Ranking
            });
        } else{
            const player = goalieData.find((element) => element.name === playerName);
            setPlayerData2({"GSAE": player.GSAE_Ranking, "Low Danger": player.Low_Danger_Ranking, "Medium Danger": player.Medium_Danger_Ranking, "High Danger": player.High_Danger_Ranking,
                "Rebound Control": player.Rebound_Control_Ranking, "PWAA": player.PWAA_Ranking
            });
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


    return (
        <div className={"Main Container"}>
            <div className="titleContainer">
                <div> Points Won Above Average - Player Comparison</div>
            </div>
            <div className="buttonContainer">
                <AwesomeButton
                cssModule={AwesomeButtonStyles}
                type="primary"
                onPress={() => {
                    setPosition('F');
                    setPlayerData1({"Offence": 0, "Production" : 0, "Finishing": 0, 
                        "Defence": 0, "Penalties" : 0, "Physicality": 0, "PWAA": 0
                    });
                    setPlayerData2({"Offence": 0, "Production" : 0, "Finishing": 0, 
                        "Defence": 0, "Penalties" : 0, "Physicality": 0, "PWAA": 0
                    });
                }}
                > Forwards </AwesomeButton> 
                <AwesomeButton
                cssModule={AwesomeButtonStyles}
                type="primary"
                onPress={() => {
                    setPosition('D');
                    setPlayerData1({"Offence": 0, "Production" : 0, "Finishing": 0, 
                        "Defence": 0, "Penalties" : 0, "Physicality": 0, "PWAA": 0
                    });
                    setPlayerData2({"Offence": 0, "Production" : 0, "Finishing": 0, 
                        "Defence": 0, "Penalties" : 0, "Physicality": 0, "PWAA": 0
                    });
                    }
                }
                > Defencemen </AwesomeButton> 
                <AwesomeButton
                cssModule={AwesomeButtonStyles}
                type="primary"
                onPress={() => {
                    setPosition('G');
                    setPlayerData1({"GSAE": 0, "Low Danger": 0, "Medium Danger": 0, "High Danger": 0,
                        "Rebound Control": 0, "PWAA": 0
                    });
                    setPlayerData2({"GSAE": 0, "Low Danger": 0, "Medium Danger": 0, "High Danger": 0,
                        "Rebound Control": 0, "PWAA": 0
                    });
                }}
                > Goalies </AwesomeButton> 
            </div>

            <div className="searchContainer">
            <Stack spacing={2} sx={{ width: 300 }}>
                    <Autocomplete
                        id="pwaa_comparison_box1"
                        disableClearable
                        options={position === 'F' ? forwardData.map((option) => option.name + " (" + option.position + ")")
                            : position === 'D' ? defenceData.map((option) => option.name + " (" + option.position + ")")
                            : goalieData.map((option) => option.name + " (" + option.position + ")")
                        }
                        onChange={(e, data) => {
                            //setPlayerName1(data.slice(0, -4));
                            updatePlayer1(data.slice(0, -4));
                            
                        }}
                        renderInput={(params) => (
                        <TextField
                            sx={{ input: { color: 'red' } }}
                            {...params}
                            label="Search player"
                            InputProps={{
                                ...params.InputProps,
                                type: 'search',
                            }}
                        />
                        )}
                    />
                </Stack>
                <Stack spacing={2} sx={{ width: 300 }}>
                    <Autocomplete
                        id="pwaa_comparison_box2"
                        disableClearable
                        autoSelect
                        options={position === 'F' ? forwardData.map((option) => option.name + " (" + option.position + ")")
                            : position === 'D' ? defenceData.map((option) => option.name + " (" + option.position + ")")
                            : goalieData.map((option) => option.name + " (" + option.position + ")")
                        }
                        onChange={(e, data) => {
                            //setPlayerName2(data.slice(0, -4));
                            updatePlayer2(data.slice(0, -4));
                        }}
                        renderInput={(params) => (
                        <TextField
                            sx={{ input: { color: 'blue' } }}
                            {...params}
                            label="Search player"
                            InputProps={{
                            ...params.InputProps,
                            type: 'search',
                            }}
                        />
                        )}
                    />
                </Stack>
            </div>

            <div className="comparisonContainer">
                <VictoryChart polar
                    theme={VictoryTheme.material}
                    domain={{ y: [ 0, 1 ] }}
                >
                <VictoryGroup colorScale={["red", "blue"]}
                    style={{ data: { fillOpacity: 0.2, strokeWidth: 2 } }}
                >
                    {processData([playerData1, playerData2]).map((data, i) => {
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
                    //onPress={}
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
 
export default PlayerComparisonPWAA;