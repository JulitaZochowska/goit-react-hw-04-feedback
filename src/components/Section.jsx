import { useState } from 'react';
import Statistics from './Statistics';
import FeedbackOptions from './FeedbackOptions';
import Notification from './Notification';
import PropTypes from 'prop-types';

export const Section = ({ title }) => {
  const [state, setState] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const countTotalFeedback = () => state.good + state.neutral + state.bad;
  const countPositiveFeedbackPercentage = () =>
    100 * (state.good / countTotalFeedback());

  const updateStats = value => {
    setState(prevState => ({
      ...prevState,
      [value]: prevState[value] + 1,
    }));
  };

  return (
    <div>
      <h1>{title}</h1>
      <FeedbackOptions
        options={['good', 'neutral', 'bad']}
        onLeaveFeedback={updateStats}
      />
      <h2>Statistic</h2>
      {countTotalFeedback() === 0 ? (
        <Notification message="There is no feedback" />
      ) : (
        <Statistics
          good={state.good}
          neutral={state.neutral}
          bad={state.bad}
          total={countTotalFeedback()}
          positivePercentage={countPositiveFeedbackPercentage()}
        />
      )}
    </div>
  );
};

Section.propTypes = {
  title: PropTypes.string,
};

export default Section;
