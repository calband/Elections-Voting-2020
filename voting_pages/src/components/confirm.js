// stolen from here lmao
// https://itnext.io/add-confirmation-dialog-to-react-events-f50a40d9a30d

import * as React from "react"
import {Dialog} from "@reach/dialog"
import "@reach/dialog/styles.css"

export default class Confirm extends React.Component {
    state = {
        open: false,
        callback: null
    };

    show = callback => event => {
        event.preventDefault();

        event = {
            ...event,
            target: {...event.target, value: event.target.value}
        };

        this.setState({
            open: true,
            callback: () => callback(event)
        })
    };

    hide = () => this.setState({open: false, callback: null});

    confirm = () => {
        this.state.callback();
        this.hide()
    };

    render() {
        return (
            <React.Fragment>
                {this.props.children(this.show)}

                {this.state.open && (
                    <Dialog>
                        {/*lol im too lazy to change the css someone pls fix this later*/}
                        <center>
                            <h1>{this.props.title}</h1>
                            <p>{this.props.description}</p>
                            <button onClick={this.hide}>Cancel</button>
                            &nbsp;
                            <button onClick={this.confirm}>Submit</button>
                        </center>
                    </Dialog>
                )}
            </React.Fragment>
        )
    }
};
