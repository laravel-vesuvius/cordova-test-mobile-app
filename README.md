## Configuration

Copy nex files and fill environment specific values for variables.
* `config.xml.dist` to `config.xml` 
* `src/config.dist.js` to `src/config.js`

## Compile scripts

```
npm run build
```


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

Download Android SDK using `sudo /opt/android/tools/android sdk`.

Create emulator image:
```
android create avd -n <name> -t <targetID>
```

Fix kvm permissions:
```
sudo chown root:libvirtd /dev/kvm
```

Run emulator:
```
SHELL=/bin/bash cordova emulate android
```
