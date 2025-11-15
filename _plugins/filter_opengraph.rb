require 'fileutils'
require 'rest-client'
require 'rickshaw'
require 'cgi'

module Jekyll
  class OGFilter < Liquid::Tag
    def initialize(tag_name, text, tokens)
      super
      @enabled = ENV["JEKYLL_ENV"] == "production";
      # @enabled = true;
      @outputDir = text.strip.length > 0 ? text.strip + '/' : '';
    end

    private

    def is_external_url?(url)
      url.start_with?('http://', 'https://')
    end

    def resolve_background_image(context)
      if context["page"]["header_image"]
        header_image = context["page"]["header_image"]
        if is_external_url?(header_image)
          header_image
        else
          # Local image path - combine with the page's directory
          "#{File.expand_path("..", context["page"]["path"])}/#{header_image}"
        end
      else
        "#{Dir.pwd}/opengraph/default.png"
      end
    end

    public

    def render(context)
      if(@enabled) then
        # This creates an image id hash from the page id in Jekyll
        slug = context["page"]["slug"]
        id = context["page"]["id"].to_sha1
        filename = "#{slug}_#{id}"

        unless(File.directory?("#{Dir.pwd}/opengraph/#{@outputDir}"))
          FileUtils.mkdir_p "#{Dir.pwd}/opengraph/#{@outputDir}"
        end

        # Check if the file already exists in the 'opengraph' foldler, return early if it does
        if(File.exist?("#{Dir.pwd}/opengraph/#{@outputDir}#{filename}.jpg"))
          # puts "File exists #{Dir.pwd}/opengraph/#{filename}.jpg"
        else
          # Using Node Canvas
          # the script to be called with the formatted title, and resolving filename
          background = resolve_background_image(context)
          script = "node #{Dir.pwd}/opengraph.js -t \"#{CGI.unescapeHTML(context["page"]["title"])}\" -d '#{context["page"]["date"].strftime("%e %B %Y")}' -a '#{context["page"]["author"]}' -b '#{background}' -o '#{Dir.pwd}/opengraph/#{@outputDir}#{filename}.jpg'"

          # Debug logging
          puts "OG Filter: Processing #{context["page"]["title"]}"
          puts "OG Filter: Background image: #{background} #{is_external_url?(background) ? '(external)' : '(local)'}"
          puts "OG Filter: Command: #{script}"

          # Execute the script and capture the result
          result = system(script)
          unless result
            puts "OG Filter: Warning - opengraph.js execution failed for #{filename}"
          end
        end

        # Get the site variable
        site = context.registers[:site]

        # Add the file to the list of static_files needed to be copied to the _site
        site.static_files << Jekyll::StaticFile.new(site, site.source, "/opengraph/#{@outputDir}", "#{filename}.jpg")

        "/opengraph/#{@outputDir}#{filename}.jpg"
      else
        "/opengraph/default.png"
      end
    end
  end
end
Liquid::Template.register_tag('og_filter', Jekyll::OGFilter)
