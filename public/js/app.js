// console.log('hello');

class NewSong extends React.Component{
  state={
    artist: '',
    song: '',
    rating: 0,
    iframe: '',
    description: ''
  }

  handleChange = (event) => {
      this.setState({ [event.target.id]: event.target.value })
    }

  //create new song entry
  handleSubmit = (event) => {
  event.preventDefault()
  axios
    .post('/songs', this.state)
    .then(response => {
      this.setState({ songs: response.data, artist: '', song:'', rating: 0, iframe: '', description: ''})
    })
  }

  render = () => {
    return(
      <div className='create'>
        <h2>Submit a Song Review</h2>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="artist">Artist</label>
          <br />
          <input type="text" id="artist" onChange={this.handleChange} />
          <br />
          <label htmlFor="song">Song Title</label>
          <br />
          <input type="text" id="song" onChange={this.handleChange} />
          <br />
          <label htmlFor="rating">Rating</label>
          <br />
          <input type="number" id="rating" onChange={this.handleChange} />
          <br />
          <label htmlFor="iframe">iFrame (Embedded Code)</label>
          <br />
          <input type="text" id="iframe" onChange={this.handleChange} />
          <br />
          <label htmlFor="description">Review</label>
          <br />
          <input type="text" id="description" onChange={this.handleChange} />
          <br />
          <br />
          <input type="submit" value="Submit Review" />
        </form>
      </div>
    )
  }

}


class Songs extends React.Component {
  state={
    artist: '',
    song: '',
    rating: 0,
    iframe: '',
    description: '',
    songs: []
  }

  //songs reviewed
  componentDidMount = () => {
  axios.get('/songs').then(response => {
    this.setState({
      songs: response.data
    })
  })
  }

  //delete songs
  deleteSong = (event) => {
  axios.delete('/songs/' + event.target.value).then(response => {
    this.setState({
      animals: response.data
    })
  })
  }

  //update song
  updateSong = (event) => {
  event.preventDefault()
  const id = event.target.id
  axios.put('/songs/' + id, this.state).then(response => {
    this.setState({
      artist: '',
      song: '',
      rating: 0,
      iframe: '',
      description: ''
    })
  })
  }

  render = () => {
    return (
      <div>
      </div>
    )
  }
}


class App extends React.Component {
  componentDidMount = () => {
    axios.get('/songs').then(response => {
      this.setState({
        songs: response.data
      })
    })
  }
  render = () => {
    return(
<<<<<<< HEAD
      <div className="container">
        <NewSong></NewSong>
        <Songs></Songs>
=======
      <div>
        <div className='create'>
          <h2>Submit a Song Review</h2>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="artist">Artist*</label>
            <br />
            <input type="text" id="artist" onChange={this.handleChange} />
            <br />
            <label htmlFor="song">Song Title*</label>
            <br />
            <input type="text" id="song" onChange={this.handleChange} />
            <br />
            <label htmlFor="rating">Rating*</label>
            <br />
            <input type="number" id="rating" onChange={this.handleChange} />
            <br />
            <label htmlFor="iframe">iFrame (Embedded Code)</label>
            <br />
            <input type="text" id="iframe" onChange={this.handleChange} />
            <br />
            <label htmlFor="description">Review</label>
            <br />
            <input type="text" id="description" onChange={this.handleChange} />
            <br />
            <br />
            <input type="submit" value="Submit Review" />
          </form>
        </div>
        <ul>
          { this.state.songs.map( song => {
            return(
              <li>
                Artist: {song.artist}<br/>
                Title: {song.song}<br/>
                Rating: {song.rating}<br/>
                <iframe src={song.iframe} width="516" height="320" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe><br/>
                Review: {song.description}<br/>
              </li>
            )
          })}
        </ul>
>>>>>>> ebe82c508e2e3981e63f25e99a7cd59cc744d1e4
      </div>
    )
  }
}


ReactDOM.render(<App></App>, document.querySelector('main'))
