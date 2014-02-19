def say_hello
  'Hello helper.'
end

def render_patrial(filename)
  file = File.join(Dir.pwd, 'src/views', filename)
  Haml::Engine.new(File.read(file)).render()
end