Jekyll::Hooks.register :site, :after_init do |site|
  require 'rest-client'
  response = RestClient.get('https://workshops.de/api/course/4/events')
  File.write('_data/events.json', response.body)
end
