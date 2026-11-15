// Numbers for the research section of index.html. WER = word error rate, %, greedy decoding of the
// int8 browser model with sherpa-onnx (Vosk: its own decoder with the language model).
window.RESEARCH = {
  intro: `
<p>The model is a streaming <a href="https://github.com/k2-fsa/icefall">Zipformer</a> transducer with about
23 million parameters, quantised to 8 bits so that it fits in a ~42 MB download. It reads audio in 0.32-second
chunks and has no separate language model, so it runs in real time in the browser.</p>
<p>It is trained in rounds. The first round uses manually transcribed speech. Later rounds add speech that
nobody transcribed by hand: Jogorku Kenesh (parliament) sessions, transcribed automatically by two different
Vosk models. A 10–20 second chunk is kept only when the two transcripts agree on at least 80–90% of the words,
and it is labelled with the transcript of the larger model (<i>pseudo-labelling</i>). Every chunk is also used at
0.9× and 1.1× speed.</p>`,

  // Hours of speech before speed perturbation (data/fbank and the parliament manifests).
  data: [
    { name: 'HIVA read speech', hours: 210.9, note: 'hiva.alatoo.edu.kg, Ala-Too International University' },
    { name: 'Common Voice', hours: 18.4, note: 'Mozilla, test speakers and sentences excluded' },
    { name: 'FLEURS train + dev', hours: 6.4, note: 'Google' },
    { name: 'Parliament, ≤10% disagreement', hours: 41.9, note: 'pseudo-labels, added in version 2' },
    { name: 'Parliament, 10–20% disagreement', hours: 76.6, note: 'pseudo-labels, added in version 3' },
  ],
  dataCaption: 'Hours of speech per source, before the 0.9× / 1.1× speed copies that triple the training set. '
    + 'Version 1 was trained on 236 hours of transcribed speech, version 3 on 354 hours in all.',

  sets: ['HIVA test', 'FLEURS test', 'Common Voice 17 test'],
  vosk: [27.5, 14.0, 14.5],
  versions: [
    { name: 'v1: transcribed speech', wer: [33.1, 19.9, 26.7] },
    { name: 'v2: + 42 h parliament', wer: [30.6, 16.8, 21.7] },
    { name: 'v3: + 118 h parliament', wer: [30.3, 15.5, 19.3] },
  ],
  versionsCaption: 'Word error rate on three test sets that were not used for training (lower is better). '
    + 'Each round of parliament pseudo-labels closed part of the gap to the Vosk model (dashed lines), '
    + 'which has a large lexicon and a language model that this small streaming model does not.',

  epochs: {
    x: [10, 12, 14, 16, 20, 22, 24],
    runs: [
      { name: 'transcribed speech only', wer: { 10: 33.1, 12: 34.0, 14: 34.8, 16: 35.2, 20: 36.4 } },
      { name: '+ 42 h parliament (from epoch 10)', wer: { 12: 31.7, 14: 31.1, 16: 30.6 } },
      { name: '+ 118 h parliament (from epoch 16)', wer: { 20: 30.3, 22: 30.6, 24: 30.3 } },
    ],
  },
  epochsCaption: 'HIVA test word error rate during training. With only the transcribed speech, training past '
    + 'epoch 10 made the model worse on new speakers: many HIVA recordings read the same prompts, and the model '
    + 'started to memorise them. Continuing with parliament speech instead brought it down to about 30%; the second '
    + 'parliament round mainly helped on FLEURS and Common Voice (chart above).',

  table: [
    { name: 'Vosk small model (lm2), main alternative', wer: [27.5, 14.0, 14.5] },
    { name: 'Zipformer v1, epoch 10', wer: [33.1, 19.9, 26.7] },
    { name: 'Zipformer v1, epoch 20 (over-trained)', wer: [36.4, 22.7, 28.8] },
    { name: 'Zipformer v2, epoch 16', wer: [30.6, 16.8, 21.7] },
    { name: 'Zipformer v3, epoch 24 (this page)', wer: [30.3, 15.5, 19.3], best: true },
  ],
  tableCaption: 'Test sets: HIVA test — 503 recordings by speakers and of sentences not in training; '
    + 'FLEURS test — 751 sentences without digits; Common Voice 17 test — 1,613 recordings.',

  // Alternative encoder: Light GRU, trained exactly like Zipformer v1 (same 236 h, front end, units, loss,
  // optimizer and schedule); both decoded with greedy search, last two epochs averaged.
  ligru: {
    intro: `<p>We also tried a recurrent encoder, the <a href="https://arxiv.org/abs/1803.10225">Light GRU</a>
(Ravanelli et al., 2018): six unidirectional layers of 1,024 units, about 20 million parameters (the Zipformer has 23 million),
and naturally streaming. It was trained exactly like Zipformer v1 — same data, sound features,
word pieces, loss and schedule — so the difference comes from the encoder alone.</p>`,
    x: [3, 4, 6, 8],
    ligru: [[89.6, 63.5, 55.1, 53.7], [90.8, 57.1, 47.7, 48.5], [91.6, 65.0, 54.9, 50.9]],
    zipformer: [[44.8, 40.0, 34.8, 33.5], [32.2, 25.7, 21.2, 20.1], [44.3, 36.7, 29.2, 27.2]],
    caption: 'Word error rate during training, both encoders on the same data (greedy decoding without the '
      + 'browser optimisations, so the Zipformer numbers differ slightly from the tables above). The Light GRU '
      + 'learned more slowly and levelled off at 1.6–2.4 times the Zipformer error rate; it also skipped many '
      + 'words. It cannot look ahead and has no attention over the sentence, which the Zipformer has. '
      + 'Its optimizer settings were tuned for the Zipformer, but a gap this large is not a tuning matter, '
      + 'so the Zipformer stays.',
  },

  outro: `
<h3>Next</h3>
<ul>
<li>About 300 hours of Kyrgyz audiobooks, pseudo-labelled the same way, are being added in the next round.</li>
</ul>`,
};
