# install deps
apt-get update && apt-get -y upgrade
apt-get install -y python3 python3-pip build-essential libssl-dev libffi-dev python3-dev pandoc python3-venv tmux vim

# install python environment
cd ~
pyvenv steem
source steem/bin/activate
pip install wheel
pip install pytest
pip install steem
