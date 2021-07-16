require 'cucumber/messages'
require 'cucumber/progress_formatter'

describe Cucumber::ProgressFormatter::Formatter do
  let(:subject) { Cucumber::ProgressFormatter::Formatter.new(out) }
  let(:out) { StringIO.new }

  context '.process_message' do
    def make_test_step_finished(status)
      test_step_finished = Cucumber::Messages::Envelope.new({
        test_step_finished: Cucumber::Messages::TestStepFinished.new(
          test_step_result: Cucumber::Messages::TestStepResult.new(
            status: status
          )
        )
      })
    end

    let(:passed) { make_test_step_finished(Cucumber::Messages::TestStepResult::Status::PASSED) }
    let(:failed) { make_test_step_finished(Cucumber::Messages::TestStepResult::Status::FAILED) }

    let(:test_run_finished) {
      Cucumber::Messages::Envelope.new({
        test_run_finished: Cucumber::Messages::TestRunFinished.new()
      })
    }

    let(:test_case) {
      Cucumber::Messages::Envelope.new({
        test_case: Cucumber::Messages::TestCase.new({
          id: 'test-case-id',
          test_steps: [
            Cucumber::Messages::TestCase::TestStep.new({
              id: 'hook-step-id',
              hook_id: 'some-hook-id'
            })
          ]
        })
      })
    }

    let(:hook_step) {
      Cucumber::Messages::Envelope.new({
        test_step_finished: Cucumber::Messages::TestStepFinished.new(
          test_step_id: test_case.test_case.test_steps.first.id,
          test_step_result: Cucumber::Messages::TestStepResult.new(
            status: Cucumber::Messages::TestStepResult::Status::FAILED
          )
        )
      })
    }

    it 'prints a . for passed step' do
      subject.process_message(passed)
      expect(out.string).to eq('.')
    end

    it 'prints a F for failed step' do
      subject.process_message(failed)
      expect(out.string).to eq('F')
    end

    it 'does nothing when message is not a Cucumber::Messages::TestStepFinished' do
      subject.process_message(Cucumber::Messages::Envelope.new())
      expect(out.string).to be_empty
    end

    it 'does not print status of Hook steps' do
      subject.process_message(test_case)
      subject.process_message(hook_step)
      expect(out.string).to be_empty
    end

    it 'does not add line break between messages' do
      subject.process_message(passed)
      subject.process_message(passed)
      subject.process_message(failed)

      expect(out.string).to eq('..F')
    end

    it 'adds a line return after TestRunFinished message is received' do
      subject.process_message(passed)
      subject.process_message(passed)
      subject.process_message(failed)
      subject.process_message(test_run_finished)

      expect(out.string).to eq("..F\n")
    end
  end
end