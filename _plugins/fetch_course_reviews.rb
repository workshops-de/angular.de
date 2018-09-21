Jekyll::Hooks.register :site, :after_init do |site|
  require 'rest-client'
  puts "Fetching course..."
  response = RestClient.get('https://workshops.de/api/course/4')
  File.write('_data/course.json', response.body)
  File.write('_includes/_course_reviews.json', response.body)
  puts "Fetching course...done"
end
