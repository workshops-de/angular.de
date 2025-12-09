Jekyll::Hooks.register :posts, :pre_render do |p|
  if p.content and p.content.include?("\t")
    puts "\n\n# Please don't use tabs!!!"
    puts p.path
    exit 1
  end
end

Jekyll::Hooks.register :pages, :pre_render do |p|
  if p.content and p.content.include?("\t")
    puts "\n\n# Please don't use tabs!!!"
    puts p.path
    exit 1
  end
end
