import React from 'react';
import './CreateJournal.css';

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

        const { name } = this.props;

        return (
            <div className="bg">
                <div className="exit-btn-area">
                    <Button href="/journal" variant="custom">Exit</Button>
                </div>
                <div className="title-create">Hey, {name}. How are you today?</div>
                <div className="continue-btn-area">
                    <Button href="/journal/create/mood" variant="custom">Continue</Button>
                </div>

            </div>

        );
    }
}

export default Createjournal;