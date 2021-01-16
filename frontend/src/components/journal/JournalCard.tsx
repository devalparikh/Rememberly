import React from 'react';
import './Journal.css';
import Moods from './Moods';


interface Props {
    date: Date;
    mood: Moods;
    activities: string[];
    title: string;
    notes: string;
    timeAndDate?: boolean;
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

        let marginTop = "20px";
        if (this.props.timeAndDate) {
            marginTop = "140px";
        }

        let outlineClass = "";
        switch (this.props.mood) {
            case 0:
                outlineClass = "red-outline";
                break;
            case 1:
                outlineClass = "orange-outline";
                break;
            case 2:
                outlineClass = "gray-outline";
                break;
            case 3:
                outlineClass = "yellow-outline";
                break;
            case 4:
                outlineClass = "green-outline";

        }

        let JournalCardClass = `journal-card ${outlineClass}`;

        return (
            <div className="outer-journal-card" style={{ marginTop: `${marginTop}` }}>
                {/* <div>
                    {this.props.date.toLocaleTimeString([], {weekday: 'long'}).split(' ')[0]}
                </div> */}
                <div className="date-journal-card">
                    {
                        this.props.timeAndDate
                            ?
                            <div className="date-title-journal-card">
                                {this.props.date.toLocaleTimeString([], { weekday: 'long' }).split(' ')[0]}
                                , {this.props.date.toLocaleDateString()}
                            </div>
                            :
                            <div style={{ opacity: "0%" }}>
                                {/* {this.props.date.toLocaleTimeString([], { weekday: 'long' }).split(' ')[0]}
                                , {this.props.date.toLocaleDateString()} */}
                            </div>
                    }

                    <div>
                        {this.props.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                </div>
                <div className={JournalCardClass}>

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
                        {
                            this.props.notes
                                ?
                                <div>Notes : {this.props.notes}</div>
                                :
                                <div></div>
                        }
                    </div>
                </div>
            </div>

        );
    }
}

export default JournalCard;