Jekyll::Hooks.register :site, :after_init do |site|
  require 'rest-client'
  puts "Fetching reviews..."
  response = RestClient.get('http://workshops.de/api/course/4')
  File.write('_includes/_course_reviews_jsonld.json', response.body)
  puts "Fetching reviews...done"
end
