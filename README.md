# Maken Browser Extension

Browser extension that adds related images and books to the main [nb.no](https://www.nb.no/) results page using the [Maken service](https://www.nb.no/maken).

- For Chrome: https://chrome.google.com/webstore/detail/maken-similarity-service/mfnjkmihkfhcegkngiolkokadkojfofd
- For Firefox: https://addons.mozilla.org/en-US/firefox/addon/maken-nb-no/

## Developing

Currently, Chrome uses Manifest v3 for extensions while Firefox uses v3 only for its addons, thus there are background scripts and manifes for v3 (default) and v2. The script [package.sh](./package.sh) takes care of creating the right zip files for distribution. Don't forget to manually increase the version number on every new release.
