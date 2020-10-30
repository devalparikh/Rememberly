import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Journal.css';
import Moods from './Moods';


interface Props {
    date: Date;
    mood: Moods;
    activities: string[];
    title: string;
    notes: string;
}

interface State {

}

class JournalCard extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
        };
    }

    render() {
        return (
            <div className="outer-journal-card">
                <div className="date-journal-card">
                        <div>
                            {this.props.date.toLocaleDateString()}
                        </div>
                        <div>
                            {this.props.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                </div>
                <div className="journal-card ">

                    <div className="title-journal-card">
                        {this.props.title}
                    </div>
                    <div>
                        Mood: {Moods[this.props.mood]}
                    </div>
                    <div>
                        Activities: {this.props.activities.join(', ')}
                    </div>
                    <div>
                        Notes: {this.props.notes}
                    </div>
                </div>
            </div>

        );
    }
}

export default JournalCard;