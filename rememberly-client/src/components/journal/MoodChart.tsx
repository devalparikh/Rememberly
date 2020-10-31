import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Journal.css';

import {
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend
} from 'recharts';

interface Props {
}

interface State {

}

// TODO: get real data from API call
const data = [
    { name: '10/15', mood: 3, habits: 4 },
    { name: '10/16', mood: 2, habits: 1 },
    { name: '10/22', mood: 4, habits: 4 },
    { name: '10/29', mood: 4, habits: 3 },
    { name: '10/30', mood: 3, habits: 2 },

];


class JournalCard extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
        };
    }

    render() {

        // Change size of graph based on broswer size
        let graphWidth = 350
        const mediaQuery = window.matchMedia('(min-width: 768px)');
        if (mediaQuery.matches) {
            console.log('desk')
            graphWidth = 600
        }
        mediaQuery.addListener((mq) => {
            if (mq.matches) {
                console.log('desk')
                graphWidth = 600
            }
        });

        return (
            <div>
                <div className="title">
                    Log
                </div>
                <div className="journal-graph-card">
                    {/* <LineChart width={600} height={300} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                        <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                    </LineChart> */}
                    <LineChart width={graphWidth} height={400} data={data}>
                        {/* Line graph for mood */}
                        <Line type="monotone" dataKey="mood" stroke="#8884d8" />
                        {/* Line graph for habits */}
                        <Line type="monotone" dataKey="habits" stroke="#B6CAD4" strokeDasharray="5 5" />

                        <XAxis dataKey="name" />
                        <Tooltip />
                        <Legend />


                    </LineChart>
                </div>
            </div>




        );
    }
}

export default JournalCard;