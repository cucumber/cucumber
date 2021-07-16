After('@skip') do
  'skipped'
end

Given('a step') do
  # no-op
end

Given('a step that skips') do
  'skipped'
end