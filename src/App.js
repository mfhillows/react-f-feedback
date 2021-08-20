import { Component } from "react";

import Statistic from "./components/Statistic/Statistic";
import FeedbackOptions from "./components/FeedbackOptions/FeedbackOptions";
import Section from "./components/Section";
import Notification from "./components/Notification";

class App extends Component {
  state = { good: 0, neutral: 0, bad: 0 };

  incrementFeedback = (evt) => {
    this.setState((prevState) => {
      return { [evt.target.name]: prevState[evt.target.name] + 1 };
    });
  };

  render() {
    const feedback = this.state;

    const countTotalFeedback = () => {
      const values = Object.values(this.state);

      return values.reduce((acc, value) => acc + value, 0);
    };

    const total = countTotalFeedback();

    const countPositiveFeedbackPercentage = () => {
      return total > 0 ? (feedback.good / total) * 100 : 0;
    };

    const persentage = Math.round(countPositiveFeedbackPercentage());

    return (
      <>
        <Section title="Please leave feedback">
          <FeedbackOptions
            onLeaveFeedback={this.incrementFeedback}
          ></FeedbackOptions>
        </Section>
        <Section title="Please statistic for you">
          {total > 0 ? (
            <Statistic
              good={feedback.good}
              neutral={feedback.neutral}
              bad={feedback.bad}
              total={total}
              positivePercentage={persentage}
            ></Statistic>
          ) : (
            <Notification message="No feedback given"></Notification>
          )}
        </Section>
      </>
    );
  }
}

export default App;
