# HIVA Kyrgyz speech recognition (alpha)

Kyrgyz speech recognition that runs entirely in the browser. Audio is processed on your
device with [vosk-browser](https://github.com/ccoreilly/vosk-browser) (WebAssembly) and is
never uploaded.

**Live demo:** https://data-analysis-and-research-institute.github.io/hiva-vosk-asr-alpha/

- Microphone input with live text, or upload an audio file (any format the browser can decode).
- The model (about 60 MB) downloads on the first visit and is then cached by the browser.
- Output is lower-case Kyrgyz Cyrillic without punctuation; numbers come out as words.

## Model

`model/vosk-model-ky-small.tar.gz` is a Vosk small model: a Kaldi chain TDNN-F acoustic model
with a lookahead graph, also usable on phones and a Raspberry Pi through the regular Vosk API.

Training data:
- about 255 hours of read speech recorded through hiva.alatoo.edu.kg (Ala-Too International University);
- the train and dev splits of FLEURS ky_kg;
- Common Voice 27.0 Kyrgyz (test speakers and sentences excluded).

The lexicon has about 676,000 words. The language model is a 3-gram built from the Leipzig Corpora Collection, the Manas-UdS Kyrgyz Corpus and the Kyrgyz News Corpus.

Word error rate (lower is better):

| Test set | WER |
|---|---|
| Common Voice 17 test | 14.5% |
| FLEURS test (sentences without digits) | 14.0% |
| HIVA test (unseen speakers and sentences) | 27.5% |

This is an alpha release. A larger server-side model is more accurate.

## Licence

The model and this demo are released under
[CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/), for non-commercial use only,
because the language model is built from corpora licensed for non-commercial use.
vosk-browser and Vosk are Apache 2.0.

## Running it locally

    python -m http.server 8000

Then open http://localhost:8000. The microphone works only on `localhost` or over HTTPS.
