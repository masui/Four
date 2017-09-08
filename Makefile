#
# % make setup
#

APPNAME=Four
PASS=pitecan
ZIPALIGN=/Users/masui/Systems/android-sdk-macosx/build-tools/25.0.2/zipalign
KEYSTORE=.keystore
ICON=images/Four256x256.png
APKPATH=platforms/android/build/outputs/apk

build: icons
	cordova build android
install:
	adb install -r ${APKPATH}/android-debug.apk

release: icons
	/bin/rm -r -f ${APKPATH}/*.apk
	cordova build android --release
	jarsigner \
		-verbose \
		-keystore ${KEYSTORE} \
		-storepass ${PASS} \
		-signedjar ${APKPATH}/android-release-signed.apk \
		-sigalg SHA1withRSA \
		-digestalg SHA1 \
		${APKPATH}/android-release-unsigned.apk ${APPNAME}
	${ZIPALIGN} \
		-v 4 \
		${APKPATH}/android-release-signed.apk \
		${APKPATH}/android-release-signed-aligned.apk

ri: releaseinstall
releaseinstall:
	adb install -r ${APKPATH}/android-release-signed-aligned.apk

# 署名
# http://phiary.me/cordova-android-release-build-apk-for-google-play/
#
genkey:
	/bin/rm -r -f ${KEYSTORE}
	keytool \
		-genkey -v \
		-keystore ${KEYSTORE} \
		-storepass ${PASS} \
		-alias ${APPNAME} \
		-keyalg RSA \
		-validity 10000

keylist:
	keytool -list -v -keystore ${KEYSTORE} -storepass ${PASS}

icons:
	convert -scale 72x72 ${ICON}   platforms/android/res/mipmap-hdpi/icon.png
	convert -scale 36x36 ${ICON}   platforms/android/res/mipmap-ldpi/icon.png
	convert -scale 48x48 ${ICON}   platforms/android/res/mipmap-mdpi/icon.png
	convert -scale 96x96 ${ICON}   platforms/android/res/mipmap-xhdpi/icon.png
	convert -scale 144x144 ${ICON} platforms/android/res/mipmap-xxhdpi/icon.png
	convert -scale 192x192 ${ICON} platforms/android/res/mipmap-xxxhdpi/icon.png

clean:
	/bin/rm -r -f platforms plugins node_modules package.json config.xml

setup:
	/bin/cp config.xml.template config.xml
│	/bin/cp package.json.template package.json
	cordova platform add android
	cordova plugin add cordova-plugin-admobpro
