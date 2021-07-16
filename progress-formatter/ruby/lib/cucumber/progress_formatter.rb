require 'cucumber/messages'

module Cucumber
  module ProgressFormatter
    class Formatter
      def initialize(out)
        @out = out
        @hook_step_ids = []
      end

      def process_message(envelope)
        if envelope.test_run_finished
          @out.puts('')
          return
        end

        if envelope.test_case
          envelope.test_case.test_steps.each do |step|
            @hook_step_ids << step.id unless step.hook_id.empty?
          end
        end

        return unless envelope.test_step_finished
        return if @hook_step_ids.include?(envelope.test_step_finished.test_step_id)

        @out.print(CHARS[envelope.test_step_finished.test_step_result.status])
        @out.flush
      end

      CHARS = {
        Cucumber::Messages::TestStepResult::Status::PASSED => '.',
        Cucumber::Messages::TestStepResult::Status::FAILED => 'F',
        Cucumber::Messages::TestStepResult::Status::UNDEFINED => 'U',
        Cucumber::Messages::TestStepResult::Status::PENDING => 'P',
        Cucumber::Messages::TestStepResult::Status::AMBIGUOUS => '-'
      }
    end
  end
end
