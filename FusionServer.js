const { spawn } = require('child_process');
const http = require('http');

class PhpServer {
    constructor(config) {
        this.php = 'php';
        this.host = '127.0.0.1';
        this.port = 8000;
        this.directory = null;
        this.directives = {};
        this.env = process.env;

        if (config) {
            if (config.port) this.port = config.port;
            if (config.directory) this.directory = config.directory;
            if (config.directives) this.directives = config.directives;
        }
    }

    getParameters() {
        const params = ['-S', `${this.host}:${this.port}`];

        if (this.directory) {
            params.push('-t');
            params.push(this.directory);
        }

        Object.keys(this.directives).forEach(d => {
            params.push('-d');
            params.push(`${d}=${this.directives[d]}`);
        });

        return params;
    }

    run() {
        this.process = spawn(this.php, this.getParameters(), {
            stdio: 'ignore', // Ignore stdio to prevent console window
            env: this.env,
            windowsHide: true // Explicitly hide window on Windows
        });

        this.process.on('close', () => console.log('PHP Server closed'));
        this.process.on('error', error => console.error('PHP Server error', error));

        return new Promise((resolve, reject) => {
            checkServer(this.host, this.port, () => resolve(this));
        });
    }

    close() {
        if (this.process) {
            this.process.kill();
            this.process = null;
        }
    }
}

function checkServer(host, port, cb) {
    setTimeout(function runCheck() {
        const req = http.request({
            method: 'HEAD',
            hostname: host,
            port: port
        }, () => cb());

        req.on('error', err => {
            if (err.code === 'ECONNREFUSED') {
                setTimeout(runCheck, 100);
            } else {
                cb();
            }
        });

        req.end();
    }, 100);
}

module.exports = PhpServer;
