# Self-hosted portfolio fonts

- **Instrument Serif** regular and italic, Latin subsets, Google Fonts v5. License: `OFL-instrumentserif.txt`. Official source: https://github.com/google/fonts/tree/main/ofl/instrumentserif
- **Manrope** variable 400-800, Latin subset, Google Fonts v20. License: `OFL-manrope.txt`. Official source: https://github.com/google/fonts/tree/main/ofl/manrope
- **Noto Nastaliq Urdu** variable 400-700, Arabic-script subset including Urdu, Google Fonts v23. License: `OFL-notonastaliqurdu.txt`. Official source: https://github.com/google/fonts/tree/main/ofl/notonastaliqurdu

All three families use SIL Open Font License 1.1. Faces use `font-display: swap` and Unicode ranges in `src/fonts.css`. Files are served locally; no Google Fonts stylesheet or font service is called at runtime. The small English-page Urdu switch label retains a system font so English visitors do not download the full Nastaliq file until selecting Urdu. Font files replace the former Noto Naskh Arabic asset.

### instrument-serif-italic.woff2

Source: https://fonts.gstatic.com/s/instrumentserif/v5/jizHRFtNs2ka5fXjeivQ4LroWlx-6zAjjH7M.woff2

Size: 22,128 bytes. SHA-256: `5a51946dfffa82972bc98745359c46761515641fda557c25116459a9f83da4a7`.

### instrument-serif-regular.woff2

Source: https://fonts.gstatic.com/s/instrumentserif/v5/jizBRFtNs2ka5fXjeivQ4LroWlx-6zUTjg.woff2

Size: 21,032 bytes. SHA-256: `5eb09b5ac0e28b67c2f041c8ba6d244604ca0c0980d65912ab2d47fed84ddc31`.

### manrope-latin.woff2

Source: https://fonts.gstatic.com/s/manrope/v20/xn7gYHE41ni1AdIRggexSg.woff2

Size: 24,836 bytes. SHA-256: `a30ddcd349703aff7464c34bef3fffdff405ee50c113440d7c8693c02d210972`.

### noto-nastaliq-urdu.woff2

Source: https://fonts.gstatic.com/s/notonastaliqurdu/v23/LhW4MUPbN-oZdNFcBy1-DJYsEoTq5pu3SvoMC9Y.woff2

Size: 239,060 bytes. SHA-256: `609856a4affa17480bec6ae2e77d0d3743acb94c7cbdc020aeb317b7eb7365f6`.
