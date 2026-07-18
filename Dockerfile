FROM nginx:alpine-slim

COPY . /usr/share/nginx/html
RUN rm -f /usr/share/nginx/html/Dockerfile \
           /usr/share/nginx/html/docker-compose.yml \
           /usr/share/nginx/html/README.md \
           /usr/share/nginx/html/.gitignore \
           /usr/share/nginx/html/.dockerignore \
           /usr/share/nginx/html/Jelovnik.docx

EXPOSE 80
