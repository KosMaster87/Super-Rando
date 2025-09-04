<?php
header('Content-Type: text/plain');

function createTestFiles() {
    $rateFile = __DIR__ . '/rate_limit.json';
    $logFile = __DIR__ . '/contact_logs.txt';
    
    echo "Creating test files...\n\n";
    
    // rate_limit.json erstellen
    $rateData = [
        '127.0.0.1' => [
            'requests' => [time(), time() - 1800],
            'blocked_until' => 0
        ]
    ];
    
    if (file_put_contents($rateFile, json_encode($rateData, JSON_PRETTY_PRINT))) {
        echo "✓ rate_limit.json created successfully\n";
        chmod($rateFile, 0644);
    } else {
        echo "✗ Failed to create rate_limit.json\n";
    }
    
    // contact_logs.txt erstellen
    $logContent = "[" . date('Y-m-d H:i:s') . "] INFO: Test log entry created\n";
    $logContent .= "[" . date('Y-m-d H:i:s') . "] INFO: Testing write permissions\n";
    
    if (file_put_contents($logFile, $logContent)) {
        echo "✓ contact_logs.txt created successfully\n";
        chmod($logFile, 0644);
    } else {
        echo "✗ Failed to create contact_logs.txt\n";
    }
    
    echo "\nTesting file contents:\n";
    echo "rate_limit.json:\n";
    echo file_get_contents($rateFile) . "\n";
    echo "contact_logs.txt:\n";
    echo file_get_contents($logFile);
}

createTestFiles();
?>