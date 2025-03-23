Jekyll::Hooks.register :site, :after_init do |site|
  require 'rest-client'
  require 'json'
  require 'base64'
  require 'openssl'
  require 'jwt'  # You may need to add the 'jwt' gem to your Gemfile

  puts "Fetching meetups..."
  filename = '_data/meetups.json'

  # List of Angular meetups to fetch
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
    begin
      puts "Starting meetup data fetch process..."

      # JWT Flow requirements
      client_id = ENV['MEETUP_CLIENT_ID']
      private_key = ENV['MEETUP_PRIVATE_KEY']
      signing_key_id = ENV['MEETUP_SIGNING_KEY_ID']
      member_id = ENV['MEETUP_MEMBER_ID']

      if !private_key || !signing_key_id || !member_id
        puts "ERROR: Missing JWT requirements. Please set these environment variables:"
        puts "- MEETUP_PRIVATE_KEY: path to your private RSA key file"
        puts "- MEETUP_SIGNING_KEY_ID: the ID of your signing key from Meetup"
        puts "- MEETUP_MEMBER_ID: your Meetup member ID (must own the OAuth client)"
        return
      end

      begin
        puts "Using JWT authentication flow..."
        # Read the private key
        private_key = OpenSSL::PKey::RSA.new(private_key)

        # Create JWT payload
        payload = {
          iss: client_id,                            # Issuer - your client ID
          sub: member_id,                            # Subject - member ID the token is for
          aud: "api.meetup.com",                     # Audience - the API
          exp: Time.now.to_i + 120                   # Expiration - 2 minutes from now
        }

        # Create JWT headers
        headers = {
          kid: signing_key_id,                       # Key ID to identify which signing key
          typ: "JWT",                                # Type of token
          alg: "RS256"                               # Algorithm used
        }

        # Sign the JWT
        signed_jwt = JWT.encode(payload, private_key, 'RS256', headers)
        puts "JWT generated successfully"

        # Exchange JWT for access token
        token_response = RestClient.post(
          'https://secure.meetup.com/oauth2/access',
          {
            grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
            assertion: signed_jwt
          }
        )

        # Parse the response to get the access token
        token_data = JSON.parse(token_response.body)
        access_token = token_data['access_token']
        puts "Successfully exchanged JWT for access token"

      rescue => e
        puts "Error during JWT authentication: #{e.message}"
        puts e.backtrace
        return
      end

      puts "Using authentication token to access Meetup API"

      # GraphQL query to fetch group information
      query = <<~GRAPHQL
        query($urlname: String!) {
          groupByUrlname(urlname: $urlname) {
            name
            urlname
            link
            city
            customMemberLabel
            logo {
              source
            }
            memberships {
              count
            }
          }
        }
      GRAPHQL

      # Prepare empty JSON file
      File.write(filename, '[')
      meetup_count = 0

      # Process each meetup
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
              'Content-Type': 'application/json',
              'Authorization': "Bearer #{access_token}"
            }
          )

          result = JSON.parse(response.body)

          if result['data'] && result['data']['groupByUrlname']
            # Add the meetup data to our file
            File.write(filename, result['data']['groupByUrlname'].to_json, File.size(filename), mode: 'a')
            File.write(filename, ',', File.size(filename), mode: 'a')
            meetup_count += 1
            puts "✓ Successfully fetched data for #{meetup}"
          elsif result['errors']
            puts "Error in GraphQL response for #{meetup}: #{result['errors'][0]['message']}"
          else
            puts "No data found for meetup: #{meetup}"
          end

          # Add a small delay to avoid rate limiting (500 points per 60 seconds)
          sleep(0.5)

        rescue RestClient::ExceptionWithResponse => e
          puts "Error fetching meetup #{meetup}: #{e.message}"
          puts "Response body: #{e.response.body}" if e.response
        rescue StandardError => e
          puts "Unexpected error for meetup #{meetup}: #{e.message}"
        end
      end

      if meetup_count > 0
        # Remove the last comma and close the array
        File.write(filename, ']', File.size(filename)-1, mode: 'a')
        puts "Fetching meetups...done! Successfully fetched #{meetup_count} meetups."
      else
        # If no meetups were found, create an empty array
        File.write(filename, '[]', 0)
        puts "Fetching meetups...done! No meetups were successfully fetched."
      end
    rescue StandardError => e
      puts "Error during script execution: #{e.message}"
      puts e.backtrace
    end
  else
    puts "JEKYLL_ENV NOT PRODUCTION - Meetup fetch aborted"
  end
end
