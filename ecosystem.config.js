module.exports = {
    apps: [
        {
            name: "startupscript",
            script: "server.js",
            env: {
                NODE_ENV: "development"
            },
            env_production: {
                NODE_ENV: "production"
            },
            instances: 1,
            exec_mode: "fork"
        }
    ]
}