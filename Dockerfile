FROM repo.backbase.com/backbase-docker-releases/web-base:0.0.15

ARG application_name

COPY ./dist/apps/${application_name} /statics
