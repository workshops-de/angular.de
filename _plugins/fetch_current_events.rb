Jekyll::Hooks.register :site, :after_init do |site|
  require 'rest-client'
  response = RestClient.get('http://workshops.de/api/events')
  File.write('_data/events.json', response.body)
end
