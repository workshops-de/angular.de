Jekyll::Hooks.register :site, :after_init do |site|
  require 'rest-client'
  if(ENV["JEKYLL_ENV"] != "local") then
    puts "Fetching events..."

    response = RestClient.get('https://workshops.de/api/course/4/events')
    File.write('_data/events/angular-intensiv.json', response.body)

    response = RestClient.get('https://workshops.de/api/course/4/related-events')
    File.write('_data/related_events/angular-intensiv.json', response.body)

    response = RestClient.get('https://workshops.de/api/course/23/events')
    File.write('_data/events/angular-enterprise-applications.json', response.body)

    response = RestClient.get('https://workshops.de/api/course/23/related-events')
    File.write('_data/related_events/angular-enterprise-applications.json', response.body)

    response = RestClient.get('https://workshops.de/api/course/29/events')
    File.write('_data/events/nestjs.json', response.body)

    response = RestClient.get('https://workshops.de/api/course/29/related-events')
    File.write('_data/related_events/nestjs.json', response.body)

    response = RestClient.get('https://workshops.de/api/course/28/events')
    File.write('_data/events/rxjs.json', response.body)

    response = RestClient.get('https://workshops.de/api/course/28/related-events')
    File.write('_data/related_events/rxjs.json', response.body)

    response = RestClient.get('https://workshops.de/api/course/4/events')
    File.write('_data/events/angular-remote.json', response.body)

    response = RestClient.get('https://workshops.de/api/course/4/related-events')
    File.write('_data/related_events/angular-remote.json', response.body)

    response = RestClient.get('https://workshops.de/api/course/26/events')
    File.write('_data/events/html-css.json', response.body)

    response = RestClient.get('https://workshops.de/api/course/26/related-events')
    File.write('_data/related_events/html-css.json', response.body)

    puts "Fetching events...done"
  end
end
