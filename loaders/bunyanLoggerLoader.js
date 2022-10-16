import bunyan from 'bunyan'



const log = bunyan.createLogger({
    name: "library",
    serializers: bunyan.serializers,
    streams: [
        {
            level: 'info',
            stream: process.stdout
        },
        {
            level: 'info',
            path: './logs/library-server.log',
        },
        {
            level: 'error',
            path: './logs/library-server-error.log'
        }
    ]
});

export {
    log
}