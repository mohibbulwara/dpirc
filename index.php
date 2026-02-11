
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php wp_head(); ?>
    <script>
      // Polyfill for process.env in WordPress environment
      window.process = { env: { NODE_ENV: 'production', API_KEY: '<?php echo esc_js(get_option('dpirc_gemini_api_key', '')); ?>' } };
    </script>
    <style>
      :root {
        --neon-cyan: #00f3ff;
        --neon-purple: #bc13fe;
        --deep-onyx: #030303;
      }
      body {
        font-family: 'Space Grotesk', sans-serif;
        background-color: var(--deep-onyx);
        color: #ffffff;
        overflow-x: hidden;
      }
      .font-orbitron { font-family: 'Orbitron', sans-serif; }
      .text-premium { font-size: 0.65rem; letter-spacing: 0.4em; text-transform: uppercase; font-weight: 700; color: #666; }
      .scanline::after { content: ""; position: absolute; top: 0; left: 0; width: 100%; height: 2px; background: linear-gradient(90deg, transparent, var(--neon-cyan), transparent); animation: scan 6s linear infinite; pointer-events: none; z-index: 50; }
      @keyframes scan { 0% { top: 0; opacity: 0; } 10% { opacity: 0.5; } 90% { opacity: 0.5; } 100% { top: 100%; opacity: 0; } }
      .bg-grid { background-size: 60px 60px; background-image: linear-gradient(to right, rgba(0, 243, 255, 0.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 243, 255, 0.02) 1px, transparent 1px); }
      .glass { background: rgba(255, 255, 255, 0.02); backdrop-filter: blur(25px); border: 1px solid rgba(255, 255, 255, 0.05); }
      ::-webkit-scrollbar { width: 4px; }
      ::-webkit-scrollbar-track { background: #030303; }
      ::-webkit-scrollbar-thumb { background: #111; border-radius: 10px; }
      ::-webkit-scrollbar-thumb:hover { background: var(--neon-cyan); }
    </style>
    <script type="importmap">
    {
      "imports": {
        "react": "https://esm.sh/react@19.0.0",
        "react-dom": "https://esm.sh/react-dom@19.0.0",
        "react-dom/client": "https://esm.sh/react-dom@19.0.0/client",
        "react/jsx-runtime": "https://esm.sh/react@19.0.0/jsx-runtime",
        "react-router-dom": "https://esm.sh/react-router-dom@7.0.0?deps=react@19.0.0,react-dom@19.0.0",
        "framer-motion": "https://esm.sh/framer-motion@11.11.17?deps=react@19.0.0",
        "lucide-react": "https://esm.sh/lucide-react@0.454.0?deps=react@19.0.0",
        "@google/genai": "https://esm.sh/@google/genai@1.4.0"
      }
    }
    </script>
</head>
<body class="bg-grid">
    <div id="root"></div>
    <?php wp_footer(); ?>
</body>
</html>
