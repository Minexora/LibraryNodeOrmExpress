import _conf from "./config/index.js";
import { app } from "./loaders/expressLoader.js"
import { router as library_router } from "./router/libraryRouter.js"
import delay from "delay";

const conf = _conf();

// Routers
app.use('', library_router);
app.all('*', (req, res) => {
    res.status(404).send('<h1>404! Page not found</h1>');
})

const info = `
Started Library Server API. 
    Url: http://${conf.args.d ? 'localhost' : conf.rest.libraryServer.host}:${conf.rest.libraryServer.port}/api 
`;
app.listen(conf.rest.libraryServer.port, conf.rest.libraryServer.host, () => { console.log(info) });