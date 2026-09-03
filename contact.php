<?php
/**
 * contact.php — Deemvmedia Contact Form Handler
 *
 * Drop this file into your CPanel public_html folder alongside your
 * built React frontend files. The React app will POST JSON to this
 * endpoint and receive a JSON response.
 *
 * Email delivery: Uses PHP's built-in mail() function which works
 * out-of-the-box on virtually every CPanel shared hosting plan.
 * For higher deliverability, swap mail() for PHPMailer + SMTP
 * (see the commented block at the bottom of this file).
 */

// ── CORS Headers ─────────────────────────────────────────────────────────────
// Allow your React SPA (same domain on CPanel) to call this file.
// If you ever serve the frontend from a different subdomain, update
// the origin below accordingly.
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle CORS preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// ── Only accept POST ──────────────────────────────────────────────────────────
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed. Use POST.']);
    exit;
}

// ── Parse incoming JSON body ──────────────────────────────────────────────────
$raw  = file_get_contents('php://input');
$data = json_decode($raw, true);

if (json_last_error() !== JSON_ERROR_NONE || !is_array($data)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid JSON payload.']);
    exit;
}

// ── Extract & sanitise fields ─────────────────────────────────────────────────
$fullName        = trim($data['fullName']        ?? '');
$email           = trim($data['email']           ?? '');
$projectName     = trim($data['projectName']     ?? '');
$serviceCategory = trim($data['serviceCategory'] ?? '');
$estimatedBudget = trim($data['estimatedBudget'] ?? '');
$messageBody     = trim($data['messageBody']     ?? '');

// ── Validation ────────────────────────────────────────────────────────────────
$errors = [];

if ($fullName === '') {
    $errors[] = 'Full name is required.';
}

if ($email === '') {
    $errors[] = 'Email address is required.';
} elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'Please provide a valid email address.';
}

if ($messageBody === '') {
    $errors[] = 'Message body cannot be empty.';
}

if (!empty($errors)) {
    http_response_code(400);
    echo json_encode(['error' => implode(' ', $errors)]);
    exit;
}

// ── Compose email ─────────────────────────────────────────────────────────────
$recipient = 'ceo@deemvmedia.com';   // <- change to your inbox if needed
$subject   = "New Project Inquiry from {$fullName}";

$body  = "You have received a new project inquiry via the Deemvmedia contact form.\n\n";
$body .= "----------------------------------------------\n";
$body .= "Partner Name    : {$fullName}\n";
$body .= "Email           : {$email}\n";
$body .= "Project / Org   : {$projectName}\n";
$body .= "Focus Area      : {$serviceCategory}\n";
$body .= "Budget Bracket  : {$estimatedBudget}\n";
$body .= "----------------------------------------------\n\n";
$body .= "Message:\n{$messageBody}\n";

// RFC-2822 headers — set Reply-To so you can reply directly to the sender
$headers  = "From: Deemvmedia Contact <no-reply@deemvmedia.com>\r\n";
$headers .= "Reply-To: {$fullName} <{$email}>\r\n";
$headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/plain; charset=utf-8\r\n";

// ── Send email ────────────────────────────────────────────────────────────────
$sent = mail($recipient, $subject, $body, $headers);

if ($sent) {
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'Message sent successfully',
    ]);
} else {
    // mail() failed — log the error server-side for debugging
    error_log("[Deemvmedia] mail() failed for submission from: {$email}");
    http_response_code(500);
    echo json_encode(['error' => 'Failed to send message. Please try again later.']);
}

/*
 * ── OPTIONAL: Upgrade to PHPMailer for better SMTP deliverability ─────────────
 *
 * If plain mail() ends up in spam, use PHPMailer with your CPanel SMTP
 * credentials instead. Steps:
 *
 *   1. Download PHPMailer: https://github.com/PHPMailer/PHPMailer/releases
 *   2. Upload the phpmailer/src/ folder into public_html/
 *   3. Uncomment the block below and delete the mail() call above.
 *
 * require 'phpmailer/src/Exception.php';
 * require 'phpmailer/src/PHPMailer.php';
 * require 'phpmailer/src/SMTP.php';
 *
 * $mailer = new PHPMailer\PHPMailer\PHPMailer(true);
 * try {
 *     $mailer->isSMTP();
 *     $mailer->Host       = 'mail.deemvmedia.com'; // Your CPanel mail host
 *     $mailer->SMTPAuth   = true;
 *     $mailer->Username   = 'no-reply@deemvmedia.com';
 *     $mailer->Password   = 'YOUR_EMAIL_PASSWORD';
 *     $mailer->SMTPSecure = 'tls';
 *     $mailer->Port       = 587;
 *
 *     $mailer->setFrom('no-reply@deemvmedia.com', 'Deemvmedia Contact');
 *     $mailer->addAddress($recipient);
 *     $mailer->addReplyTo($email, $fullName);
 *
 *     $mailer->Subject = $subject;
 *     $mailer->Body    = $body;
 *     $mailer->send();
 *
 *     http_response_code(200);
 *     echo json_encode(['success' => true, 'message' => 'Message sent successfully']);
 * } catch (Exception $e) {
 *     error_log("[Deemvmedia] PHPMailer error: " . $mailer->ErrorInfo);
 *     http_response_code(500);
 *     echo json_encode(['error' => 'Failed to send message.']);
 * }
 */
