module.exports = {
    reactStrictMode: true,
    images: {
        domains: ["wp.brainify.dev", "jholmedahl.files.wordpress.com", "localhost"]
    },
    webpack: (config, { dev, isServer }) => {
        // Replace React with Preact only in client production build
        if (!dev && !isServer) {
            Object.assign(config.resolve.alias, {
                react: "preact/compat",
                "react-dom/test-utils": "preact/test-utils",
                "react-dom": "preact/compat"
            });
        }
        return config;
    }
};
