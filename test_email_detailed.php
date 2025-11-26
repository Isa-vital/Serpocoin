<?php
require_once __DIR__ . '/vendor/autoload.php';

use Mailjet\Client;
use Mailjet\Resources;

// Load environment variables
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

// Get credentials
$apiKey = $_ENV['MAILJET_API_KEY'];
$secretKey = $_ENV['MAILJET_SECRET_KEY'];
$fromEmail = $_ENV['FROM_EMAIL'];
$fromName = $_ENV['FROM_NAME'];

echo "<!DOCTYPE html><html><head><title>Mailjet Detailed Test</title>";
echo "<style>body{font-family:Arial;padding:20px;background:#f5f5f5;}";
echo ".success{color:green;background:#e8f5e9;padding:15px;border-radius:5px;margin:10px 0;}";
echo ".error{color:red;background:#ffebee;padding:15px;border-radius:5px;margin:10px 0;}";
echo ".info{color:#0066cc;background:#e3f2fd;padding:15px;border-radius:5px;margin:10px 0;}";
echo "pre{background:#263238;color:#aed581;padding:15px;border-radius:5px;overflow-x:auto;}";
echo "h2{color:#01bcd4;}</style></head><body>";

echo "<h1>🚀 Mailjet Detailed Email Test</h1>";
echo "<p>Testing email delivery to: <strong>$fromEmail</strong></p>";

// Test 1: API Connection
echo "<h2>Test 1: API Connection</h2>";
try {
    $mj = new Client($apiKey, $secretKey, true, [
        'version' => 'v3.1',
        'curlOptions' => [
            CURLOPT_SSL_VERIFYPEER => false,
            CURLOPT_SSL_VERIFYHOST => 0,
            CURLOPT_TIMEOUT => 30,
            CURLOPT_CONNECTTIMEOUT => 15
        ]
    ]);
    echo "<div class='success'>✅ Connected to Mailjet API successfully</div>";
} catch (Exception $e) {
    echo "<div class='error'>❌ Connection failed: " . $e->getMessage() . "</div>";
    exit;
}

// Test 2: Check Sender Status
echo "<h2>Test 2: Sender Address Verification</h2>";
try {
    $response = $mj->get(Resources::$Sender);
    if ($response->success()) {
        $senders = $response->getData();
        echo "<div class='info'><strong>Registered Senders:</strong><pre>";
        foreach ($senders as $sender) {
            $status = $sender['Status'];
            $email = $sender['Email'];
            $statusIcon = $status === 'Active' ? '✅' : '⚠️';
            echo "$statusIcon Email: $email | Status: $status | ID: {$sender['ID']}\n";

            if ($email === $fromEmail) {
                if ($status !== 'Active') {
                    echo "\n<span style='color:orange;font-weight:bold;'>WARNING: Your sender email is NOT active!</span>\n";
                    echo "Status: $status\n";
                    echo "You need to verify this email in Mailjet dashboard.\n";
                }
            }
        }
        echo "</pre></div>";

        // Check if our sender is in the list
        $foundSender = false;
        foreach ($senders as $sender) {
            if ($sender['Email'] === $fromEmail) {
                $foundSender = true;
                if ($sender['Status'] !== 'Active') {
                    echo "<div class='error'>❌ Sender '$fromEmail' is registered but NOT ACTIVE. Status: {$sender['Status']}</div>";
                } else {
                    echo "<div class='success'>✅ Sender '$fromEmail' is ACTIVE and verified</div>";
                }
                break;
            }
        }

        if (!$foundSender) {
            echo "<div class='error'>❌ Sender '$fromEmail' is NOT registered in Mailjet!</div>";
            echo "<div class='info'>Please add and verify this sender at: <a href='https://app.mailjet.com/account/sender' target='_blank'>https://app.mailjet.com/account/sender</a></div>";
        }
    }
} catch (Exception $e) {
    echo "<div class='error'>❌ Could not check sender status: " . $e->getMessage() . "</div>";
}

// Test 3: Send Test Email
echo "<h2>Test 3: Send Test Email</h2>";
$testEmail = $fromEmail; // Send to yourself for testing

try {
    $body = [
        'Messages' => [
            [
                'From' => [
                    'Email' => $fromEmail,
                    'Name' => $fromName
                ],
                'To' => [
                    [
                        'Email' => $testEmail,
                        'Name' => 'Test Recipient'
                    ]
                ],
                'Subject' => '🧪 Mailjet Test Email - ' . date('Y-m-d H:i:s'),
                'TextPart' => 'This is a test email from your Serpo Coin contact form system.',
                'HTMLPart' => '
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white;">
                        <h1 style="color: #FFD700; text-align: center;">🧪 Mailjet Test Email</h1>
                        <div style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 10px; margin: 20px 0;">
                            <h2 style="color: #00ffff;">Test Successful!</h2>
                            <p>If you\'re reading this, your Mailjet integration is working correctly.</p>
                            <p><strong>Sent at:</strong> ' . date('Y-m-d H:i:s') . '</p>
                            <p><strong>From:</strong> ' . $fromEmail . '</p>
                            <p><strong>To:</strong> ' . $testEmail . '</p>
                        </div>
                        <p style="text-align: center; font-size: 12px; opacity: 0.8;">
                            This is an automated test email from Serpo Coin Contact System
                        </p>
                    </div>
                ',
                'CustomID' => 'MailjetTest_' . time()
            ]
        ]
    ];

    $response = $mj->post(Resources::$Email, ['body' => $body]);

    if ($response->success()) {
        $data = $response->getData();
        echo "<div class='success'>✅ Email sent successfully!</div>";
        echo "<div class='info'><strong>Response Details:</strong><pre>";
        echo json_encode($data, JSON_PRETTY_PRINT);
        echo "</pre></div>";

        if (isset($data[0]['Status'])) {
            echo "<div class='info'><strong>Status:</strong> {$data[0]['Status']}</div>";
        }
        if (isset($data[0]['To'][0]['MessageID'])) {
            $messageId = $data[0]['To'][0]['MessageID'];
            echo "<div class='info'><strong>Message ID:</strong> $messageId</div>";
            echo "<div class='info'>Track this email at: <a href='https://app.mailjet.com/stats/message/$messageId' target='_blank'>Mailjet Dashboard</a></div>";
        }

        echo "<div class='success'>";
        echo "<h3>✅ Next Steps:</h3>";
        echo "<ol>";
        echo "<li>Check your inbox at: <strong>$testEmail</strong></li>";
        echo "<li>Check your SPAM/Junk folder</li>";
        echo "<li>Check Mailjet dashboard: <a href='https://app.mailjet.com/stats' target='_blank'>Statistics</a></li>";
        echo "<li>Check message details: <a href='https://app.mailjet.com/messages' target='_blank'>Messages</a></li>";
        echo "</ol>";
        echo "</div>";
    } else {
        echo "<div class='error'>❌ Email failed to send</div>";
        echo "<div class='error'><strong>Status Code:</strong> " . $response->getStatus() . "</div>";
        echo "<div class='error'><strong>Error:</strong><pre>";
        echo json_encode($response->getData(), JSON_PRETTY_PRINT);
        echo "</pre></div>";
    }
} catch (Exception $e) {
    echo "<div class='error'>❌ Exception occurred: " . $e->getMessage() . "</div>";
    echo "<div class='error'><pre>" . $e->getTraceAsString() . "</pre></div>";
}

// Test 4: Check Recent Message Statistics
echo "<h2>Test 4: Recent Email Statistics</h2>";
try {
    $response = $mj->get(Resources::$Message, [
        'filters' => [
            'Limit' => 5,
            'Sort' => 'ArrivedAt DESC'
        ]
    ]);

    if ($response->success()) {
        $messages = $response->getData();
        echo "<div class='info'><strong>Last 5 Messages:</strong><pre>";
        foreach ($messages as $msg) {
            echo "Status: {$msg['Status']} | To: {$msg['ContactAlt']} | Sent: {$msg['ArrivedAt']}\n";
        }
        echo "</pre></div>";
    }
} catch (Exception $e) {
    echo "<div class='error'>Could not retrieve message stats: " . $e->getMessage() . "</div>";
}

echo "<hr>";
echo "<h2>📧 Email Delivery Troubleshooting</h2>";
echo "<div class='info'>";
echo "<h3>If you're not receiving emails, check:</h3>";
echo "<ol>";
echo "<li><strong>Spam Folder:</strong> Mailjet emails often go to spam initially</li>";
echo "<li><strong>Email Provider:</strong> Some providers (Gmail, Outlook) have aggressive filtering</li>";
echo "<li><strong>Sender Reputation:</strong> New Mailjet accounts may have delivery delays</li>";
echo "<li><strong>SPF/DKIM Records:</strong> Not configured yet (affects deliverability)</li>";
echo "<li><strong>Mailjet Dashboard:</strong> Check actual delivery status at <a href='https://app.mailjet.com/stats' target='_blank'>https://app.mailjet.com/stats</a></li>";
echo "<li><strong>Message History:</strong> View sent messages at <a href='https://app.mailjet.com/messages' target='_blank'>https://app.mailjet.com/messages</a></li>";
echo "</ol>";
echo "</div>";

echo "</body></html>";
