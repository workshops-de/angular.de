Jekyll::Hooks.register :site, :after_init do |site|
  require 'rest-client'
  if(ENV["JEKYLL_ENV"] != "local") then
    puts "Fetching trainers..."

    response = RestClient.get('https://workshops.de/api/portal/angular-de/trainers')
    File.write('_data/trainers.json', response.body)

    response = RestClient.get('https://workshops.de/api/course/4/trainers')
    File.write('_data/course_trainers/angular-intensiv.json', response.body)

    response = RestClient.get('https://workshops.de/api/course/23/trainers')
    File.write('_data/course_trainers/angular-enterprise-applications.json', response.body)

    response = RestClient.get('https://workshops.de/api/course/29/trainers')
    File.write('_data/course_trainers/nestjs.json', response.body)

    response = RestClient.get('https://workshops.de/api/course/28/trainers')
    File.write('_data/course_trainers/rxjs.json', response.body)

    response = RestClient.get('https://workshops.de/api/course/4/trainers')
    File.write('_data/course_trainers/angular-remote.json', response.body)

    response = RestClient.get('https://workshops.de/api/course/26/trainers')
    File.write('_data/course_trainers/html-css.json', response.body)

    puts "Fetching trainers...done"
  end
end
