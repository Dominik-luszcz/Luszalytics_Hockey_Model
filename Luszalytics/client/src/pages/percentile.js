import React , {useState, useEffect} from "react";
import axios from "axios";
import { AwesomeButton } from 'react-awesome-button';
import AwesomeButtonStyles from 'react-awesome-button/src/styles/styles.scss';
//import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import { renderProgress } from "../components/mui_progress_bar/mui_progress_bar";
//import { VictoryStack, VictoryChart, VictoryAxis, VictoryLabel, VictoryPolarAxis, VictoryTheme, VictoryPie, VictoryBar } from 'victory';
import { DataGrid } from "@mui/x-data-grid";
import { v4 as uuidv4 } from 'uuid';

// Offense, Defence, Penalty Diff, Finishing, Physicality, Production
 
const Percentile = () => {
    //const navigate = useNavigate();
    const [evForwardData, setevForwardData] = useState([]);
    const [evDefenceData, setevDefenceData] = useState([]);
    const [evGoalieData, setevGoalieData] = useState([]);
    const [pkForwardData, setpkForwardData] = useState([]);
    const [pkDefenceData, setpkDefenceData] = useState([]);
    const [pkGoalieData, setpkGoalieData] = useState([]);
    const [ppForwardData, setppForwardData] = useState([]);
    const [ppDefenceData, setppDefenceData] = useState([]);
    const [ppGoalieData, setppGoalieData] = useState([]);
    const [gameState, setGameState] = useState('EV');
    //const [position, setPosition] = useState('F');

    const [playerName, setPlayerName] = useState('');
    const [chosenPlayerData, setChosenPlayerData] = useState([{statistic: "N/A", percentile: 0}]);


    useEffect(() => {
        axios
        .get('/evForwardPercentile')
        .then(res => res.data)
        .then(data => setevForwardData(data));
    }, []);
    useEffect(() => {
        axios
        .get('/evDefencePercentile')
        .then(res => res.data)
        .then(data => setevDefenceData(data));
    }, []);
    useEffect(() => {
        axios
        .get('/evGoaliePercentile')
        .then(res => res.data)
        .then(data => setevGoalieData(data));
    }, []);
    useEffect(() => {
        axios
        .get('/pkForwardPercentile')
        .then(res => res.data)
        .then(data => setpkForwardData(data));
    }, []);
    useEffect(() => {
        axios
        .get('/pkDefencePercentile')
        .then(res => res.data)
        .then(data => setpkDefenceData(data));
    }, []);
    useEffect(() => {
        axios
        .get('/pkGoaliePercentile')
        .then(res => res.data)
        .then(data => setpkGoalieData(data));
    }, []);
    useEffect(() => {
        axios
        .get('/ppForwardPercentile')
        .then(res => res.data)
        .then(data => setppForwardData(data));
    }, []);
    useEffect(() => {
        axios
        .get('/ppDefencePercentile')
        .then(res => res.data)
        .then(data => setppDefenceData(data));
    }, []);
    useEffect(() => {
        axios
        .get('/ppGoaliePercentile')
        .then(res => res.data)
        .then(data => setppGoalieData(data));
    }, []);



    const updatePlayer1 = (name = playerName, situation = 'EV') => {
        //const position = playerName.slice(-2, -1);
        if (situation === 'EV'){
            const data = evForwardData.concat(evDefenceData, evGoalieData);
            const player = data.find((element) => element.name === name);

            var playerData = Object.keys(player).filter((key) => {
                return key.includes("EV_");
            }).reduce((newData, key, currentIndex) => {
                var data = {statistic: key, percentile: Number(player[key]).toFixed(2)}
                newData[currentIndex] = data;
                return newData
            }, []);

            setChosenPlayerData(playerData);
             
        } else if (situation === 'PP') {
            const data = ppForwardData.concat(ppDefenceData, ppGoalieData);
            const player = data.find((element) => element.name === name); 

            if (player === undefined){
                setChosenPlayerData([{statistic: "N/A", percentile: 0}]);
                return;
            }

            playerData = Object.keys(player).filter((key) => {
                return key.includes("PP_");
            }).reduce((newData, key, currentIndex) => {
                var data = {statistic: key, percentile: Number(player[key]).toFixed(2)}
                newData[currentIndex] = data;
                return newData
            }, []);

            setChosenPlayerData(playerData);

        } else {
            const data = pkForwardData.concat(pkDefenceData, pkGoalieData);
            const player = data.find((element) => element.name === name); 

            if (player === undefined){
                setChosenPlayerData([{statistic: "N/A", percentile: 0}]);
                return;
            }

            playerData = Object.keys(player).filter((key) => {
                return key.includes("PK_");
            }).reduce((newData, key, currentIndex) => {
                var data = {statistic: key, percentile: Number(player[key]).toFixed(2)}
                newData[currentIndex] = data;
                return newData
            }, []);

            setChosenPlayerData(playerData);
        }
    

    }

    const skaterColumns = [
        {
            width: 300,
            field: 'statistic',
            headerName: 'Statistic',
            headerAlign: 'left'
            
        },
        {
            field: "percentile",
            headerName: "Percentile",
            renderCell: renderProgress,
            type: "number",
            width: 1000,
            headerAlign: 'left'
        }
    ]


    return (
        <div className={"Main Container"}>
            <div className="titleContainer">
                <div> Player Stat Percentile </div>
            </div>

            <div className="buttonContainer">
                <AwesomeButton
                cssModule={AwesomeButtonStyles}
                type="primary"
                onPress={() => {
                    setGameState('EV');
                    updatePlayer1(playerName, 'EV');
                }}
                > Even Strength </AwesomeButton> 
                <AwesomeButton
                cssModule={AwesomeButtonStyles}
                type="primary"
                onPress={() => {
                    setGameState('PP');
                    updatePlayer1(playerName, 'PP');
                }}
                > Power Play </AwesomeButton> 
                <AwesomeButton
                cssModule={AwesomeButtonStyles}
                type="primary"
                onPress={() => {
                    setGameState('PK');
                    updatePlayer1(playerName, 'PK');
                }}
                > Penalty Kill </AwesomeButton> 
            </div>
                

            <div className="searchContainer">
                <Stack spacing={2} sx={{ width: 600 }}>
                    <Autocomplete
                        id="pwaa_search_box"
                        disableClearable
                        options={gameState === 'EV' ? evForwardData.concat(evDefenceData, evGoalieData).map((option) => option.name + " (" + option.position + ")")
                            : gameState === 'PK' ? pkForwardData.concat(pkDefenceData, pkGoalieData).map((option) => option.name + " (" + option.position + ")")
                            : ppForwardData.concat(ppDefenceData, ppGoalieData).map((option) => option.name + " (" + option.position + ")")
                        }
                        onChange={(event, data) => {
                            setPlayerName(data.slice(0, -4));
                            updatePlayer1(data.slice(0, -4), gameState);
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

            <div style={{ height: 600, width: '95%', padding: "2.5%"}}>
                <div style={{ display: "flex", height: "100%"}}>
                    <div style={{ flexGrow: 1 }}>
                        <DataGrid columns={skaterColumns} rows={chosenPlayerData} getRowId={() => uuidv4()} />
                    </div>
                </div>
            </div>

            


        </div>
    );
};
 
export default Percentile;