# Yotubecast video server alternative

Streaming only alternative to [trevorsharp/youtubecast-videoserver](https://github.com/trevorsharp/youtubecast-videoserver)

## Usage

### Build

Simply clone this repo and build the image

```
git clone https://github.com/prolletto64/youtubecast-video-alternative.git
cd youtubecast-video-alternative
docker build -t youtubecast-video-alternative:latest .
```

### Usage

Once the image has been built, you can create a container.

1. Get a cookies.txt file from youtube and place it inside the current directory. Just follow the steps listed [here](https://github.com/trevorsharp/youtubecast-videoserver?tab=readme-ov-file#cookiestxt-optional)
2. Create a file named `docker-compos.yml` and write inside:
   ```
   services:
       youtubecast-video-alternative:
           image: youtubecast-video-server:latest
           ports:
               - 80:80
           volumes:
               - ./cookies.txt:/app/cookies.txt
   ```
3. Create the container running `docker compose up -d`

### Logs

If you want to chek the logs use `docker compose logs -f`

### Stop

To stop the container use `docker compose down`
