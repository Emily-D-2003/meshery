import github from 'gh';

const { sendComment } = github();

class MyReporter {
  async onBegin(config, suite) {
    if (process.env.CI) {
      await sendComment(`Starting ${suite.allTests()} E2E test`);
    } else {
      console.log(`Starting the run with ${suite.allTests().length} tests`);
    }
  }

  onTestBegin(test, result) {
    console.log(`Starting test ${test.title}, results: ${JSON.stringify(result)}`);
  }

  onTestEnd(test, result) {
    console.log(`Finished test ${test.title}: ${result.status}`);
  }

  async onEnd(result) {
    if (process.env.CI) {
      await sendComment(`Finished the E2E test: ${result}`);
    } else {
      console.log(`Finished the run: ${result.status}`);
    }
  }
}

export default MyReporter;
