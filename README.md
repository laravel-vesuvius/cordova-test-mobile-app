## Configuration

Copy next files and fill environment specific values for variables:
* `config.xml.dist` to `config.xml` 
* `src/config.dist.js` to `src/config.js`

## Run emulator instructions

Install local dependencies:
```
sudo apt-get install qemu-kvm libvirt-bin ubuntu-vm-builder bridge-utils
sudo adduser <user> libvirtd
sudo adduser <user> kvm
```

Move into docker container:
```
docker-compose up -d
docker-compose exec cot_cordova bash
```

Run `xhost +` to allow use screen for root user.

Download SDK and images what you need and create AVD:
```
sudo /opt/android/tools/android sdk
/opt/android/tools/android avd
```

Fix kvm permissions:
```
sudo chown root:libvirtd /dev/kvm
```

Run emulator:
```
npm run emulate
```

Stop all emulators:
```
adb devices | grep emulator | cut -f1 | while read line; do adb -s $line emu kill; done
```
