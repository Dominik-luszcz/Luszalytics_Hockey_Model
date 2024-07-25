require("dotenv").config({path: "Luszalytics/server" + "/.env"});

const express = require("express");
const pool = require("./config/db.config.js");
const bcrypt = require('bcrypt')
var cors = require('cors')
const jwt = require('jsonwebtoken')
// var low = require('lowdb')
// var FileSync = require('lowdb/adapters/FileSync')
// var adapter = new FileSync('./database.json')
// var db = low(adapter)

const app = express();

const PORT = process.env.PORT || 3005;

const getGoaliesPWAA = (req, res) => {
    pool.query('SELECT * FROM "PWAA"."PWAA_goalies"', (error, goalies) => {
        if (error){
            throw error;
        }
        res.status(200).json(goalies.rows);
    })
}

const getForwardsPWAA = (req, res) => {
    pool.query('SELECT * FROM "PWAA"."PWAA_forwards"', (error, forwards) => {
        if (error){
            throw error;
        }
        res.status(200).json(forwards.rows);
    })
}

const getDefencePWAA = (req, res) => {
    pool.query('SELECT * FROM "PWAA"."PWAA_defence"', (error, defence) => {
        if (error){
            throw error;
        }
        res.status(200).json(defence.rows);
    })
}

const getTeamsPWAA = (req, res) => {
    pool.query('SELECT * FROM "PWAA"."PWAA_teams"', (error, teams) => {
        if (error){
            throw error;
        }
        res.status(200).json(teams.rows)
    })
}

const getEVForwardPercentile = (req, res) => {
    pool.query('SELECT * FROM "Percentile"."evForwardPercentile"', (error, players) => {
        if (error){
            throw error;
        }
        res.status(200).json(players.rows)
    })
}
const getEVDefencePercentile = (req, res) => {
    pool.query('SELECT * FROM "Percentile"."evDefencePercentile"', (error, players) => {
        if (error){
            throw error;
        }
        res.status(200).json(players.rows)
    })
}
const getEVGoaliePercentile = (req, res) => {
    pool.query('SELECT * FROM "Percentile"."evGoaliePercentile"', (error, players) => {
        if (error){
            throw error;
        }
        res.status(200).json(players.rows)
    })
}
const getPKForwardPercentile = (req, res) => {
    pool.query('SELECT * FROM "Percentile"."pkForwardPercentile"', (error, players) => {
        if (error){
            throw error;
        }
        res.status(200).json(players.rows)
    })
}
const getPKDefencePercentile = (req, res) => {
    pool.query('SELECT * FROM "Percentile"."pkDefencePercentile"', (error, players) => {
        if (error){
            throw error;
        }
        res.status(200).json(players.rows)
    })
}
const getPKGoaliePercentile = (req, res) => {
    pool.query('SELECT * FROM "Percentile"."pkGoaliePercentile"', (error, players) => {
        if (error){
            throw error;
        }
        res.status(200).json(players.rows)
    })
}
const getPPForwardPercentile = (req, res) => {
    pool.query('SELECT * FROM "Percentile"."ppForwardPercentile"', (error, players) => {
        if (error){
            throw error;
        }
        res.status(200).json(players.rows)
    })
}
const getPPDefencePercentile = (req, res) => {
    pool.query('SELECT * FROM "Percentile"."ppDefencePercentile"', (error, players) => {
        if (error){
            throw error;
        }
        res.status(200).json(players.rows)
    })
}
const getPPGoaliePercentile = (req, res) => {
    pool.query('SELECT * FROM "Percentile"."ppGoaliePercentile"', (error, players) => {
        if (error){
            throw error;
        }
        res.status(200).json(players.rows)
    })
}




//Here you can add your routes
//Here's an example
app.get("/", (req, res) => {
    res.send("Hello World!");
  });

app.get("/pwaa-goalies", getGoaliesPWAA);

app.get("/pwaa-teams", getTeamsPWAA);

app.get("/pwaa-forwards", getForwardsPWAA);

app.get("/pwaa-defence", getDefencePWAA);

app.get("/evForwardPercentile", getEVForwardPercentile);
app.get("/evDefencePercentile", getEVDefencePercentile);
app.get("/evGoaliePercentile", getEVGoaliePercentile);
app.get("/pkForwardPercentile", getPKForwardPercentile);
app.get("/pkDefencePercentile", getPKDefencePercentile);
app.get("/pkGoaliePercentile", getPKGoaliePercentile);
app.get("/ppForwardPercentile", getPPForwardPercentile);
app.get("/ppDefencePercentile", getPPDefencePercentile);
app.get("/ppGoaliePercentile", getPPGoaliePercentile);


app.listen(PORT, () => {
    console.log(`Server listening on the port  ${PORT}`);
})