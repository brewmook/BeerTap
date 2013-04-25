import os
from datetime import datetime

Version = {
    'major':     0,
    'minor':     1,
    'patch':     5,
    'revision':  os.popen("git rev-parse HEAD").read().strip(),
    'timestamp': int(datetime.utcnow().strftime("%s")) * 1000,
    }

def processTemplate(source, target):
    with open(source, 'r') as f:
        content = f.read()
    with open(target, 'w') as f:
        f.write(content.format(**Version))

processTemplate('templates/Version.js', 'www/js/Version.js')
processTemplate('templates/config.xml', 'www/config.xml')
