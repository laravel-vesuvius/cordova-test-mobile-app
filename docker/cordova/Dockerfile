FROM ubuntu:trusty

# Java and other dependencies
RUN buildDeps='software-properties-common'; \
set -x && \
apt-get update && apt-get install -y $buildDeps --no-install-recommends && \

# use WebUpd8 PPA
add-apt-repository ppa:webupd8team/java -y && \
add-apt-repository ppa:cwchien/gradle -y && \
apt-get update -y && \

# automatically accept the Oracle license
echo oracle-java8-installer shared/accepted-oracle-license-v1-1 select true | /usr/bin/debconf-set-selections && \
apt-get install -y oracle-java8-installer && \
apt-get install -y oracle-java8-set-default && \

# clean up
rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* && \
apt-get purge -y --auto-remove $buildDeps && \
apt-get autoremove -y && apt-get clean

ENV JAVA_HOME /usr/lib/jvm/java-8-oracle

ENV ANDROID_SDK_URL="https://dl.google.com/android/repository/tools_r25.2.5-linux.zip" \
    ANDROID_BUILD_TOOLS_VERSION=25.0.3 \
    ANDROID_APIS="android-22,android-23,android-24,android-25" \
    ANDROID_IMAGES="sys-img-x86_64-google_apis-25" \
    ANT_HOME="/usr/share/ant" \
    MAVEN_HOME="/usr/share/maven" \
    GRADLE_HOME="/usr/share/gradle" \
    ANDROID_HOME="/opt/android"

ENV PATH $PATH:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools:$ANDROID_HOME/build-tools/$ANDROID_BUILD_TOOLS_VERSION:$ANT_HOME/bin:$MAVEN_HOME/bin:$GRADLE_HOME/bin

WORKDIR /opt

RUN dpkg --add-architecture i386 && \
apt-get -qq update && \
apt-get -qq install -y wget curl maven ant gradle-3.1 libncurses5:i386 libstdc++6:i386 zlib1g:i386 libswt-gtk-3-jni \
libswt-gtk-3-java x11-xserver-utils sudo libpulse0 libgl1-mesa-glx qemu-system-x86 git && \

# Installs Android SDK
mkdir android && cd android && \
wget -O tools.zip ${ANDROID_SDK_URL} && \
unzip tools.zip && rm tools.zip && \
echo y | android update sdk -a -u -t platform-tools,${ANDROID_APIS},build-tools-${ANDROID_BUILD_TOOLS_VERSION},\
${ANDROID_IMAGES},extra-google-m2repository,extra-android-m2repository && \
chmod a+x -R $ANDROID_HOME && \
chown -R root:root $ANDROID_HOME && \

# Clean up
rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* && \
apt-get autoremove -y && \
apt-get clean

RUN curl -O https://nodejs.org/dist/v7.10.0/node-v7.10.0-linux-x64.tar.xz && \
tar -C /usr/local --strip-components 1 -xJf node-v7.10.0-linux-x64.tar.xz

RUN npm i -g --unsafe-perm cordova@7.0.1

# Configure KVM
RUN apt-get update && apt-get install -y qemu-kvm libvirt-bin ubuntu-vm-builder bridge-utils

ENV user cot
ARG PUID=1000
ARG PGID=1000
RUN groupadd -g $PGID $user && useradd -u $PUID -g $user -m $user && \
echo "$user ALL=(ALL)NOPASSWD: ALL" >> /etc/sudoers && \
adduser $user kvm && \
adduser $user libvirtd

USER $user
