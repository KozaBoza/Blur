# Skrypt uruchamiajacy aplikacje Blur Background + OBS Support

Write-Host "=" -NoNewline -ForegroundColor Cyan
Write-Host ("=" * 70) -ForegroundColor Cyan
Write-Host "BLUR BACKGROUND - Uruchamianie aplikacji" -ForegroundColor Green
Write-Host ("=" * 71) -ForegroundColor Cyan
Write-Host ""

$projectRoot = $PSScriptRoot
Set-Location $projectRoot

# Funkcja sprawdzajaca czy port jest zajety
function Test-Port {
    param([int]$Port)
    try {
        $connection = Get-NetTCPConnection -LocalPort $Port -ErrorAction SilentlyContinue
        return $null -ne $connection
    } catch {
        return $false
    }
}

# Sprawdz czy porty sa wolne
Write-Host "Sprawdzanie portow..." -ForegroundColor Yellow

if (Test-Port 5000) {
    Write-Host "Port 5000 (backend) jest zajety!" -ForegroundColor Red
    $continue = Read-Host "Czy chcesz zabic proces na porcie 5000? (t/n)"
    if ($continue -eq 't') {
        Get-NetTCPConnection -LocalPort 5000 -ErrorAction SilentlyContinue | 
            Select-Object -ExpandProperty OwningProcess | 
            ForEach-Object { Stop-Process -Id $_ -Force -ErrorAction SilentlyContinue }
        Write-Host "Port 5000 zwolniony" -ForegroundColor Green
    }
}

if (Test-Port 3000) {
    Write-Host "Port 3000 (frontend) jest zajety!" -ForegroundColor Red
    $continue = Read-Host "Czy chcesz zabic proces na porcie 3000? (t/n)"
    if ($continue -eq 't') {
        Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue | 
            Select-Object -ExpandProperty OwningProcess | 
            ForEach-Object { Stop-Process -Id $_ -Force -ErrorAction SilentlyContinue }
        Write-Host "Port 3000 zwolniony" -ForegroundColor Green
    }
}

Write-Host ""
Write-Host "Sprawdzanie zaleznosci..." -ForegroundColor Yellow

# Sprawdz Python
try {
    $pythonVersion = py -3.11 --version 2>&1
    Write-Host "Python: $pythonVersion" -ForegroundColor Green
} catch {
    Write-Host "Python 3.11 nie jest zainstalowany!" -ForegroundColor Red
    exit 1
}

# Sprawdz Node.js
try {
    $nodeVersion = node --version 2>&1
    Write-Host "Node.js: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "Node.js nie jest zainstalowany!" -ForegroundColor Red
    exit 1
}

# Sprawdz pyvirtualcam (dla OBS)
Write-Host ""
Write-Host "Sprawdzanie obslugi OBS..." -ForegroundColor Yellow
$pyvirtualcamCheck = py -3.11 -c "import pyvirtualcam; print('OK')" 2>&1
if ($pyvirtualcamCheck -eq "OK") {
    Write-Host "pyvirtualcam zainstalowany - OBS dostepny" -ForegroundColor Green
} else {
    Write-Host "pyvirtualcam NIE zainstalowany - OBS niedostepny" -ForegroundColor Yellow
    Write-Host "   Aby wlaczyc OBS: pip install pyvirtualcam" -ForegroundColor Gray
}

Write-Host ""
Write-Host ("=" * 71) -ForegroundColor Cyan
Write-Host "Uruchamianie serwerow..." -ForegroundColor Green
Write-Host ("=" * 71) -ForegroundColor Cyan
Write-Host ""

# Uruchom backend w nowym oknie
Write-Host "Uruchamianie backendu (Port 5000)..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$projectRoot\backend'; Write-Host 'BACKEND SERVER' -ForegroundColor Yellow; py -3.11 server.py"

# Poczekaj chwile aby backend sie uruchomil
Start-Sleep -Seconds 3

# Uruchom frontend w nowym oknie
Write-Host "Uruchamianie frontendu (Port 3000)..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$projectRoot\blr'; Write-Host 'REACT FRONTEND' -ForegroundColor Cyan; npm start"

Write-Host ""
Write-Host ("=" * 71) -ForegroundColor Green
Write-Host "Aplikacja uruchomiona!" -ForegroundColor Green
Write-Host ("=" * 71) -ForegroundColor Green
Write-Host ""
Write-Host "Backend:  " -NoNewline -ForegroundColor White
Write-Host "http://localhost:5000" -ForegroundColor Cyan
Write-Host "Frontend: " -NoNewline -ForegroundColor White
Write-Host "http://localhost:3000" -ForegroundColor Cyan
Write-Host ""
Write-Host "Wskazowki:" -ForegroundColor Yellow
Write-Host "   - Przegladarka otworzy sie automatycznie" -ForegroundColor Gray
Write-Host "   - Zaakceptuj zgode na uzycie kamery" -ForegroundColor Gray
Write-Host "   - Kliknij przycisk OBS aby uruchomic wirtualna kamere" -ForegroundColor Gray
Write-Host "   - Zobacz OBS_SETUP.md aby dowiedziec sie wiecej" -ForegroundColor Gray
Write-Host ""
Write-Host "Aby zatrzymac serwery, zamknij okna PowerShell" -ForegroundColor Yellow
Write-Host ""
