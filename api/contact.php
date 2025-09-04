<!-- contact.php -->

<?php

// Error reporting for development (remove in production)
// error_reporting(E_ALL);
// ini_set('display_errors', 1);

// Automatische Dateierstellung mit korrekten Berechtigungen
// function ensureWritable($filename) {
//     if (!file_exists($filename)) {
//         // Versuche Datei zu erstellen
//         if (file_put_contents($filename, '') === false) {
//             // Falls nicht möglich, versuche Verzeichnisberechtigungen
//             $dir = dirname($filename);
//             if (!is_writable($dir)) {
//                 die(json_encode([
//                     'success' => false,
//                     'message' => 'Server configuration error: Directory not writable'
//                 ]));
//             }
//         }
//     }
    
//     // Berechtigungen setzen
//     if (file_exists($filename) && !is_writable($filename)) {
//         chmod($filename, 0644);
//     }
    
//     return is_writable($filename);
// }

// // Prüfe und erstelle Dateien wenn nötig
// ensureWritable(__DIR__ . '/rate_limit.json');
// ensureWritable(__DIR__ . '/contact_logs.txt');

// Security headers
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');
header('X-XSS-Protection: 1; mode=block');

/**
 * Prüft Rate Limiting basierend auf IP-Adresse
 * @param string $ip - Client IP-Adresse
 * @return bool - True wenn erlaubt, False wenn Rate Limit erreicht
 */
function checkRateLimit($ip) {
    $rateFile = __DIR__ . '/rate_limit.json';
    $maxRequests = 3; // Max 3 Nachrichten
    $timeWindow = 3600; // Pro Stunde (3600 Sekunden)
    
    // Lade bestehende Rate-Daten
    $rateData = [];
    if (file_exists($rateFile)) {
        $rateData = json_decode(file_get_contents($rateFile), true) ?: [];
    }
    
    $currentTime = time();
    $clientData = $rateData[$ip] ?? ['requests' => [], 'blocked_until' => 0];
    
    // Entferne alte Requests außerhalb des Zeitfensters
    $clientData['requests'] = array_filter(
        $clientData['requests'], 
        function($timestamp) use ($currentTime, $timeWindow) {
            return ($currentTime - $timestamp) < $timeWindow;
        }
    );
    
    // Prüfe ob Rate Limit erreicht
    if (count($clientData['requests']) >= $maxRequests) {
        $clientData['blocked_until'] = $currentTime + $timeWindow;
        $rateData[$ip] = $clientData;
        file_put_contents($rateFile, json_encode($rateData));
        return false;
    }
    
    // Füge aktuellen Request hinzu
    $clientData['requests'][] = $currentTime;
    $rateData[$ip] = $clientData;
    
    // Bereinige alte IPs (älter als 24 Stunden)
    $rateData = array_filter($rateData, function($data) use ($currentTime) {
        return !empty($data['requests']) && 
               ($currentTime - max($data['requests'])) < 86400;
    });
    
    file_put_contents($rateFile, json_encode($rateData));
    return true;
}

/**
 * Loggt Ereignisse in Datei
 * @param string $level - Log-Level (INFO, ERROR, WARNING)
 * @param string $message - Log-Nachricht
 * @param array $context - Zusätzliche Kontext-Daten
 */
function logEvent($level, $message, $context = []) {
    $logFile = __DIR__ . '/contact_logs.txt';
    $timestamp = date('Y-m-d H:i:s');
    $ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
    $userAgent = $_SERVER['HTTP_USER_AGENT'] ?? 'unknown';
    
    $logEntry = sprintf(
        "[%s] %s: %s | IP: %s | Context: %s | UserAgent: %s\n",
        $timestamp,
        $level,
        $message,
        $ip,
        json_encode($context),
        $userAgent
    );
    
    file_put_contents($logFile, $logEntry, FILE_APPEND | LOCK_EX);
}

/**
 * Erstellt schönes HTML-Email-Template
 * @param string $name - Name des Absenders
 * @param string $email - Email des Absenders  
 * @param string $subject - Betreff
 * @param string $message - Nachricht
 * @return string - HTML-Email-Template
 */
function createEmailTemplate($name, $email, $subject, $message) {
    return "
    <!DOCTYPE html>
    <html lang='de'>
    <head>
        <meta charset='UTF-8'>
        <meta name='viewport' content='width=device-width, initial-scale=1.0'>
        <title>Kontaktanfrage - Super~Rando</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; margin: 0; padding: 20px; background-color: #f4f4f4; }
            .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
            .header { background: linear-gradient(135deg, #ff6b6b, #4ecdc4); color: white; padding: 20px; text-align: center; }
            .content { padding: 30px; }
            .field { margin-bottom: 20px; }
            .field-label { font-weight: bold; color: #333; display: block; margin-bottom: 5px; }
            .field-value { background: #f8f9fa; padding: 10px; border-radius: 4px; border-left: 4px solid #4ecdc4; }
            .message-content { background: #fff; border: 1px solid #ddd; padding: 15px; border-radius: 4px; white-space: pre-wrap; }
            .footer { background: #f8f9fa; padding: 15px; text-align: center; color: #666; font-size: 14px; }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h1>🍜 Super~Rando Kontaktanfrage</h1>
                <p>Neue Nachricht über das Kontaktformular</p>
            </div>
            
            <div class='content'>
                <div class='field'>
                    <span class='field-label'>👤 Name:</span>
                    <div class='field-value'>$name</div>
                </div>
                
                <div class='field'>
                    <span class='field-label'>📧 E-Mail:</span>
                    <div class='field-value'>$email</div>
                </div>
                
                <div class='field'>
                    <span class='field-label'>📋 Betreff:</span>
                    <div class='field-value'>$subject</div>
                </div>
                
                <div class='field'>
                    <span class='field-label'>💬 Nachricht:</span>
                    <div class='message-content'>" . nl2br($message) . "</div>
                </div>
            </div>
            
            <div class='footer'>
                <p>📅 Gesendet am: " . date('d.m.Y H:i:s') . "</p>
                <p>🌐 Von: super-rando.dev2k.org</p>
            </div>
        </div>
    </body>
    </html>";
}

switch ($_SERVER['REQUEST_METHOD']) {
    case "OPTIONS":
        header("Access-Control-Allow-Origin: https://super-rando.dev2k.org");
        header("Access-Control-Allow-Headers: Content-Type");
        header("Access-Control-Allow-Methods: POST");
        header("Access-Control-Max-Age: 3600");
        http_response_code(200);
        exit;

    case "POST":
        header("Access-Control-Allow-Origin: https://super-rando.dev2k.org");
        header("Content-Type: application/json; charset=utf-8");

        // Rate Limiting prüfen
        $clientIP = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
        if (!checkRateLimit($clientIP)) {
            http_response_code(429);
            echo json_encode([
                'success' => false,
                'message' => 'Zu viele Anfragen. Bitte versuchen Sie es in einer Stunde erneut.'
            ]);
            exit;
        }

        try {
            // Get and validate input
            $json = file_get_contents('php://input');
            if (!$json) {
                throw new Exception('No data received');
            }

            $params = json_decode($json, true);
            if (json_last_error() !== JSON_ERROR_NONE) {
                throw new Exception('Invalid JSON data');
            }

            // Validate required fields
            $requiredFields = ['email', 'name', 'subject', 'message'];
            foreach ($requiredFields as $field) {
                if (empty($params[$field])) {
                    throw new Exception("Field '$field' is required");
                }
            }

            // Honeypot-Prüfung (falls Feld vorhanden und nicht leer = Spam)
            if (isset($params['website']) && !empty(trim($params['website']))) {
                throw new Exception('Spam detected');
            }

            // Sanitize and validate data
            $email = filter_var(trim($params['email']), FILTER_VALIDATE_EMAIL);
            if (!$email) {
                throw new Exception('Invalid email address');
            }

            $name = htmlspecialchars(trim($params['name']), ENT_QUOTES, 'UTF-8');
            $subject = htmlspecialchars(trim($params['subject']), ENT_QUOTES, 'UTF-8');
            $message = htmlspecialchars(trim($params['message']), ENT_QUOTES, 'UTF-8');

            // Length validation
            if (strlen($name) > 100) {
                throw new Exception('Name too long (max 100 characters)');
            }
            if (strlen($subject) > 200) {
                throw new Exception('Subject too long (max 200 characters)');
            }
            if (strlen($message) > 2000) {
                throw new Exception('Message too long (max 2000 characters)');
            }

            logEvent('INFO', 'Contact form submitted', [
                'name' => $name,
                'email' => $email,
                'subject' => $subject
            ]);

            // Prepare email
            $recipient = 'konstantin.aksenov@dev2k.org';
            $emailSubject = "Super~Rando Kontakt: $subject";
            $emailMessage = createEmailTemplate($name, $email, $subject, $message);

            $headers = [
                'MIME-Version: 1.0',
                'Content-type: text/html; charset=utf-8',
                'From: noreply@super-rando.dev2k.org',
                'Reply-To: ' . $email,
                'X-Mailer: Super-Rando Contact Form'
            ];

            // Send email
            $mailSent = mail($recipient, $emailSubject, $emailMessage, implode("\r\n", $headers));
            
            if (!$mailSent) {
                logEvent('ERROR', 'Failed to send email', ['recipient' => $recipient]);
                throw new Exception('Failed to send email');
            }

            logEvent('INFO', 'Email sent successfully', ['recipient' => $recipient]);

            // Success response
            echo json_encode([
                'success' => true,
                'message' => 'Nachricht erfolgreich gesendet'
            ]);

        } catch (Exception $e) {
            logEvent('ERROR', 'Contact form error: ' . $e->getMessage(), [
                'params' => $params ?? null
            ]);
            http_response_code(400);
            echo json_encode([
                'success' => false,
                'message' => $e->getMessage()
            ]);
        }
        break;

    default:
        header("Allow: POST", true, 405);
        echo json_encode([
            'success' => false,
            'message' => 'Method not allowed'
        ]);
        exit;
}
?>
