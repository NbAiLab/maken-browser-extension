mkdir maken-extension_ff
cp -r icons maken-extension_ff/
cp -r images maken-extension_ff/
cp content_script.js maken-extension_ff/content_script.js
cp insQ.js maken-extension_ff/insQ.js
cp package-lock.json maken-extension_ff/package-lock.json

cp background_script_v2.js maken-extension_ff/background_script.js
cp manifest_v2.json maken-extension_ff/manifest.json

cd maken-extension_ff
zip -r maken-extension_ff.zip ./*
cp maken-extension_ff.zip ../
cd -

rm -rf maken-extension_ff


mkdir maken-extension_chrome
cp -r icons maken-extension_chrome/
cp -r images maken-extension_chrome/
cp content_script.js maken-extension_chrome/content_script.js
cp insQ.js maken-extension_chrome/insQ.js
cp package-lock.json maken-extension_chrome/package-lock.json

cp background_script.js maken-extension_chrome/background_script.js
cp manifest.json maken-extension_chrome/manifest.json

cd maken-extension_chrome
zip -r maken-extension_chrome.zip ./*
cp maken-extension_chrome.zip ../
cd -

rm -rf maken-extension_chrome
