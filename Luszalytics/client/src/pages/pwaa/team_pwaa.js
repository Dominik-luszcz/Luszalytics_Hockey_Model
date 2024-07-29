
import axios from 'axios';
import React, {useState, useEffect, useRef} from 'react';
import { AwesomeButton } from 'react-awesome-button';
import AwesomeButtonStyles from 'react-awesome-button/src/styles/styles.scss';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import { TableVirtuoso } from 'react-virtuoso';
import { useNavigate } from "react-router-dom";

// function createData(id, team, cap_hit, Individual_Goals, Individual_primaryAssists, Individual_secondaryAssists, Production, Penalty_Differential, EV_xGoals_Against, PK_xGoals_Against, EV_Chances, 
//     PP_Chances, EV_differential, PP_differential, PK_differential, Finishing, Physicality, Defensive_Actions, EV_HighDangerAgainst, PK_HighDangerAgainst, 
//     High_Danger_Chances_For, gameScore, GSAE, Rebound_Control, Low_Danger, Medium_Danger, High_Danger, PAA
// ) {
//     return { id, team, cap_hit, Individual_Goals, Individual_primaryAssists, Individual_secondaryAssists, Production, Penalty_Differential, EV_xGoals_Against, PK_xGoals_Against, EV_Chances, 
//         PP_Chances, EV_differential, PP_differential, PK_differential, Finishing, Physicality, Defensive_Actions, EV_HighDangerAgainst, PK_HighDangerAgainst, 
//         High_Danger_Chances_For, gameScore, GSAE, Rebound_Control, Low_Danger, Medium_Danger, High_Danger, PAA };
// }


const columns = [
    {
      width: 100,
      label: 'Team',
      dataKey: 'team',
    },
    {
        width: 150,
        label: 'PWAA',
        dataKey: 'PAA',
        numeric: true,
        format: (value) => value.toFixed(2),
    },
    {
      width: 150,
      label: 'Individual_Goals',
      dataKey: 'Individual_Goals',
      numeric: true,
      format: (value) => value.toFixed(2),
    },
    {
      width: 200,
      label: 'Individual_primaryAssists',
      dataKey: 'Individual_primaryAssists',
      numeric: true,
      format: (value) => value.toFixed(2),
    },
    {
      width: 200,
      label: 'Individual_secondaryAssists',
      dataKey: 'Individual_secondaryAssists',
      numeric: true,
      format: (value) => value.toFixed(2),
    },
    {
        width: 150,
        label: 'Production',
        dataKey: 'Production',
        numeric: true,
        format: (value) => value.toFixed(2),
    },
    {
        width: 150,
        label: 'Penalty_Differential',
        dataKey: 'Penalty_Differential',
        numeric: true,
        format: (value) => value.toFixed(2),
    },
    {
        width: 150,
        label: 'EV_xGoals_Against',
        dataKey: 'EV_xGoals_Against',
        numeric: true,
        format: (value) => value.toFixed(2),
    },
    {
        width: 150,
        label: 'PK_xGoals_Against',
        dataKey: 'PK_xGoals_Against',
        numeric: true,
        format: (value) => value.toFixed(2),
    },
    {
        width: 150,
        label: 'EV_Chances',
        dataKey: 'EV_Chances',
        numeric: true,
        format: (value) => value.toFixed(2),
    },
    {
        width: 150,
        label: 'EV_differential',
        dataKey: 'EV_differential',
        numeric: true,
        format: (value) => value.toFixed(2),
    },
    {
        width: 150,
        label: 'PP_differential',
        dataKey: 'PP_differential',
        numeric: true,
        format: (value) => value.toFixed(2),
    },
    {
        width: 150,
        label: 'PK_differential',
        dataKey: 'PK_differential',
        numeric: true,
        format: (value) => value.toFixed(2),
    },
    {
        width: 150,
        label: 'Finishing',
        dataKey: 'Finishing',
        numeric: true,
        format: (value) => value.toFixed(2),
    },
    {
        width: 150,
        label: 'Physicality',
        dataKey: 'Physicality',
        numeric: true,
        format: (value) => value.toFixed(2),
    },
    {
        width: 150,
        label: 'EV_Shots_Against',
        dataKey: 'EV_Shots_Against',
        numeric: true,
        format: (value) => value.toFixed(2),
    },
    {
        width: 175,
        label: 'EV_HighDangerAgainst',
        dataKey: 'EV_HighDangerAgainst',
        numeric: true,
        format: (value) => value.toFixed(2),
    },
    {
        width: 175,
        label: 'PK_HighDangerAgainst',
        dataKey: 'PK_HighDangerAgainst',
        numeric: true,
        format: (value) => value.toFixed(2),
    },
    {
        width: 225,
        label: 'High_Danger_Chances_For',
        dataKey: 'High_Danger_Chances_For',
        numeric: true,
        format: (value) => value.toFixed(2),
    },
    {
        width: 150,
        label: 'gameScore',
        dataKey: 'gameScore',
        numeric: true,
        format: (value) => value.toFixed(2),
    },
    {
        width: 150,
        label: 'GSAE',
        dataKey: 'GSAE',
        numeric: true,
        format: (value) => value.toFixed(2),
    },
    {
        width: 150,
        label: 'Rebound_Control',
        dataKey: 'Rebound_Control',
        numeric: true,
        format: (value) => value.toFixed(2),
    },
    {
        width: 150,
        label: 'Low_Danger',
        dataKey: 'Low_Danger',
        numeric: true,
        format: (value) => value.toFixed(2),
    },
    {
        width: 150,
        label: 'Medium_Danger',
        dataKey: 'Medium_Danger',
        numeric: true,
        format: (value) => value.toFixed(2),
    },
    {
        width: 150,
        label: 'High_Danger',
        dataKey: 'High_Danger',
        numeric: true,
        format: (value) => value.toFixed(2),
    },
    


      
  ];

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }
  
  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }
  

const VirtuosoTableComponents = {
    Scroller: React.forwardRef((props, ref) => (
      <TableContainer component={Paper} {...props} ref={ref} />
    )),
    Table: (props) => (
      <Table {...props} sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }} />
    ),
    TableHead,
    TableRow: ({ item: _item, ...props }) => <TableRow {...props} />,
    TableBody: React.forwardRef((props, ref) => <TableBody {...props} ref={ref} />),
};



function rowContent(_index, row) {
    return (
      <React.Fragment>
        {columns.map((column) => (
          <TableCell
            key={column.dataKey}
            align={'center'}
            style={column.dataKey === "team" ? {position:'sticky', zIndex:1, left:0} : {}}
            sx={{
                width: typeof column.width !== 'undefined' ? column.width : undefined,
                backgroundColor: 'background.paper',      
            }}
          >
            {column.format && column.numeric
                            ? column.format(row[column.dataKey])
                            : row[column.dataKey]}
          </TableCell>
        ))}
      </React.Fragment>
    );
}


const TeamPWAA = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);

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

    // get order state
    const [order, setOrder] = useState('asc');
    // get order by state
    const [orderBy, setOrderBy] = useState(columns[0].dataKey);

    const virtuoso = useRef(null);

    useEffect(() => {
        axios
        .get('/pwaa-teams')
        .then(res => res.data)
        .then(data => setData(data));
    }, []);

    useEffect(() => {
        setData([...data].sort(getComparator(order, orderBy)));
    }, [data, order, orderBy]);

      // event handler to handle onClick for sorting table
    const handleSort = (columnDataKey) => {
        const isAsc = orderBy === columnDataKey && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(columnDataKey);
        virtuoso.current.scrollToIndex(0);
    };

        // prepare fixed header
        const fixedHeaderContent = () => {
            return (
                <TableRow>
                    {
                        columns.map((column) => (
                            <TableCell
                                key={column.dataKey}
                                align={'center'}
                                style={column.dataKey === "team" ? {position:'sticky', zIndex:1, left:0} : {}}
                                sx={{
                                    width: typeof column.width !== 'undefined' ? column.width : undefined,
                                    backgroundColor: 'background.paper',      
                                }}
                            >
                                {typeof column.sortable !== 'undefined' && column.sortable === false
                                    ? column.label
                                    : <TableSortLabel
                                        active={orderBy === column.dataKey}
                                        direction={orderBy === column.dataKey ? order : 'asc'}
                                        onClick={() => handleSort(column.dataKey)}
                                    >
                                        {column.label}
                                    </TableSortLabel>
                                }
                            </TableCell>
                        ))
                    }
                </TableRow>
            );
        };

    const rows = Array.from(data);

    return (
        <div className={"Main Container"}>
            <div className="titleContainer">
                <div> Points Won Above Average - Teams</div>
            </div>
            <Paper style={{ height: 550, width: '100%' }}>
                <TableVirtuoso
                    ref={virtuoso}
                    data={rows}
                    components={VirtuosoTableComponents}
                    fixedHeaderContent={fixedHeaderContent}
                    itemContent={rowContent}
                />
            </Paper>

            <div className="buttonContainer">
                <AwesomeButton
                    cssModule={AwesomeButtonStyles}
                    type="primary"
                    //onPress={onButtonClick}
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
 
export default TeamPWAA;