from http.server import BaseHTTPRequestHandler
from urllib.parse import urlparse, parse_qs
from gtts import gTTS
import io
import json

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        # Parse query parameters
        query = parse_qs(urlparse(self.path).query)
        text = query.get('text', [None])[0]
        lang = query.get('lang', ['en'])[0]
        
        # Strip region code (e.g. 'kn-IN' -> 'kn')
        if lang and '-' in lang:
            lang = lang.split('-')[0]
        
        if not text:
            self.send_response(400)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps({'error': 'No text provided'}).encode())
            return
        
        try:
            mp3_fp = io.BytesIO()
            tts = gTTS(text=text, lang=lang)
            tts.write_to_fp(mp3_fp)
            mp3_fp.seek(0)
            
            self.send_response(200)
            self.send_header('Content-Type', 'audio/mpeg')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(mp3_fp.read())
        except Exception as e:
            self.send_response(500)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps({'error': str(e)}).encode())
