Jekyll::Hooks.register :site, :after_init do |site|
  require 'rest-client'
  require 'json'
  puts "Fetching meetups..."
  filename = '_data/meetups.json'

  # Meetup.com OAuth credentials - these should be set as environment variables
  client_id = ENV['MEETUP_CLIENT_ID']
  client_secret = ENV['MEETUP_CLIENT_SECRET']

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
    if(client_id && client_secret) then
      begin
        token_response = RestClient.post(
          'https://api.meetup.com/oauth/access',
          {
            client_id: client_id,
            client_secret: client_secret,
            grant_type: 'client_credentials',
            scope: 'basic'
          }
        )

        token = JSON.parse(token_response.body)['access_token']

        # GraphQL query to fetch group information
        query = <<~GRAPHQL
          query($urlname: String!) {
            groupByUrlname(urlname: $urlname) {
              id
              name
              urlname
              description
              link
              members
              created
              organizer {
                id
                name
              }
              groupPhoto {
                id
                baseUrl
              }
              keyPhoto {
                id
                baseUrl
              }
              nextEvent {
                id
                name
                time
                duration
                venue {
                  name
                  address1
                  city
                  state
                  country
                }
              }
            }
          }
        GRAPHQL

        File.write(filename, '[')
        meetups.each do |meetup|
          begin
            puts "Fetching data for meetup: #{meetup}"
            response = RestClient.post(
              'https://api.meetup.com/gql',
              {
                query: query,
                variables: { urlname: meetup }
              }.to_json,
              {
                'Content-Type' => 'application/json',
                'Authorization' => "Bearer #{token}"
              }
            )

            if response.code == 200
              result = JSON.parse(response.body)
              if result['data'] && result['data']['groupByUrlname']
                File.write(filename, result['data']['groupByUrlname'].to_json, File.size(filename), mode: 'a')
                File.write(filename, ',', File.size(filename), mode: 'a')
                puts "Successfully fetched data for #{meetup}"
              else
                puts "No data found for meetup: #{meetup}"
              end
            end
          rescue RestClient::ExceptionWithResponse => e
            puts "Error fetching meetup #{meetup}: #{e.message}"
            puts "Response body: #{e.response.body}"
          rescue StandardError => e
            puts "Unexpected error for meetup #{meetup}: #{e.message}"
          end
        end

        # Remove the last comma and close the array
        File.write(filename, ']', File.size(filename)-1, mode: 'a')
        puts "Fetching meetups...done"
      rescue RestClient::ExceptionWithResponse => e
        puts "Error during OAuth token request: #{e.message}"
        puts "Response body: #{e.response.body}"
      rescue StandardError => e
        puts "Unexpected error during OAuth token request: #{e.message}"
      end
    else
      puts "NO ENV MEETUP_CLIENT_ID AND MEETUP_CLIENT_SECRET SET - Meetup fetch aborted"
    end
  else
    puts "JEKYLL_ENV NOT PRODUCTION - Meetup fetch aborted"
  end
end
