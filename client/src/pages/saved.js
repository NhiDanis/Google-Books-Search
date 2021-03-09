import React, { Component } from 'react';
import Nav from "../components/Nav/nav";
import Jumbotron from "../components/Jumbotron/jumbotron";
import API from "../utils/APIs";
import SaveList from "../components/SavedList/saveList";

class Saved extends Component {

    state = {
        savedBooks: []
    }

    componentDidMount = () => {
        this.getBooks()
    }

    deleteGoogleBook = currentBook => {
        API.deleteBook( currentBook.id )
        .then(res => {
            console.log("You deleted this book:", res);
            this.getBooks();
        })
        .catch(err => {
            console.log("This is the error", err);
        })
    }

    getBooks = () => {
        API.getBooks()
        .then(res => {
            this.setState({
                savedBooks: res.data
            })
            console.log("This is the res from getBooks", res);
        })
        .catch(err => {
            console.log("This is the error", err);
        })
    }


    render() {
        return (
            <div>
                <Nav />
                <Jumbotron />
                {this.state.savedBooks.length ? (
                    <SaveList 
                    bookState={this.state.savedBooks}
                    deleteGoogleBook={this.deleteGoogleBook}
                    >
                    </SaveList>
                ) : (
                    <h5 style={{paddingTop:"30px"}}>No results to display</h5>
                )}
            </div>
        )
    }
}

export default Saved;
