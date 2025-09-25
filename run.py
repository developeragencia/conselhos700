#!/usr/bin/env python3
import subprocess
import sys
import os

def main():
    try:
        # Change to the correct directory
        os.chdir('/home/runner/workspace')
        
        # Start the Portal Esotérico server
        print("🔮 Iniciando Portal Esotérico...")
        subprocess.run([sys.executable, 'portal_master.py'], check=True)
        
    except KeyboardInterrupt:
        print("\n🛑 Servidor interrompido")
    except Exception as e:
        print(f"❌ Erro: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()