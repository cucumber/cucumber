Given('a background step') do
  raise StandardError, 'Background should not be executed with empty scenario'
end

Before do
  raise StandardError, 'Before hooks should not be executed with empty scenario'
end

After do
  raise StandardError, 'After hooks should not be executed with empty scenario'
end