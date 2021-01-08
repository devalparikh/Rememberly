import React, { useEffect, useState } from 'react';
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
    checkins: any;
}

// let data = [
//     { name: '10/15', mood: 3, habits: 4 },
//     { name: '10/16', mood: 2, habits: 1 },
//     { name: '10/22', mood: 4, habits: 4 },
//     { name: '10/29', mood: 4, habits: 3 },
//     { name: '10/30', mood: 3, habits: 2 },
// ];

export function JournalCard(props: Props) {

    const { checkins } = props;

    const [data, setData] = useState([{ name: '10/15', mood: 3, habits: 4 }]);

    useEffect(() => {

        // Populate the checkin data the chart shows
        processCheckinData();

    }, [checkins]);

    const processCheckinData = () => {

        // Store processed data points
        let temp = [];
        // Count how many checkins for that day
        let same_date_counter = 0;
        // Sum the moods for the checkins for that day
        let same_date_mood_sum = 0;

        for (let i = 0; i < checkins.length; i++) {
            const { createdAt, mood } = checkins[i];

            if (i > 0) {

                if (new Date(createdAt).toLocaleDateString() === new Date(checkins[i - 1].createdAt).toLocaleDateString()) {
                    // Checkin is from the same day as previous checkin

                    same_date_counter++;
                    same_date_mood_sum += mood;

                    // Update average mood value of previous data point
                    // @ts-ignore
                    temp[temp.length - 1]['mood'] = (same_date_mood_sum / same_date_counter);

                    // Only add new checkin to temp if it's the last one
                    if (i !== checkins.length - 1) {
                        continue;
                    }
                }
            }

            // Reset counter
            same_date_counter = 1;
            // Reset sum
            same_date_mood_sum = mood;

            // Add data point
            temp.push({
                name: new Date(createdAt).toLocaleDateString(),
                mood: mood,
                habits: 3
            });

            // @ts-ignore
            setData([...temp].reverse());
        }
    }

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

export default JournalCard;