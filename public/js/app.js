// console.log('hello');

class App extends React.Component{
  state={
    artist: '',
    song: '',
    rating: 0,
    iframe: '',
    description: '',
    songs: []
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
      songs: response.data
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

    return(
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
      </div>
    )
  }
}


ReactDOM.render(<App></App>, document.querySelector('main'))
