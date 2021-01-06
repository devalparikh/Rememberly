import React from 'react';
import './Journal.css';
import Moods from './Moods';


interface Props {
    date: Date;
    mood: Moods;
    activities: string[];
    title: string;
    notes: string;
    timeOnly?: boolean;
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
        const moodEmojis = ["😕", "😐", "🙂", "😀", "😁"]

        return (
            <div className="outer-journal-card">
                <div className="date-journal-card">
                    {
                        this.props.timeOnly
                            ?
                            <div>
                                {this.props.date.toLocaleDateString()}
                            </div>
                            :
                            <div></div>
                    }

                    <div>
                        {this.props.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                </div>
                <div className="journal-card">

                    <div className="title-journal-card">
                        {this.props.title}
                    </div>
                    <div>
                        Mood: {moodEmojis[this.props.mood]} {Moods[this.props.mood]}
                    </div>
                    <div>
                        <div className="activity-area ">
                            Activities:
                            {
                                this.props.activities.map((curActivity, index) => {
                                    return (
                                        <div className="activity">{curActivity}</div>
                                    );
                                })
                            }
                        </div>
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