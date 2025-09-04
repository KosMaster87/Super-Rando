<?php
header('Content-Type: text/plain');

echo "Testing write permissions in: " . __DIR__ . "\n\n";

// Test für rate_limit.json
$rateFile = __DIR__ . '/rate_limit.json';
echo "1. Testing rate_limit.json:\n";
if (is_writable($rateFile)) {
    echo "   ✓ Datei ist beschreibbar\n";
} elseif (is_writable(__DIR__)) {
    echo "   ✓ Verzeichnis ist beschreibbar, Datei kann erstellt werden\n";
} else {
    echo "   ✗ Keine Schreibrechte\n";
}

// Test für contact_logs.txt
$logFile = __DIR__ . '/contact_logs.txt';
echo "\n2. Testing contact_logs.txt:\n";
if (is_writable($logFile)) {
    echo "   ✓ Datei ist beschreibbar\n";
} elseif (is_writable(__DIR__)) {
    echo "   ✓ Verzeichnis ist beschreibbar, Datei kann erstellt werden\n";
} else {
    echo "   ✗ Keine Schreibrechte\n";
}

// Test: Versuche eine Datei zu erstellen
echo "\n3. Test: Creating test file:\n";
$testFile = __DIR__ . '/test_write.tmp';
if (file_put_contents($testFile, 'test') !== false) {
    echo "   ✓ Testdatei erfolgreich erstellt\n";
    unlink($testFile);
    echo "   ✓ Testdatei erfolgreich gelöscht\n";
} else {
    echo "   ✗ Konnte Testdatei nicht erstellen\n";
}

// Zeige Berechtigungen an
echo "\n4. Current permissions:\n";
echo "   Directory: " . substr(sprintf('%o', fileperms(__DIR__)), -4) . "\n";
if (file_exists($rateFile)) {
    echo "   rate_limit.json: " . substr(sprintf('%o', fileperms($rateFile)), -4) . "\n";
}
if (file_exists($logFile)) {
    echo "   contact_logs.txt: " . substr(sprintf('%o', fileperms($logFile)), -4) . "\n";
}
?>