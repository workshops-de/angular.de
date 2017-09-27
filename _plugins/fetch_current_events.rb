Jekyll::Hooks.register :site, :after_init do |site|
  require 'rest-client'
  response = RestClient.get('http://workshops.de/api/events')
  File.write('_includes/_events_jsonld.json', response.body)
end
