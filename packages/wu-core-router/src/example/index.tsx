import { Router, RouterOptions } from "../";

function main() {
    const options: RouterOptions = {
        type: 'hash'
    };
    (window as any).router = new Router(options);
}


main();
