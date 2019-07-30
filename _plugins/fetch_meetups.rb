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
    'Angular-Kiel',
    'Angular-Meetup-Karlsruhe',
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

  File.write(filename, '[')
  meetups.each {
     |meetup|
     response = RestClient.get("https://api.meetup.com/#{meetup}?&sign=true&photo-host=public")
     File.write(filename, response.body, File.size(filename) , mode: 'a')
     File.write(filename, ',', File.size(filename) , mode: 'a')
    }
  File.write(filename, ']',File.size(filename)-1 , mode: 'a')


  puts "Fetching meetups...done"
end
