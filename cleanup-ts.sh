#!/bin/bash

# Elimina todos los archivos TypeScript restantes del repositorio
find . -type f -name '*.ts' -print -delete

# Elimina tsconfig si existe
find . -type f -name 'tsconfig.json' -print -delete

echo "Limpieza completada: archivos .ts eliminados."