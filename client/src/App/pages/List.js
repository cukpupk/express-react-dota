import React from 'react';
import GetHeroName from '../../component/GetHeroName'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import './index.css'
const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            MatchID: '',
            displayTable: false,
            RadientData: [],
            DireData:[]
        }
    }
    handleChange =e =>{
        this.setState({
            MatchID: e.target.value
        })
    }
    handleClick =() => {
        if(this.state.MatchID) {
            fetch(`https://api.opendota.com/api/matches/${this.state.MatchID}`)
            .then(response => response.json())
            .then(data => {
                //console.log(data.players[4])
                let RadientData = [];
                let DireData = [];
                for(let i=0;i<5;i++) {
                    // this.setState({
                    //     RadientData: [...this.state.RadientData,data.players[i] ],
                    //     displayTable: true
                    // })
                    RadientData.push(data.players[i])
                }
                for(let i=5;i<10;i++) {
                    // this.setState({
                    //     DireData: [...this.state.DireData,data.players[i] ],
                    //     displayTable: true
                    // })
                    DireData.push(data.players[i])
                }
                console.log(RadientData)
                console.log(this.state.RadientData)
                this.setState({
                    RadientData: RadientData,
                    DireData: DireData,
                    displayTable: true
                })
                //console.log(this.state.RadientData)
            })
        }
    }
    render() {
        
        console.log(this.state.RadientData)
        return (
            <div className='Window_Container'>
                <div className='Label_Input_box'>
                    <label>Please input the MatchID you want to look up</label>
                    <input type='number' value={this.state.MatchID} onChange={this.handleChange} placeholder='MatchID'/>
                    <button onClick={this.handleClick}>Submit</button>
                </div>
                {this.state.displayTable &&  (
                    <div>
                        {this.state.RadientData[0].match_id}
                        <br></br>
                        <TableContainer component={Paper}>
                            <h2>天辉</h2>
                            <Table className={useStyles.table} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                <TableCell>使用英雄</TableCell>
                                <TableCell align="right">名字</TableCell>
                                <TableCell align="right">ID&nbsp;</TableCell>
                                <TableCell align="right">GPM&nbsp;</TableCell>
                                <TableCell align="right">KDA&nbsp;</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.RadientData.map((item,index) => (
                                    <TableRow key={index}>
                                        <TableCell component="th" scope="row">
                                        <GetHeroName HeroID={item.hero_id}/>
                                        </TableCell>
                                        <TableCell align="right">{item.personaname}</TableCell>
                                        <TableCell align="right">{item.account_id}</TableCell>
                                        <TableCell align="right">{item.gold_per_min}</TableCell>
                                        <TableCell align="right">{item.kills}/{item.deaths}/{item.assists}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                            </Table>
                        </TableContainer>
                        <br></br>
                        <TableContainer component={Paper}>
                            <h2>夜魇</h2>
                            <Table className={useStyles.table} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                <TableCell>使用英雄</TableCell>
                                <TableCell align="right">名字</TableCell>
                                <TableCell align="right">ID&nbsp;</TableCell>
                                <TableCell align="right">GPM&nbsp;</TableCell>
                                <TableCell align="right">KDA&nbsp;</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.DireData.map((item,index) => (
                                    <TableRow key={index}>
                                        <TableCell component="th" scope="row">
                                        <GetHeroName HeroID={item.hero_id}/>
                                        </TableCell>
                                        <TableCell align="right">{item.personaname}</TableCell>
                                        <TableCell align="right">{item.account_id}</TableCell>
                                        <TableCell align="right">{item.gold_per_min}</TableCell>
                                        <TableCell align="right">{item.kills}/{item.deaths}/{item.assists}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                     
                )}
            </div>
        )
    }
}
export default Dashboard;