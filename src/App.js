import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playing: false,
      paused: false,
      stopped: true,
      trackProgress: 0,
      trackSelected: null,
      tracks: [
        'http://www.noiseaddicts.com/samples_1w72b820/55.mp3',
        'http://www.noiseaddicts.com/samples_1w72b820/56.mp3',
        'http://www.noiseaddicts.com/samples_1w72b820/57.mp3',
        'http://www.noiseaddicts.com/samples_1w72b820/58.mp3',
        'http://www.noiseaddicts.com/samples_1w72b820/59.mp3',
        'http://www.noiseaddicts.com/samples_1w72b820/60.mp3',
      ]
    };

    this.handlePlayPause = this.handlePlayPause.bind(this);
  }
  shouldComponentUpdate(nextProps, nextState) {
     return nextState.audioCurrentTime === this.state.audioCurrentTime;
  }
  componentDidMount() {
    this.player = document.querySelector('.audio-player');

    this.player.addEventListener('timeupdate', () => {
      this.setState({
        trackProgress: this.player.currentTime
      });
    });

    this.player.addEventListener('ended', () => {
      this.setState({
        stopped: true,
        playing: false
      });
    });
  }
  handlePlayPause(e) {
    e.preventDefault();

    if (this.state.paused || this.state.stopped) {
      this.player.play();
      this.setState({
        playing: true,
        paused: false,
        stopped: false
      });
    } else if (this.state.playing) {
      this.player.pause();
      this.setState({
        playing: false,
        paused: true,
        stopped: false
      });
    }
  }
  render() {
    return (
      <div className="app">
        <header className="header">
          <h1>Iwoca music player</h1>
        </header>
        <main className="clearfix">
          <section className="player">
            <p>Current track: {this.state.trackSelected}</p>
            <audio className="audio-player" controls src="http://www.noiseaddicts.com/samples_1w72b820/3707.mp3">
              Your browser does not support the <code>audio</code> element.
            </audio>
            <div className="player-controls">
              <div className="progress">
                <div className="filled"></div>
              </div>
              <button data-skip="-10" className="player-button">«</button>
              <button className="player-button toggle" title="Play/Pause" onClick={this.handlePlayPause}>{this.state.playing? '❚ ❚' : '►'}</button>
              <button data-skip="25" className="player-button">»</button>
              <span className="info-text">{this.state.trackProgress}</span>
              <input type="range" name="volume" className="player-slider" min="0" max="1" step="0.05" value="1" />
            </div>
          </section>
          <section>
            <h2>Playlist</h2>
            <ul className="playlist">
              { this.state.tracks.length === 0 ? <li>No tracks found</li> : this.state.tracks.map((track, index) => (
                <li key={index}><a href={track}>Track {index + 1}</a></li>
              ))}
            </ul>
          </section>
        </main>
        <footer>
          &copy; IMP
        </footer>
      </div>
    );
  }
}

export default App;
