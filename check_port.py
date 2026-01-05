import socket
import sys

def check_port(port):
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    sock.settimeout(2)
    result = sock.connect_ex(('127.0.0.1', port))
    sock.close()
    return result == 0

if __name__ == "__main__":
    port = 8010
    if check_port(port):
        print(f"Port {port} is OPEN")
        sys.exit(0)
    else:
        print(f"Port {port} is CLOSED")
        sys.exit(1)
