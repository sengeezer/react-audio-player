import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playing: false,
      paused: false,
      stopped: true,
      trackProgress: 0,
      trackDuration: 0,
      trackVolume: 0.5,
      trackSelected: {
        title: 'Just a drill',
        url: 'http://www.noiseaddicts.com/samples_1w72b820/3707.mp3'
      },
      tracks: [
        {
          title: 'I\'m Sorry, Dave',
          artist: '2001',
          duration: 3.00,
          url: 'http://www.noiseaddicts.com/samples_1w72b820/55.mp3'
        },
        {
          title: 'Chad',
          artist: 'National Anthem',
          duration: 79.0,
          url: 'http://www.noiseaddicts.com/samples_1w72b820/4040.mp3'
        },
        {
          title: 'Estonia',
          artist: 'National Anthem',
          duration: 34.0,
          url: 'http://www.noiseaddicts.com/samples_1w72b820/4186.mp3'
        },
        {
          title: 'Guam',
          artist: 'National Anthem',
          duration: 46.0,
          url: 'http://www.noiseaddicts.com/samples_1w72b820/4195.mp3'
        },
        {
          title: 'Isle of Man',
          artist: 'National Anthem',
          duration: 37.0,
          url: 'http://www.noiseaddicts.com/samples_1w72b820/4206.mp3'
        }
      ]
    };

    this.handlePlayPause = this.handlePlayPause.bind(this);
    this.handleTrackSelect = this.handleTrackSelect.bind(this);
    this.handleVolumeChange = this.handleVolumeChange.bind(this);
    this.handleSkip = this.handleSkip.bind(this);
  }
  shouldComponentUpdate(nextProps, nextState) {
     return nextState.audioCurrentTime === this.state.audioCurrentTime;
  }
  componentDidMount() {
    this.player = document.querySelector('.audio-player');

    this.player.addEventListener('loadeddata', () => {
      if (this.player.readyState >= 2) {
        this.setState({
          trackDuration: this.player.duration
        });
      }
    });

    this.player.addEventListener('timeupdate', () => {
      this.setState({
        trackProgress: this.player.currentTime
      });
      const percent = (this.player.currentTime / this.player.duration) * 100;
      document.querySelector('.filled').style.flexBasis = `${percent}%`;
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
  handleTrackSelect(e) {
    e.preventDefault();

    const trackSelectedIndex = e.currentTarget.dataset.index || 0;
    const trackSelectedMeta = this.state.tracks[trackSelectedIndex];

    this.setState({
      trackSelected: {
        title: trackSelectedMeta.title,
        url: trackSelectedMeta.url
      }
    });
  }
  handleVolumeChange(e) {
    this.setState({
      trackVolume: e.target.value
    })

    this.player.volume = this.state.trackVolume;
  }
  handleSkip() {
    console.log('Not yet implemented.');
  }
  render() {
    return (
      <div className="app">
        <header className="header">
          <h1>Iwoca music player</h1>
        </header>
        <main className="clearfix">
          <section className="player">
            <h3>Current track: {this.state.trackSelected.title}</h3>
            <audio className="audio-player" src={this.state.trackSelected.url}>
              Your browser does not support the <code>audio</code> element.
            </audio>
            <div className="player-controls">
              <div className="progress">
                <div className="filled"></div>
              </div>
              <button
                data-skip="-10"
                className="player-button"
                onClick={this.handleSkip}
              >«</button>
              <button
                className="player-button toggle"
                title="Play/Pause"
                onClick={this.handlePlayPause}
              >{this.state.playing? '❚ ❚' : '►'}
              </button>
              <button
                data-skip="25"
                className="player-button"
                onClick={this.handleSkip}
              >»</button>
              <span className="info-text">
                {(this.state.trackDuration - this.state.trackProgress).toFixed(2)}
              </span>
              <input
                type="range"
                name="volume"
                className="player-slider"
                min="0"
                max="1"
                step="0.05"
                value={this.state.trackVolume}
                onChange={this.handleVolumeChange}
              />
            </div>
          </section>
          <section>
            <h2>Available Tracks</h2>
            <ul className="playlist">
              { this.state.tracks.length === 0
                ? <li>No tracks found</li>
                : this.state.tracks.map((track, index) => (
                  <a
                    key={index}
                    href={track.url}
                    data-index={index}
                    onClick={this.handleTrackSelect}
                  >
                    <li className={track.url === this.state.trackSelected.url ? 'item selected' : 'item'}>
                      <strong>{track.title}</strong> by {track.artist}<br />
                      <span className="small">Duration: {track.duration}s</span>
                    </li>
                  </a>
                  ))
              }
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
