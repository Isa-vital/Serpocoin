<?php
// ================================
// CONTACT FORM HANDLER
// Mailjet API Integration + MySQL Storage
// Using dotenv for environment variables
// ================================

require_once __DIR__ . '/vendor/autoload.php';

use Dotenv\Dotenv;
use Mailjet\Resources;
use Mailjet\Client;

// Load environment variables
$dotenv = Dotenv::createImmutable(__DIR__);
$dotenv->load();

header('Content-Type: application/json');

// Mailjet API credentials from environment
define('MAILJET_API_KEY', $_ENV['MAILJET_API_KEY'] ?? '');
define('MAILJET_SECRET_KEY', $_ENV['MAILJET_SECRET_KEY'] ?? '');
define('ADMIN_EMAIL', $_ENV['ADMIN_EMAIL'] ?? 'contact@serpocoin.io');
define('FROM_EMAIL', $_ENV['FROM_EMAIL'] ?? 'contact@serpocoin.io');
define('FROM_NAME', $_ENV['FROM_NAME'] ?? 'Serpo Coin');

// Response array
$response = array('success' => false, 'message' => '');

try {
    // Check if it's a newsletter subscription
    if (isset($_POST['newsletter']) && $_POST['newsletter'] == '1') {
        handleNewsletterSubscription();
    } else {
        handleContactForm();
    }
} catch (Exception $e) {
    $response['message'] = 'Error: ' . $e->getMessage();
    echo json_encode($response);
}

// ================================
// HANDLE CONTACT FORM SUBMISSION
// Email only - no database storage
// ================================
function handleContactForm()
{
    global $response;

    // Validate and sanitize inputs
    $name = sanitizeInput($_POST['name'] ?? '');
    $email = sanitizeInput($_POST['email'] ?? '');
    $subject = sanitizeInput($_POST['subject'] ?? '');
    $message = sanitizeInput($_POST['message'] ?? '');

    // Validation
    if (empty($name) || empty($email) || empty($subject) || empty($message)) {
        $response['message'] = 'All fields are required.';
        echo json_encode($response);
        return;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $response['message'] = 'Invalid email address.';
        echo json_encode($response);
        return;
    }

    // Send email via Mailjet
    $emailSent = sendEmailViaMailjet($name, $email, $subject, $message);

    if ($emailSent) {
        $response['success'] = true;
        $response['message'] = 'Thank you for contacting us! We will get back to you soon.';
    } else {
        $response['success'] = false;
        $response['message'] = 'Failed to send your message. Please verify Mailjet API keys and sender email verification, or contact us directly at contact@serpocoin.io';
        error_log('Contact form email failed to send. Name: ' . $name . ', Email: ' . $email);
    }

    echo json_encode($response);
}

// ================================
// HANDLE NEWSLETTER SUBSCRIPTION
// Email only - no database storage
// ================================
function handleNewsletterSubscription()
{
    global $response;

    $email = sanitizeInput($_POST['newsletter_email'] ?? '');

    // Validation
    if (empty($email)) {
        $response['message'] = 'Email is required.';
        echo json_encode($response);
        return;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $response['message'] = 'Invalid email address.';
        echo json_encode($response);
        return;
    }

    // Send welcome email via Mailjet
    $emailSent = sendWelcomeEmail($email);

    if ($emailSent) {
        $response['success'] = true;
        $response['message'] = 'Successfully subscribed to our newsletter! Check your email.';
    } else {
        $response['success'] = false;
        $response['message'] = 'Subscription failed. Please verify Mailjet configuration or contact us at contact@serpocoin.io';
        error_log('Newsletter subscription email failed. Email: ' . $email);
    }

    echo json_encode($response);
}

// ================================
// SEND EMAIL VIA MAILJET API
// Using Mailjet PHP SDK
// ================================
function sendEmailViaMailjet($name, $email, $subject, $message)
{
    $apiKey = MAILJET_API_KEY;
    $secretKey = MAILJET_SECRET_KEY;
    $adminEmail = ADMIN_EMAIL;
    $fromEmail = FROM_EMAIL;
    $fromName = FROM_NAME;

    // Skip if API keys not configured
    if (empty($apiKey) || empty($secretKey) || $apiKey === 'your_mailjet_api_key_here') {
        error_log('Mailjet API keys not configured');
        return false;
    }

    try {
        // Create Mailjet client with custom settings for localhost
        $mj = new Client($apiKey, $secretKey, true, [
            'version' => 'v3.1',
            'url' => 'api.mailjet.com',
            'secured' => true,
            'curlOptions' => [
                CURLOPT_SSL_VERIFYPEER => false,
                CURLOPT_SSL_VERIFYHOST => 0,
                CURLOPT_TIMEOUT => 30,
                CURLOPT_CONNECTTIMEOUT => 15
            ]
        ]);

        $body = [
            'Messages' => [
                [
                    'From' => [
                        'Email' => $fromEmail,
                        'Name' => $fromName
                    ],
                    'To' => [
                        [
                            'Email' => $adminEmail,
                            'Name' => 'Serpo Admin'
                        ]
                    ],
                    'Subject' => 'New Contact Form: ' . $subject,
                    'TextPart' => "New contact form submission from $name\n\nEmail: $email\nSubject: $subject\n\nMessage:\n$message",
                    'HTMLPart' => "
                        <div style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0a0e27; color: #e0e7ff; padding: 20px;'>
                            <div style='border-bottom: 2px solid #00ffff; padding-bottom: 20px; margin-bottom: 20px;'>
                                <h2 style='color: #00ffff; margin: 0;'>🚀 New Contact Form Submission</h2>
                            </div>
                            <div style='background-color: #1a1e3a; padding: 20px; border-radius: 10px; border-left: 4px solid #ffd700;'>
                                <p style='margin: 10px 0;'><strong style='color: #00ffff;'>From:</strong> $name</p>
                                <p style='margin: 10px 0;'><strong style='color: #00ffff;'>Email:</strong> <a href='mailto:$email' style='color: #ffd700;'>$email</a></p>
                                <p style='margin: 10px 0;'><strong style='color: #00ffff;'>Subject:</strong> $subject</p>
                                <hr style='border: 1px solid #2a2e4a; margin: 20px 0;'>
                                <p style='margin: 10px 0;'><strong style='color: #00ffff;'>Message:</strong></p>
                                <div style='background-color: #0a0e27; padding: 15px; border-radius: 5px; margin-top: 10px;'>
                                    <p style='white-space: pre-wrap; margin: 0;'>$message</p>
                                </div>
                            </div>
                            <div style='margin-top: 20px; text-align: center; color: #94a3b8; font-size: 12px;'>
                                <p>Sent from Serpo Coin Contact Form</p>
                                <p style='color: #ffd700;'>A signal from the stars, reborn through the blockchain</p>
                            </div>
                        </div>
                    "
                ]
            ]
        ];

        $response = $mj->post(Resources::$Email, ['body' => $body]);

        if ($response->success()) {
            error_log('Mailjet email sent successfully to: ' . $adminEmail);
            return true;
        } else {
            $errorData = $response->getData();
            error_log('Mailjet send failed. Status: ' . $response->getStatus() . ', Data: ' . json_encode($errorData));
            return false;
        }
    } catch (Exception $e) {
        error_log('Mailjet exception: ' . $e->getMessage() . ' | Trace: ' . $e->getTraceAsString());
        return false;
    }
}

// ================================
// SEND WELCOME EMAIL
// Using Mailjet PHP SDK
// ================================
function sendWelcomeEmail($email)
{
    $apiKey = MAILJET_API_KEY;
    $secretKey = MAILJET_SECRET_KEY;
    $fromEmail = FROM_EMAIL;
    $fromName = FROM_NAME;

    // Skip if API keys not configured
    if (empty($apiKey) || empty($secretKey) || $apiKey === 'your_mailjet_api_key_here') {
        error_log('Mailjet API keys not configured');
        return false;
    }

    try {
        // Create Mailjet client with custom settings for localhost
        $mj = new Client($apiKey, $secretKey, true, [
            'version' => 'v3.1',
            'url' => 'api.mailjet.com',
            'secured' => true,
            'curlOptions' => [
                CURLOPT_SSL_VERIFYPEER => false,
                CURLOPT_SSL_VERIFYHOST => 0,
                CURLOPT_TIMEOUT => 30,
                CURLOPT_CONNECTTIMEOUT => 15
            ]
        ]);

        $body = [
            'Messages' => [
                [
                    'From' => [
                        'Email' => $fromEmail,
                        'Name' => $fromName
                    ],
                    'To' => [
                        [
                            'Email' => $email
                        ]
                    ],
                    'Subject' => '🚀 Welcome to Serpo Coin Community!',
                    'TextPart' => 'Welcome to the cosmic civilization! Thank you for subscribing to our newsletter. You will receive updates about token launches, new utilities, community events, and partnership news.',
                    'HTMLPart' => "
                        <div style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0a0e27; color: #e0e7ff; padding: 20px;'>
                            <div style='text-align: center; padding: 30px 20px; background: linear-gradient(135deg, #00ffff 0%, #ffd700 100%); border-radius: 10px 10px 0 0;'>
                                <h1 style='color: #0a0e27; margin: 0; font-size: 32px;'>🚀 Welcome to Serpo Coin!</h1>
                            </div>
                            <div style='background-color: #1a1e3a; padding: 30px; border-radius: 0 0 10px 10px;'>
                                <p style='font-size: 18px; margin-bottom: 20px;'>Thank you for joining our cosmic community!</p>
                                <p style='margin-bottom: 20px;'>You're now part of a revolutionary Web3 civilization. Get ready to receive exclusive updates about:</p>
                                <ul style='list-style: none; padding: 0;'>
                                    <li style='padding: 10px; margin: 10px 0; background-color: #0a0e27; border-left: 4px solid #00ffff; border-radius: 5px;'>
                                        <strong style='color: #00ffff;'>🎯 Token Launches</strong> - Be the first to know about new releases
                                    </li>
                                    <li style='padding: 10px; margin: 10px 0; background-color: #0a0e27; border-left: 4px solid #ffd700; border-radius: 5px;'>
                                        <strong style='color: #ffd700;'>🛠️ New Utilities</strong> - Access cutting-edge Web3 tools
                                    </li>
                                    <li style='padding: 10px; margin: 10px 0; background-color: #0a0e27; border-left: 4px solid #00ffff; border-radius: 5px;'>
                                        <strong style='color: #00ffff;'>🎁 Community Events</strong> - Airdrops, giveaways, and more
                                    </li>
                                    <li style='padding: 10px; margin: 10px 0; background-color: #0a0e27; border-left: 4px solid #ffd700; border-radius: 5px;'>
                                        <strong style='color: #ffd700;'>🤝 Partnerships</strong> - Exclusive collaborations and news
                                    </li>
                                </ul>
                                <div style='text-align: center; margin-top: 30px; padding-top: 30px; border-top: 2px solid #2a2e4a;'>
                                    <p style='font-size: 16px; margin-bottom: 20px;'>Join our social channels:</p>
                                    <div style='margin: 20px 0;'>
                                        <a href='https://t.me/serpocoinchannel' style='display: inline-block; margin: 5px; padding: 10px 20px; background-color: #00ffff; color: #0a0e27; text-decoration: none; border-radius: 5px; font-weight: bold;'>Telegram</a>
                                        <a href='https://x.com/serpocoin?s=21' style='display: inline-block; margin: 5px; padding: 10px 20px; background-color: #ffd700; color: #0a0e27; text-decoration: none; border-radius: 5px; font-weight: bold;'>Twitter/X</a>
                                        <a href='https://discord.gg/UzUW4Z6ek' style='display: inline-block; margin: 5px; padding: 10px 20px; background-color: #00ffff; color: #0a0e27; text-decoration: none; border-radius: 5px; font-weight: bold;'>Discord</a>
                                    </div>
                                </div>
                            </div>
                            <div style='margin-top: 20px; text-align: center; color: #94a3b8; font-size: 12px;'>
                                <p style='margin: 10px 0;'>Stay tuned for exciting updates!</p>
                                <p style='color: #ffd700; font-style: italic; margin: 10px 0;'>A signal from the stars, reborn through the blockchain.</p>
                                <p style='margin: 10px 0; font-size: 11px;'>
                                    <a href='https://serpocoin.io' style='color: #00ffff; text-decoration: none;'>Visit Website</a>
                                </p>
                            </div>
                        </div>
                    "
                ]
            ]
        ];

        $response = $mj->post(Resources::$Email, ['body' => $body]);

        if ($response->success()) {
            return true;
        } else {
            error_log('Mailjet welcome email failed: ' . json_encode($response->getData()));
            return false;
        }
    } catch (Exception $e) {
        error_log('Mailjet welcome email exception: ' . $e->getMessage());
        return false;
    }
}

// ================================
// SANITIZE INPUT
// ================================
function sanitizeInput($data)
{
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data, ENT_QUOTES, 'UTF-8');
    return $data;
}
