Jekyll::Hooks.register :site, :after_init do |site|
  require 'rest-client'
  puts "Fetching meetups..."
  filename = '_data/meetups.json'

  meetups = [
    'AngularJS-Meetup-Berlin',
    'angular-users-stuttgart',
    'Angular-Ruhr',
    'Angular-Meetup-Leipzig',
    'Angular-Frankfurt',
    'angular-cologne',
    'angular-heidelberg',
    'Angular-Meetup-Dresden',
    'Angular-Munich',
    'Swiss-Angular',
    'Angular-Vienna',
    'Hamburg-AngularJS-Meetup',
    'NgNiederrhein',
    'Angular-Meetup-Graz',
    'ngGirls-RheinNeckar',
    'niederrhein-valley',
  ]

  if(ENV["JEKYLL_ENV"] == "production") then
    File.write(filename, '[')
    meetups.each {
      |meetup|
      request = RestClient::Request.new(
        method: :get,
        url: "https://api.meetup.com/#{meetup}?&sign=true&photo-host=public")
      response = request.execute {|response| response}
      case response.code
        when 200
          File.write(filename, response.body, File.size(filename) , mode: 'a')
          File.write(filename, ',', File.size(filename) , mode: 'a')
        when 404
          puts "Meetup not available anymore: " + meetup
      end
      }
    File.write(filename, ']',File.size(filename)-1 , mode: 'a')


    puts "Fetching meetups...done"
  else
    puts "JEKYLL_ENV NOT PRODUCTION - Meetup fetch aborted"
  end
end
