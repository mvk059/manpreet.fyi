# Use a more recent Hugo image that includes Dart Sass
FROM hugomods/hugo:dart-sass

# Install git and other necessary tools
RUN apk add --no-cache git

# Set the working directory in the container
WORKDIR /src

# Copy the entire project into the container
COPY . .

# Build the Hugo site, explicitly specifying the config file
RUN hugo --config hugo.toml --minify

# Use a nginx alpine image for serving the static files
FROM nginx:alpine

# Copy the generated static files from the Hugo build to nginx's serving directory
COPY --from=0 /src/public /usr/share/nginx/html

# Expose port 80
EXPOSE 3000

# Start nginx
CMD ["nginx", "-g", "daemon off;"]