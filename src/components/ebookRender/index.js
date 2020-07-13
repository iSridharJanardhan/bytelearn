import React from "react";
import {
    CircularProgress,
    Paper,
    Grid, 
    Button
} from "@material-ui/core";
import { ReactReader } from "react-reader";


class EBookRender extends React.Component{
    state = {
        selectedBook : {}
    }

    componentDidMount(){
        this.setState({
            selectedBook: this.props.books[0],
            selectedBookIndex : 0
        })
    }

    _generateContent = () => {
        return(
            <Grid container spacing={2}>
                <Grid item lg={5}> 
                    <div
                    style={{
                        height:"70vh",
                        overflowY:"auto"
                    }}
                    >
                        {
                            this.props.books && 
                            this.props.books.length && 
                            this.props.books.map( (book, index) => {
                                return(
                                    <Paper 
                                    onClick={() => {
                                        this.setState({
                                        selectedBook:book,
                                        selectedBookIndex: index
                                    })}}
                                    style={
                                        this.state.selectedBookIndex == (index || 0) ?
                                        {
                                            padding: "10px",
                                            margin: "10px",
                                            cursor: "pointer",
                                            color: "white",
                                            fontWeight: "500",
                                            backgroundColor: "#3f51b5"
                                        }
                                        :
                                        {
                                            padding: "10px",
                                            margin: "10px",
                                            cursor: "pointer",
                                            color: "",
                                            fontWeight: "500"
                                        }
                                        
                                        } elevation={3}>
                                        <a style={{
                                            verticalAlign:"middle",
                                            lineHeight:"90px",
                                            margin:"auto",
                                            textDecoration:"none"
                                        }}
                                        
                                        >
                                            {book.name.replace(".mobi","").replace(".epub", "")}
                                        </a>
                                    </Paper>
                                )
                            }

                            )
                            

                        }
                    </div>
                </Grid>
                <Grid item lg={7} >
                        <Button color="primary" variant="contained" href={`http://files.bytelabs.ml/${this.state.selectedBook.path}`}>
                                Download
                        </Button>
                        {
                            this.state.selectedBook.name &&
                            this.state.selectedBook.name.includes(".epub") &&
                            <ReactReader
                                url={`http://files.bytelabs.ml/${this.state.selectedBook.path}`}
                                title={this.state.selectedBook.name.replace(".epub")}
                                showToc={false}
                                />
                        }
                </Grid>
            </Grid>
        )
    }

    render(){
        return(
            <>
                {this._generateContent()}
            </>
       )
    }
}

export default EBookRender