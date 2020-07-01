import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import {
  DialogActions,
  DialogContent,
  Avatar,
  Button,
  Dialog,
  Typography,
  Slider,
  Checkbox,
  FormControlLabel,
  IconButton
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { Loader } from '../Loader/Loader'
import { userWords, changeDifficulty, loadGame, changeRound, endGame } from '../../../../store/actions/sprintActions';

const MuiDialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
  },
}))(DialogContent);

const MuiDialogActions = withStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: 0,
    padding: theme.spacing(2),
  },
}))(DialogActions);

const MuiAvatar = withStyles((theme) => ({
  root: {
    display: 'inline-block',
    verticalAlign: 'middle',
    marginRight: theme.spacing(2),
  },
}))(Avatar);


function WelcomeDialog(props) {
  if (props.sprintState.gameLoading) {
    return (
      <Loader />
    )
  }

  return (
    <div>
      <Dialog
       fullWidth={true}
       maxWidth="sm"
       open={props.sprintState.open}
       >
        <MuiDialogContent style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
          <MuiAvatar alt="logo" src={`${process.env.PUBLIC_URL}/images/logo.png`} />
          <Typography variant="h6">RS Sprint</Typography>
          <IconButton
            onClick={props.closeWindow}
            component={Link}
            to='/home'
            >
            <CloseIcon />
          </IconButton>
        </MuiDialogContent>
        <MuiDialogContent dividers>
          <Typography variant="h5" id="discrete-slider" gutterBottom style={{marginBottom: "2.35em"}}>
            Choose your difficulty level, please
          </Typography>
          <Slider
            defaultValue={props.sprintState.difficulty}
            aria-labelledby="discrete-slider"
            valueLabelDisplay="on"
            step={1}
            marks
            min={1}
            max={6}
            disabled={props.sprintState.disabled}
            onChange={(event, value) => props.changeDifficulty(value)}
          />
          <Typography variant="h5" id="discrete-slider" gutterBottom style={{marginBottom: '2.35em'}}>
            Choose round, please
          </Typography>
          <Slider
            defaultValue={props.sprintState.round}
            aria-labelledby="discrete-slider"
            valueLabelDisplay="on"
            step={1}
            marks
            min={1}
            max={30}
            disabled={props.sprintState.disabled}
            onChange={(event, value) => props.changeRound(value)}
          />
        </MuiDialogContent>
        <MuiDialogActions>
          <FormControlLabel
            control={<Checkbox checked={props.sprintState.checked} onChange={props.handleChange} />}
            label="Use my dictionary"
          />
          <Button autoFocus onClick={() => {props.loadGame(props.sprintState.difficulty, props.sprintState.round)}} color="primary">
            Start game!
          </Button>
        </MuiDialogActions>
      </Dialog>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    sprintState: state.sprintReducer
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleChange: () => dispatch(userWords()),
    changeDifficulty: (value) => dispatch(changeDifficulty(value)),
    changeRound: (value) => dispatch(changeRound(value)),
    loadGame: (difficulty, round) => dispatch(loadGame(difficulty, round)),
    endGame: () => dispatch(endGame()),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(WelcomeDialog)
