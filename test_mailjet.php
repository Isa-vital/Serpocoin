<?php
// ================================
// MAILJET CONNECTION TEST
// Run this file to test your setup
// ================================

require_once __DIR__ . '/vendor/autoload.php';

use Dotenv\Dotenv;
use Mailjet\Client;
use Mailjet\Resources;

// Load environment variables
try {
    $dotenv = Dotenv::createImmutable(__DIR__);
    $dotenv->load();
    echo "✅ Environment file loaded successfully<br>";
} catch (Exception $e) {
    die("❌ Error loading .env file: " . $e->getMessage());
}

// Check API credentials
$apiKey = $_ENV['MAILJET_API_KEY'] ?? '';
$secretKey = $_ENV['MAILJET_SECRET_KEY'] ?? '';

echo "<h2>Mailjet Configuration Test</h2>";
echo "<hr>";

// Test 1: Check if credentials are set
echo "<h3>Test 1: API Credentials</h3>";
if (empty($apiKey) || $apiKey === 'your_mailjet_api_key_here') {
    echo "❌ MAILJET_API_KEY is not configured<br>";
} else {
    echo "✅ MAILJET_API_KEY is set: " . substr($apiKey, 0, 10) . "...<br>";
}

if (empty($secretKey) || $secretKey === 'your_mailjet_secret_key_here') {
    echo "❌ MAILJET_SECRET_KEY is not configured<br>";
} else {
    echo "✅ MAILJET_SECRET_KEY is set: " . substr($secretKey, 0, 10) . "...<br>";
}

// Test 2: Test Mailjet connection
echo "<h3>Test 2: Mailjet API Connection</h3>";
if (!empty($apiKey) && !empty($secretKey) && $apiKey !== 'your_mailjet_api_key_here') {
    try {
        $mj = new Client($apiKey, $secretKey, true, ['version' => 'v3.1']);

        // Try to get account info (lightweight API call)
        $response = $mj->get(Resources::$Myprofile);

        if ($response->success()) {
            $data = $response->getData();
            echo "✅ Mailjet API connection successful<br>";
            if (isset($data[0]['Data'][0]['Email'])) {
                echo "📧 Account email: " . $data[0]['Data'][0]['Email'] . "<br>";
            }
        } else {
            echo "❌ Mailjet API connection failed<br>";
            echo "Response: " . json_encode($response->getData()) . "<br>";
        }
    } catch (Exception $e) {
        echo "❌ Mailjet API error: " . $e->getMessage() . "<br>";
    }
} else {
    echo "⚠️ Skipping Mailjet test - API credentials not configured<br>";
}

// Test 3: Check sender email configuration
echo "<h3>Test 3: Email Configuration</h3>";
$adminEmail = $_ENV['ADMIN_EMAIL'] ?? '';
$fromEmail = $_ENV['FROM_EMAIL'] ?? '';
$fromName = $_ENV['FROM_NAME'] ?? '';

echo "Admin Email: " . ($adminEmail ?: "❌ Not set") . "<br>";
echo "From Email: " . ($fromEmail ?: "❌ Not set") . "<br>";
echo "From Name: " . ($fromName ?: "❌ Not set") . "<br>";

// Summary
echo "<hr>";
echo "<h3>Summary</h3>";
echo "<p><strong>Next Steps:</strong></p>";
echo "<ol>";
echo "<li>If any tests failed, check the <code>.env</code> file</li>";
echo "<li>Make sure all Mailjet API keys are correct</li>";
echo "<li>Verify sender email in Mailjet dashboard</li>";
echo "<li>Test the contact form at <a href='contact.html'>contact.html</a></li>";
echo "</ol>";

echo "<style>
body { font-family: Arial, sans-serif; padding: 20px; background: #f5f5f5; }
h2 { color: #00ffff; background: #0a0e27; padding: 15px; border-radius: 5px; }
h3 { color: #333; border-bottom: 2px solid #00ffff; padding-bottom: 5px; margin-top: 20px; }
code { background: #e0e0e0; padding: 2px 5px; border-radius: 3px; }
hr { margin: 30px 0; border: 1px solid #00ffff; }
</style>";
