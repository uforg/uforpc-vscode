# To make sure we have the deno binaries
FROM denoland/deno:debian-2.2.3 AS deno

# Set the base image
FROM node:22.14.0-bookworm

# Declare ARG to make it available in the RUN commands
ARG TARGETPLATFORM
RUN echo "Building for ${TARGETPLATFORM}"
RUN if [ "${TARGETPLATFORM}" != "linux/amd64" ] && [ "${TARGETPLATFORM}" != "linux/arm64" ]; then \
      echo "Unsupported architecture: ${TARGETPLATFORM}" && \
      exit 1; \
    fi

# Set the general environment variables, and move to temp dir
ENV DEBIAN_FRONTEND="noninteractive"
WORKDIR /app/temp

# Install deno from docker image
COPY --from=deno /usr/bin/deno /usr/local/bin/deno

# Install system dependencies
RUN apt update && \
    apt install -y wget curl zip unzip p7zip-full tzdata git && \
    rm -rf /var/lib/apt/lists/*

# Install nodejs global utilities
RUN npm install -g @vscode/vsce

# Go to the app dir, delete the temporary dir and create backups dir
WORKDIR /app
RUN rm -rf /app/temp

##############
# START HERE #
##############

# Add the startup script on every bash session
COPY .devcontainer/startup.sh /usr/local/bin/startup.sh
RUN echo "\n\n" >> /root/.bashrc && \
  cat /usr/local/bin/startup.sh >> /root/.bashrc

# Command just to keep the container running
CMD ["sleep", "infinity"]
