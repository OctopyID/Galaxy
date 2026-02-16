# Galaxy - Your Personal Dashboard

Galaxy is a modern, responsive, and Docker-ready personal service dashboard. It allows you to organize and access your self-hosted services, bookmarks, or important links in one beautiful interface.

![Galaxy Screenshot](public/galaxy.png)

## Features

- **Start Page**: Clean and minimal interface to access your services.
- **Service Management**: Add, edit, and categorize your services.
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile.
- **Dark Mode**: Native support for light and dark themes.
- **Search**: Instantly filter services by name or description.
- **Data Persistence**: Services are saved to a JSON file (or mounted volume).
- **Docker Ready**: Optimized for deployment with Docker and GitHub Container Registry (GHCR).

## Getting Started

The recommended way to deploy Galaxy is using Docker. You can use either Docker Compose or the Docker CLI.

### Option 1: Docker Compose (Recommended)

1.  **Create a `docker-compose.yml` file**:

    ```yaml
    services:
      galaxy:
        image: ghcr.io/octopyid/galaxy:latest
        container_name: galaxy
        restart: unless-stopped
        ports:
          - "1337:1337"
        volumes:
          - galaxy_data:/app/data

    volumes:
      galaxy_data:
    ```

2.  **Run the container**:

    ```bash
    docker compose up -d
    ```

3.  Access your dashboard at [http://localhost:1337](http://localhost:1337).

### Option 2: Docker CLI

If you prefer running a single command:

```bash
docker run -d \
  --name galaxy \
  --restart unless-stopped \
  -p 1337:1337 \
  -v galaxy_data:/app/data \
  ghcr.io/octopyid/galaxy:latest
```

## Security

If you discover any security related issues, please email bug@octopy.dev instead of using the issue tracker.

## Credits

- [Supian M](https://github.com/SupianIDz)
- [Octopy ID](https://github.com/OctopyID)

## License

The MIT License (MIT). Please see [License File](LICENSE) for more information.
