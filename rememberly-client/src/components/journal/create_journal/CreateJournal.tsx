import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CreateJournal.css';

import ProgressBar from 'react-bootstrap/ProgressBar'
import { Button } from 'react-bootstrap';


interface Props {
    name: string;
}

interface State {

}


class Createjournal extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
        };
    }

    render() {


        return (
            <div className="bg">
                <div className="exit-btn-area">
                    <Button href="/journal" variant="exit">Exit</Button>
                </div>
                <div className="title-create">Hey, {this.props.name}. How are you today?</div>
                <div className="continue-btn-area">
                    <Button href="/journal/mood" variant="exit">Continue</Button>
                </div>


            </div>




        );
    }
}

export default Createjournal;