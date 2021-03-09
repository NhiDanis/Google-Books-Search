import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron/jumbotron";
import Nav from "../components/Nav/nav";
import { Input, SubmitBtn} from "../components/Search/search";
import API from "../utils/APIs";
import ResultList from "../components/ResultList/resultList";


class Home extends Component {
    
    state = {
        books: [],
        search: ""
    };
    searchBooks = () => {
        API.googleBooks(this.state.search)
            .then(res => {
                console.log("This is res.data", res.data.items)
                this.setState({
                books: res.data.items,
                search: ""
            })})
            .catch(err => console.log(err));
            
    };

    handleInputChange = event => {
        const {name, value} = event.target;
        this.setState({
            [name]: value
        });
    };

    handleFormSubmit = event => {
        event.preventDefault();
        this.searchBooks();
    };

    saveGoogleBook = currentBook => {
        console.log("This is the current book", currentBook);
        API.saveBook({
            id: currentBook.id,
            title: currentBook.title,
            authors: currentBook.authors,
            description: currentBook.description,
            image: currentBook.image,
            link: currentBook.link
        })
        .then(res => console.log("Successful POST to DB!", res))
        .catch(err => console.log("this is the error", err));
    }



    render() {
    return (
        <div>
            <Nav />
            < Jumbotron />

            <form>
                    <h5 style={{paddingTop:"30px", fontSize:"40px", textAlign:"center"}}>Search for books</h5>
                    <Input style={{with:"300px"}}
                        value={this.state.search}
                        onChange={this.handleInputChange}
                        name="search"
                        placeholder="e.g. The Secret"
                    />
                    <SubmitBtn onClick={this.handleFormSubmit}/>
                </form>

                {this.state.books.length ? (
                    <ResultList 
                    bookState={this.state.books}
                    saveGoogleBook={this.saveGoogleBook}>
                    </ResultList>
                ) : (
                    <div>
                        <hr/>
                    <p style={{fontStyle: "italic"}}>No results to display</p>
                    </div>
                )}
        </div>
    );
    };
};

export default Home;
