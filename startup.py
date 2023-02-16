import frida
import os,time
from multiprocessing import Process

device = frida.get_usb_device()
print(device)

target = "com.eg.android.AlipayGphone"


with open(os.path.dirname(os.path.abspath(__file__)) + "/inject.js","r",encoding="utf-8") as f:
    jscode = f.read()


def spawn_added(spawn):
    print('spawn_added:', spawn)
    if(spawn.identifier.startswith(target)):
        session = device.attach(spawn.pid)
        script = session.create_script(jscode)
        script.on('message', on_message)
        script.load()
    device.resume(spawn.pid)
     
def on_message(message, data):
    if message['type'] == 'send':
        print("[*] {0}".format(message['payload']))
    else:
        print(message)

    


if __name__ =='__main__':
    device.on('spawn-added', spawn_added)
    device.enable_spawn_gating()
    print('Enabled spawn gating')
    while True:
        input()
