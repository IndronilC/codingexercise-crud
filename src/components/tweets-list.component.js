import React, { Component } from "react";
import TweetsDataService from "../services/tweets.services";
import { Link } from "react-router-dom";

export default class TweetsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveTweets = this.retrieveTweets.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveTweets = this.setActiveTweets.bind(this);
    this.removeTweets = this.removeTweets.bind(this);
    this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      tweets: [],
      currentTweet: null,
      currentIndex: -1,
      searchTitle: ""
    };
  }

  componentDidMount() {
    this.retrieveTweets();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  retrieveTweets() {
    TweetsDataService.getAll()
      .then(response => {
        this.setState({
          tweets: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveTweets();
    this.setState({
      currentTweet: null,
      currentIndex: -1
    });
  }

  setActiveTweets(tweets, index) {
    this.setState({
      currentTweet: tweets,
      currentIndex: index
    });
  }

  removeTweets() {
    TweetsDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchTitle() {
    this.setState({
      currentTweet: null,
      currentIndex: -1
    });

    TweetsDataService.findByTitle(this.state.searchTitle)
      .then(response => {
        this.setState({
          tweets: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchTitle, tweets: tweets, currentTweet: currentTweet, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchTitle}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Tweets List</h4>

          <ul className="list-group">
            {tweets &&
              tweets.map((tweets, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveTweets(tweets, index)}
                  key={index}
                >
                  {tweets.text}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeTweets}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentTweet ? (
            <div>
              <h4>Tweet</h4>
              <div>
                <label>
                  <strong>Text:</strong>
                </label>{" "}
                {currentTweet.text}
              </div>
              <div>
                <label>
                  <strong>Source:</strong>
                </label>{" "}
                {currentTweet.source}
              </div>
              <div>
                <label>
                  <strong>Created At:</strong>
                </label>{" "}
                {currentTweet.created_at}
              </div>

              <Link
                to={"/tweets/" + tweets.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Tweet...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}