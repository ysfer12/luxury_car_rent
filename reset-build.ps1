# Clean up script for Next.js build issues
Write-Host "🧹 Cleaning up for a fresh build..." -ForegroundColor Yellow

# Stop any running processes that might lock files
Write-Host "Stopping any running processes..." -ForegroundColor Cyan
Stop-Process -Name "node" -ErrorAction SilentlyContinue

# Remove build caches
Write-Host "Removing Next.js cache (.next folder)..." -ForegroundColor Cyan
Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue

# Remove package manager caches
Write-Host "Clearing npm cache..." -ForegroundColor Cyan
npm cache clean --force

# Remove node_modules
Write-Host "Removing node_modules..." -ForegroundColor Cyan
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue

# Reinstall dependencies
Write-Host "Reinstalling dependencies..." -ForegroundColor Green
npm install

# Set memory limits for Node
Write-Host "Setting increased memory limit for Node.js..." -ForegroundColor Cyan
$env:NODE_OPTIONS="--max_old_space_size=4096"

# Run the build
Write-Host "🚀 Starting fresh build..." -ForegroundColor Green
npm run build

Write-Host "Build process completed!" -ForegroundColor Yellow