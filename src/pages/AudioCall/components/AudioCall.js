import React, { Component } from 'react';
import audiocallBackground from '../../../assets/audiocall-background.jpg';
import { Backdrop, withStyles } from '@material-ui/core';
import { Intro } from './Intro';

class AudioCall extends Component {
    state = {
      gameStarted: false,
    };
  
    gameStarts = () => {
      this.setState({ gameStarted: true });
    };
  
    render() {
      const { classes } = this.props;
      const { gameStarted } = this.state;
      return (
        <Backdrop className={classes.backdrop} open={true}>
          {!gameStarted && (
            <Intro open={!gameStarted} onClick={this.gameStarts} />
          )}
          {/* {gameStarted && <MainPage />} */}
        </Backdrop>
      );
    }
  }
  
  function createStyles() {
    return {
      backdrop: {
        position: 'relative',
        marginTop: '48px',
        marginLeft: '54px',
        minHeight: 'calc(100vh - 48px)',
        overflowX: 'hidden',
        width: 'calc(100% - 54px)',
        background: `url(${audiocallBackground})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        zIndex: 100,
      },
    };
  }
  
  export default withStyles(createStyles)(AudioCall);