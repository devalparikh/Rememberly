import React from 'react';
import './CreateJournal.css';
import { Button } from 'react-bootstrap';
import RangeSlider from 'react-bootstrap-range-slider';
import Moods from '../Moods';

interface Props {
}

interface State {
    val: number;
}



class CreatejournalMood extends React.Component<Props, State> {
    state: State = {
        val: 2,
    }

    handleChange = (field: string) => (event: any) => {
        this.setState({ [field]: event.target.value } as Pick<State, any>);
    };

    moodSliderLabel = () => {
        return Moods[this.state.val];
    }


    render() {

        const { val } = this.state;
        const numOfMoods = Object.keys(Moods).length / 2;
        const moodEmojis = ["😕", "😐", "🙂", "😀", "😁"]

        return (
            <div className="bg">
                <div className="navigation-btn-area">
                    
                    <div className="back-btn-area">
                    <Button href="/journal/create" variant="custom">Back</Button>
                    </div>

                    <div className="exit-btn-area">
                        <Button href="/journal" variant="custom">Exit</Button>
                    </div>
                    
                </div>
                <div className="title-create">How are you today?</div>
                <div className="continue-btn-area">
                </div>


                <div className="title-mood">{moodEmojis[val]}</div>
                <div className="title-mood">{Moods[val]}</div>

                <div className="mood-slider">
                    <RangeSlider
                        value={val}
                        max={numOfMoods - 1}
                        size="lg"
                        variant="light"
                        tooltipLabel={this.moodSliderLabel}
                        onChange={this.handleChange('val')}
                    />

                </div>

                <Button href="/journal/create/mood" variant="custom">Continue</Button>

            </div>

        );
    }
}

export default CreatejournalMood;