# -*- mode: ruby -*-
# vi: set ft=ruby :

$script = <<SCRIPT
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10

echo 'deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen' | sudo tee /etc/apt/sources.list.d/mongodb.list

sudo apt-get -y install python-software-properties python g++ make

sudo add-apt-repository -y ppa:git-core/ppa
sudo add-apt-repository -y ppa:gophers/go
sudo add-apt-repository -y ppa:chris-lea/node.js
sudo apt-get update

sudo apt-get -y install git
sudo apt-get -y install apache2-utils

sudo apt-get -y install nodejs
sudo apt-get -y install golang-stable

SCRIPT

# Vagrantfile API/syntax version. Don't touch unless you know what you're doing!
VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|

  config.vm.box = "precise64"
  config.vm.box_url = "http://files.vagrantup.com/precise64.box"

  config.vm.provision "shell", inline: $script

  config.vm.provision :file do |file|
    file.source      = '~/.gitconfig'
    file.destination = '/home/vagrant/.gitconfig'
  end
  config.vm.provision "shell", inline: <<-SCRIPT
    printf "%s\n" "#{File.read("#{ENV['HOME']}/.ssh/id_rsa.pub")}" > /home/vagrant/.ssh/authorized_keys
    chown -R vagrant:vagrant /home/vagrant/.ssh
  SCRIPT

  config.ssh.shell = "bash -c 'BASH_ENV=/etc/profile exec bash'" # avoids 'stdin: is not a tty' error.
  config.ssh.forward_agent = true
  config.ssh.private_key_path = ["#{ENV['HOME']}/.ssh/id_rsa","#{ENV['HOME']}/.vagrant.d/insecure_private_key"]

  config.vm.network "private_network", ip: "192.168.50.100"

  config.vm.provider "virtualbox" do |v|
      v.memory = 1024
      v.cpus = 2
    end

end