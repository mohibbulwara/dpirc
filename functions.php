
<?php
/**
 * DPIRC Collective Theme Functions
 */

function dpirc_enqueue_assets() {
    // Enqueue Google Fonts
    wp_enqueue_style('dpirc-fonts', 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Orbitron:wght@400;500;600;700;800;900&display=swap', [], null);

    // Enqueue Tailwind via CDN for immediate styling
    wp_enqueue_script('tailwind-cdn', 'https://cdn.tailwindcss.com', [], null, false);

    // Enqueue the Main React Script
    // Note: index.tsx needs to be served as index.js if not using a build tool, 
    // but many modern dev environments handle .tsx transparently.
    wp_enqueue_script('dpirc-main', get_template_directory_uri() . '/index.tsx', [], null, true);
    
    // Add module type to the script tag to support ESM imports
    add_filter('script_loader_tag', function($tag, $handle, $src) {
        if ($handle === 'dpirc-main') {
            return '<script type="module" src="' . esc_url($src) . '"></script>';
        }
        return $tag;
    }, 10, 3);

    // Pass the API Key to the frontend
    wp_localize_script('dpirc-main', 'wpSettings', [
        'apiKey' => get_option('dpirc_gemini_api_key', ''),
        'restUrl' => esc_url_raw(rest_url()),
        'nonce' => wp_create_nonce('wp_rest')
    ]);
}
add_action('wp_enqueue_scripts', 'dpirc_enqueue_assets');

// Add a settings field in WP Admin > Settings > General
function dpirc_settings_init() {
    register_setting('general', 'dpirc_gemini_api_key');
    add_settings_field(
        'dpirc_gemini_api_key',
        'Gemini API Key',
        function() {
            $value = get_option('dpirc_gemini_api_key', '');
            echo '<input type="password" name="dpirc_gemini_api_key" value="' . esc_attr($value) . '" class="regular-text" placeholder="Enter Gemini API Key">';
            echo '<p class="description">Required for DPIRC CORE AI features. Get one at <a href="https://aistudio.google.com/" target="_blank">Google AI Studio</a>.</p>';
        },
        'general'
    );
}
add_action('admin_init', 'dpirc_settings_init');
?>
