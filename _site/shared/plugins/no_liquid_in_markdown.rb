module Jekyll
  class Document
    def markdown_file?
      ".md" == extname || ".markdown" == extname
    end

    def render_with_liquid?
      !(coffeescript_file? || yaml_file? || markdown_file?)
    end
  end
end

