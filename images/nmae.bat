@echo off
setlocal enabledelayedexpansion

rem Defina o diretório onde as imagens estão localizadas
set "diretorio=D:\Users\Rafael Valnásio\Documents\Arcana_Tarot_Path_of_Exile\images"

rem Inicialize um contador
set "contador=1"

rem Loop através de todas as imagens .png no diretório
for %%i in ("%diretorio%\*.png") do (
    rem Renomeie o arquivo de .png para c1, c2, c3, etc.
    ren "%%i" "c!contador!.png"
    
    rem Incrementa o contador
    set /a contador+=1
)

echo Imagens renomeadas com sucesso!
pause
