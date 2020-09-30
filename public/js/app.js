// console.log('hello');

class App extends React.Component {
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
      songs: response.data,
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
      <div className="container">
      <div className='create'>
        <h2>Submit a Song Review</h2>
        <form onSubmit={this.handleSubmit}>
          *Required fields<br/>
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
          <input type="number" min='0' max='10' id="rating" onChange={this.handleChange} />
          <br />
          <label htmlFor="iframe">iFrame Address (Embedded SRC Code)</label>
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
                <h6>Artist: {song.artist}</h6>
                <h6>Title: {song.song}</h6>
                <h6>Rating: {song.rating}</h6>
                <iframe src={song.iframe} width="560" height="320" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe><br/>
                <h6>Review: {song.description}</h6>
                <details>
                  <summary>Edit this Review</summary>
                  <form id={song._id} onSubmit={this.updateSong}>
                    <label htmlFor="artist">Artist</label>
                    <br />
                    <input
                      type="text"
                      id="artist"
                      onChange={this.handleChange}
                      value={this.state.artist}
                    />
                    <br />
                    <label htmlFor="song">Song Title</label>
                    <br />
                    <input
                      type="text"
                      id="song"
                      onChange={this.handleChange}
                      value={this.state.song}
                    />
                    <br />
                    <label htmlFor="rating">Rating</label>
                    <br />
                    <input
                      type="number"
                      min='0'
                      max='10'
                      id="rating"
                      onChange={this.handleChange}
                      value={this.state.rating}
                    />
                    <br />
                    <label htmlFor="iframe">iFrame Address (Embedded SRC Code)</label>
                    <br />
                    <input
                      type="text"
                      id="iframe"
                      onChange={this.handleChange}
                      value={this.state.iframe}
                    />
                    <br />
                    <label htmlFor="description">Description</label>
                    <br />
                    <input
                      type="text"
                      id="description"
                      onChange={this.handleChange}
                      value={this.state.description}
                    />
                    <br />
                    <input type="submit" value="Update Review" /><br/>
                    <button value={song._id} onClick={this.deleteSong}>
                      DELETE
                    </button>
                  </form>
                </details>
              </li>
            )
          })}
        </ul>

      </div>
    )
  }
}


ReactDOM.render(<App></App>, document.querySelector('main'))
