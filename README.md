# HIVA Kyrgyz speech recognition (alpha)

Kyrgyz speech recognition that runs entirely in the browser. Audio is processed on your
device with WebAssembly and is never uploaded.

**Live demo:** https://data-analysis-and-research-institute.github.io/hiva-vosk-asr-alpha/

- The main page uses a streaming Zipformer model in [sherpa-onnx](https://github.com/k2-fsa/sherpa-onnx)
  (about 42 MB download): text appears while you speak.
- [`vosk/`](https://data-analysis-and-research-institute.github.io/hiva-vosk-asr-alpha/vosk/) uses a
  Vosk model in [vosk-browser](https://github.com/ccoreilly/vosk-browser) (about 60 MB). It is more accurate.
- Both take microphone input or an uploaded audio file (any format the browser can decode). The model
  downloads on the first visit and is then cached by the browser.
- Output is lower-case Kyrgyz Cyrillic without punctuation; numbers come out as words.
- The main page has six sample clips from the FLEURS (CC BY 4.0) and Common Voice (CC0) test
  sets in `samples/`; they play while the text streams in, then the result is compared with the correct
  sentence: word error rate, with wrong, extra and missed words highlighted.
- For your own recordings you can mark the wrong words (or type the correct text) to get the word error rate.
- A collapsible research section (`research.js`) shows the training data, the results of each model version
  and the training curves.

Word error rate (lower is better):

| Test set | Zipformer (main page) | Vosk (`vosk/`) |
|---|---|---|
| Common Voice 17 test | 19.3% | 14.5% |
| FLEURS test (sentences without digits) | 15.5% | 14.0% |
| HIVA test (unseen speakers and sentences) | 30.3% | 27.5% |

This is an alpha release. A larger server-side model is more accurate.

## Zipformer model

The main page runs a streaming Zipformer transducer (icefall, about 23M parameters, int8) with no
separate language model. Besides the training data of the Vosk model, it was trained on about
118 hours of Kyrgyz parliament speech labelled automatically (chunks where two Vosk models mostly agree).

## Vosk model

`vosk/model/vosk-model-ky-small.tar.gz` is a Vosk small model: a Kaldi chain TDNN-F acoustic model
with a lookahead graph, also usable on phones and a Raspberry Pi through the regular Vosk API.

Training data:
- about 255 hours of read speech recorded through hiva.alatoo.edu.kg (Ala-Too International University);
- the train and dev splits of FLEURS ky_kg;
- Common Voice 27.0 Kyrgyz (test speakers and sentences excluded).

The lexicon has about 676,000 words. The language model is a 3-gram built from the Leipzig Corpora Collection, the Manas-UdS Kyrgyz Corpus and the Kyrgyz News Corpus.

## Licence

The models and this demo are released under
[CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/), for non-commercial use only,
because the Vosk language model is built from corpora licensed for non-commercial use.
sherpa-onnx, vosk-browser and Vosk are Apache 2.0.

## Running it locally

    python -m http.server 8000

Then open http://localhost:8000. The microphone works only on `localhost` or over HTTPS.
