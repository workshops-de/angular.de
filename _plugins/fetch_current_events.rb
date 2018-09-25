Jekyll::Hooks.register :site, :after_init do |site|
  require 'rest-client'
  response = RestClient.get('https://workshops.de/api/course/4/events')
  File.write('_data/events/angular-intensiv.json', response.body)

  response = RestClient.get('https://workshops.de/api/course/23/events')
  File.write('_data/events/angular-advanced.json', response.body)
end
