echo "Starting Reddit TTS"

exec npm run start

echo "Done fetching and generating responses"

echo "Starting video generation"

exec python editor.py