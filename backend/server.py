from flask import Flask, request, send_file
from flask_cors import CORS
from gtts import gTTS
import io

app = Flask(__name__)
CORS(app)

@app.route('/tts', methods=['GET'])
def tts():
    text = request.args.get('text')
    lang = request.args.get('lang', 'en')
    
    # Strip region code (e.g. 'kn-IN' -> 'kn') as gTTS expects 2-letter codes mostly
    if '-' in lang:
        lang = lang.split('-')[0]
    
    if not text:
        return {'error': 'No text provided'}, 400

    try:
        mp3_fp = io.BytesIO()
        tts = gTTS(text=text, lang=lang)
        tts.write_to_fp(mp3_fp)
        mp3_fp.seek(0)
        return send_file(mp3_fp, mimetype='audio/mpeg')
    except Exception as e:
        return {'error': str(e)}, 500

if __name__ == '__main__':
    print("Gram-Voice Backend Running on port 5000...")
    app.run(port=5000, debug=True)
