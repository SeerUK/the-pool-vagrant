# -*- mode: ruby -*-
# vi: set ft=ruby :

# NOTE: This Vagrantfile requires plugin vagrant-triggers:
#
# => $ vagrant plugin install vagrant-triggers

require './helpers.rb'

VAGRANTFILE_API_VERSION = '2'
CONFIG_DIST  = 'config/machines.yml'
CONFIG_LOCAL = 'config/machines.local.yml'

config = ConfigHelper::getConfig(CONFIG_DIST, CONFIG_LOCAL)
machines = config['machines']

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
  machines.each do |name, machine|
    config.vm.define name do |node|
      node.vm.box = 'ubuntu/trusty64'
      node.vm.network 'private_network', ip: machine['ipv4']

      node.vm.provider 'virtualbox' do |v|
        v.cpus   = 4
        v.memory = 1024
      end

      # Synced folders
      if machine.include? 'folder_map'
        machine['folder_map'].each do |folder|
          node.vm.synced_folder folder['host'], folder['guest'], type: 'rsync',
            # rsync__exclude: folder['exclude'],
            owner: folder['owner'],
            group: folder['group']
        end
      end

      # Forwarded ports
      if machine.include? 'port_map'
        machine['port_map'].each do |forward|
          node.vm.network 'forwarded_port', guest: forward['guest'], host: forward['host']
        end
      end

      node.vm.provision 'ansible' do |ansible|
        ansible.playbook = machine['playbook']
        # ansible.verbose = 'vvvv'
      end
    end
  end
end
